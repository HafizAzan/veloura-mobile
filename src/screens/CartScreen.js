import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/colors';

function CartItem({ item, onUpdateQty, onRemove }) {
  const image = typeof item.image === 'string' ? item.image : item.image?.uri;
  const maxQty = item.availableQuantity ?? item.quantity ?? 999;

  return (
    <View style={styles.itemCard}>
      <TouchableOpacity
        style={styles.itemImageWrap}
        onPress={() => onUpdateQty && onUpdateQty(item.productId)}
        activeOpacity={0.9}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.itemImage} resizeMode="cover" />
        ) : (
          <View style={[styles.itemImage, styles.placeholderImage]} />
        )}
      </TouchableOpacity>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemPrice}>${Number(item.price).toFixed(2)} each</Text>
        <View style={styles.itemActions}>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              onPress={() => onUpdateQty && onUpdateQty(item.productId, Math.max(1, item.quantity - 1))}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onUpdateQty && onUpdateQty(item.productId, Math.min(maxQty, item.quantity + 1))}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => onRemove(item.productId)} style={styles.removeBtn}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const navigation = useNavigation();
  const { items, totalItems, subtotal, updateQuantity, removeItem } = useCart();

  const handleUpdateQty = (productId, qty) => {
    updateQuantity(productId, qty);
  };

  if (items.length === 0) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your bag</Text>
          <Text style={styles.headerSub}>0 items in your cart</Text>
        </View>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySub}>
            Add something you love and come back here to review and checkout.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Shop')}
            style={styles.primaryBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Continue shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your bag</Text>
        <Text style={styles.headerSub}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onUpdateQty={handleUpdateQty}
            onRemove={removeItem}
          />
        ))}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${Number(subtotal).toFixed(2)}</Text>
          </View>
          <Text style={styles.summaryNote}>Shipping & tax calculated at checkout</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            style={styles.checkoutBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.checkoutBtnText}>Proceed to checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Shop')}
            style={styles.shopLink}
          >
            <Text style={styles.shopLinkText}>Continue shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  header: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingVertical: 20,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Georgia',
    color: colors.white,
    marginBottom: 4,
  },
  headerSub: { fontSize: 14, color: 'rgba(234,227,214,0.8)' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  itemImageWrap: { width: 90, height: 110, borderRadius: 12, overflow: 'hidden' },
  itemImage: { width: '100%', height: '100%' },
  placeholderImage: { backgroundColor: colors.softBeige },
  itemContent: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  itemTitle: { fontSize: 15, color: colors.charcoalDark, fontWeight: '500' },
  itemPrice: { fontSize: 14, color: colors.textMuted },
  itemActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 16, color: colors.charcoalDark },
  qtyValue: { fontSize: 14, fontWeight: '600', minWidth: 20, textAlign: 'center' },
  removeBtn: { paddingVertical: 4, paddingHorizontal: 8 },
  removeText: { fontSize: 14, color: colors.deepRoyalLightPlum },
  summary: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 16, color: colors.charcoalDark },
  summaryValue: { fontSize: 18, fontWeight: '700', color: colors.deepRoyalDarkPlum },
  summaryNote: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  checkoutBtn: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  shopLink: { marginTop: 16, alignSelf: 'center' },
  shopLinkText: { fontSize: 14, color: colors.deepRoyalLightPlum },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
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
