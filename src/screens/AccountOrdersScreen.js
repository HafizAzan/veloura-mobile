import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { fetchOrdersForUser } from '../api/orders';
import ScreenBackButton from '../components/ScreenBackButton';
import { colors } from '../theme/colors';

export default function AccountOrdersScreen() {
  const navigation = useNavigation();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchOrdersForUser(user.id)
      .then((list) => {
        if (!cancelled) setOrders(list || []);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || 'Could not load orders');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.centered}>
          <Text style={styles.muted}>Sign in to view your orders.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenBackButton
          onPress={() => navigation.goBack()}
          label="Back to account"
          variant="primary"
          style={styles.back}
        />
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.sub}>View and track your orders.</Text>

        {loading ? (
          <ActivityIndicator style={styles.loader} color={colors.deepRoyalLightPlum} />
        ) : error ? (
          <Text style={styles.err}>{error}</Text>
        ) : orders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No orders yet.</Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate('Shop')}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>Shop now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          orders.map((o) => {
            const rowId = o._id || o.id || o.orderId;
            const apiId = o._id || o.id;
            return (
              <TouchableOpacity
                key={rowId}
                style={styles.row}
                onPress={() => apiId && navigation.navigate('AccountOrderDetail', { orderId: apiId })}
                activeOpacity={0.85}
                disabled={!apiId}
              >
                <Text style={styles.orderId}>{o.orderId || o.order_id || 'Order'}</Text>
                <Text style={styles.orderMeta}>
                  {o.status || '—'} · ${Number(o.total ?? 0).toFixed(2)}
                </Text>
                <Text style={styles.rowHint}>View details →</Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  scroll: { padding: 24, paddingBottom: 48 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  muted: { fontSize: 16, color: colors.textMuted },
  loader: { marginVertical: 24 },
  back: { marginBottom: 20 },
  title: {
    fontSize: 24,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 8,
  },
  sub: { fontSize: 14, color: colors.textMuted, marginBottom: 20 },
  err: { color: '#b91c1c', marginBottom: 12 },
  empty: { alignItems: 'flex-start' },
  emptyText: { fontSize: 16, color: colors.charcoalLight, marginBottom: 16 },
  primaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
  },
  primaryBtnText: { color: colors.white, fontSize: 15, fontWeight: '600' },
  row: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGray,
    padding: 16,
    marginBottom: 10,
  },
  orderId: { fontSize: 16, fontWeight: '600', color: colors.deepRoyalDarkPlum },
  orderMeta: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  rowHint: { fontSize: 12, color: colors.deepRoyalLightPlum, marginTop: 8, fontWeight: '600' },
});
