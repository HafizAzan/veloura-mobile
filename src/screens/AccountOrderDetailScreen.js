import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { fetchOrderById } from '../api/orders';
import ScreenBackButton from '../components/ScreenBackButton';
import { colors } from '../theme/colors';

function formatDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function AccountOrderDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const orderId = route.params?.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!orderId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setError('Invalid order');
      return;
    }
    let cancelled = false;
    fetchOrderById(orderId)
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || 'Order not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (!orderId) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>Invalid order</Text>
          <ScreenBackButton
            onPress={() => navigation.navigate('AccountOrders')}
            label="Back to orders"
            variant="primary"
            style={{ alignSelf: 'center', marginTop: 12 }}
          />
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <View style={styles.centered}>
          <ActivityIndicator color={colors.deepRoyalLightPlum} />
          <Text style={styles.loadingText}>Loading order…</Text>
        </View>
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>{error || 'Order not found'}</Text>
          <ScreenBackButton
            onPress={() => navigation.navigate('AccountOrders')}
            label="Back to orders"
            variant="primary"
            style={{ alignSelf: 'center', marginTop: 12 }}
          />
        </View>
      </View>
    );
  }

  const itemCount = order.items?.length ?? 0;
  const displayId = order.orderId || order.order_id || order._id || order.id;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ScreenBackButton
            onPress={() => navigation.goBack()}
            label="Back to orders"
            variant="light"
            style={styles.backHero}
            textStyle={styles.backHeroText}
          />
          <View style={styles.heroTitleRow}>
            <View style={styles.heroIconWrap}>
              <Ionicons name="cube-outline" size={24} color={colors.champagneGold} />
            </View>
            <Text style={styles.heroTitle}>Order {displayId}</Text>
          </View>
          <Text style={styles.heroMeta}>
            Placed on {formatDate(order.created_at)} · {itemCount} item{itemCount !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHead}>
            <Text style={styles.statusPill}>{order.status || '—'}</Text>
            <Text style={styles.total}>${Number(order.total ?? 0).toFixed(2)}</Text>
          </View>

          {order.items?.length > 0 ? (
            <View style={styles.itemsBlock}>
              <Text style={styles.itemsHeading}>Items</Text>
              {order.items.map((item, idx) => (
                <View key={idx} style={[styles.itemRow, idx === order.items.length - 1 ? styles.itemRowLast : null]}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.thumb} resizeMode="cover" />
                  ) : (
                    <View style={styles.thumbPlaceholder} />
                  )}
                  <View style={styles.itemMid}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.itemQty}>
                      Qty: {item.quantity} × ${Number(item.price ?? 0).toFixed(2)}
                    </Text>
                  </View>
                  <Text style={styles.itemLineTotal}>
                    ${(Number(item.quantity ?? 0) * Number(item.price ?? 0)).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: colors.textMuted },
  emptyTitle: { fontSize: 18, color: colors.charcoalLight, marginBottom: 12 },
  hero: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
  },
  backHero: { marginBottom: 16 },
  backHeroText: { fontSize: 14, fontWeight: '500' },
  heroTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(58, 30, 70, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: { fontSize: 22, fontFamily: 'Georgia', color: colors.white, flex: 1 },
  heroMeta: { fontSize: 13, color: 'rgba(234,227,214,0.75)' },
  panel: {
    marginHorizontal: 24,
    marginTop: -12,
    marginBottom: 32,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    padding: 20,
  },
  panelHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusPill: {
    fontSize: 13,
    color: colors.deepRoyalDarkPlum,
    backgroundColor: colors.softIvory,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  total: { fontSize: 20, fontWeight: '700', color: colors.deepRoyalDarkPlum },
  itemsBlock: { borderTopWidth: 1, borderTopColor: colors.borderGray, paddingTop: 16 },
  itemsHeading: { fontSize: 17, fontWeight: '600', color: colors.charcoalDark, marginBottom: 12 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    gap: 12,
  },
  itemRowLast: { borderBottomWidth: 0 },
  thumb: { width: 56, height: 56, borderRadius: 8 },
  thumbPlaceholder: { width: 56, height: 56, borderRadius: 8, backgroundColor: colors.softIvory },
  itemMid: { flex: 1, minWidth: 0 },
  itemTitle: { fontSize: 15, fontWeight: '600', color: colors.charcoalDark },
  itemQty: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  itemLineTotal: { fontSize: 15, fontWeight: '600', color: colors.deepRoyalDarkPlum },
});
