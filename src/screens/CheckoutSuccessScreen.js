import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';

export default function CheckoutSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const orderId = route.params?.orderId || '';

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>✓</Text>
        </View>
        <Text style={styles.title}>Thank you for your order</Text>
        <Text style={styles.sub}>
          Your order has been placed successfully.
          {orderId ? ` Order ID: ${orderId}` : ''}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.primaryBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Go to home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Shop')}
          style={styles.secondaryBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryBtnText}>Continue shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory, justifyContent: 'center' },
  content: { alignItems: 'center', padding: 24 },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.deepRoyalLightPlum,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: { fontSize: 36, color: colors.white, fontWeight: '700' },
  title: {
    fontSize: 24,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 12,
    textAlign: 'center',
  },
  sub: { fontSize: 16, color: colors.charcoalLight, textAlign: 'center', marginBottom: 32 },
  primaryBtn: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%',
    maxWidth: 320,
  },
  primaryBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  secondaryBtn: {
    height: 52,
    borderWidth: 2,
    borderColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
  },
  secondaryBtnText: { color: colors.deepRoyalLightPlum, fontSize: 18, fontWeight: '600' },
});
