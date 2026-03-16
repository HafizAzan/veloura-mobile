import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orders';
import { colors } from '../theme/colors';

const initialShipping = {
  fullName: '',
  street: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  country: 'France',
  phone: '',
};

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [shipping, setShipping] = useState(initialShipping);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const validate = () => {
    const next = {};
    if (!shipping.fullName?.trim()) next.fullName = 'Full name is required';
    if (!shipping.street?.trim()) next.street = 'Street is required';
    if (!shipping.city?.trim()) next.city = 'City is required';
    if (!shipping.zip?.trim()) next.zip = 'ZIP / Postal code is required';
    if (!shipping.country?.trim()) next.country = 'Country is required';
    if (!shipping.phone?.trim()) next.phone = 'Phone is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      navigation.navigate('Cart');
      return;
    }
    if (!validate()) return;
    setPlacing(true);
    try {
      const result = await createOrder({
        userId: user?.id ?? null,
        total: subtotal,
        status: 'Pending',
        items: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
      });
      const orderId = result?.orderId ?? result?._id ?? `VL-${Date.now().toString().slice(-6)}`;
      clearCart();
      navigation.replace('CheckoutSuccess', { orderId });
    } catch (err) {
      Alert.alert('Error', err?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0 && !placing) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add items from the shop to checkout.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Shop')}
            style={styles.primaryBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Go to shop</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back to cart</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSub}>Enter your shipping details to place your order.</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Shipping address</Text>
            {['fullName', 'street', 'apartment', 'city', 'state', 'zip', 'country', 'phone'].map((name) => (
              <View key={name} style={styles.field}>
                <Text style={styles.label}>
                  {name === 'fullName' ? 'Full name' : name === 'street' ? 'Street address' : name === 'apartment' ? 'Apartment, suite, etc.' : name === 'zip' ? 'ZIP / Postal code' : name.charAt(0).toUpperCase() + name.slice(1)}
                </Text>
                <TextInput
                  style={[styles.input, errors[name] ? styles.inputError : null]}
                  value={shipping[name]}
                  onChangeText={(t) => {
                    setShipping((s) => ({ ...s, [name]: t }));
                    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
                  }}
                  placeholder={name === 'apartment' ? 'Optional' : ''}
                  placeholderTextColor={colors.textMuted}
                  editable={!placing}
                />
                {errors[name] ? <Text style={styles.errorText}>{errors[name]}</Text> : null}
              </View>
            ))}
            <TouchableOpacity
              style={styles.placeBtn}
              onPress={handlePlaceOrder}
              disabled={placing}
              activeOpacity={0.85}
            >
              {placing ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.placeBtnText}>Place order · ${Number(subtotal).toFixed(2)}</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  keyboard: { flex: 1 },
  header: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingVertical: 16,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  backText: { fontSize: 14, color: 'rgba(234,227,214,0.8)', marginBottom: 8 },
  headerTitle: { fontSize: 22, fontFamily: 'Georgia', color: colors.white, marginBottom: 4 },
  headerSub: { fontSize: 14, color: 'rgba(234,227,214,0.8)' },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 48 },
  form: { backgroundColor: colors.white, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#f3f4f6' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.deepRoyalDarkPlum, marginBottom: 16 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, color: colors.charcoalDark, marginBottom: 6 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.charcoalDark,
  },
  inputError: { borderColor: '#b91c1c' },
  errorText: { fontSize: 12, color: '#b91c1c', marginTop: 4 },
  placeBtn: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  placeBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 20, color: colors.deepRoyalDarkPlum, marginBottom: 8 },
  emptySub: { fontSize: 15, color: colors.textMuted, marginBottom: 24 },
  primaryBtn: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },
});
