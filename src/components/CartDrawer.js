import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/colors';

export default function CartDrawer() {
  const navigation = useNavigation();
  const { items, totalItems, subtotal, updateQuantity, removeItem, closeCart, isCartOpen } = useCart();

  const handleClose = () => {
    closeCart();
  };

  const handleCheckout = () => {
    closeCart();
    navigation.navigate('Checkout');
  };

  const handleShop = () => {
    closeCart();
    navigation.navigate('Shop');
  };

  if (!isCartOpen) return null;

  return (
    <Modal
      visible={isCartOpen}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          <View style={styles.head}>
            <Text style={styles.title}>Your bag</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sub}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
          {items.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Your bag is empty</Text>
              <TouchableOpacity onPress={handleShop} style={styles.shopBtn}>
                <Text style={styles.shopBtnText}>Continue shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {items.map((item) => {
                  const image = typeof item.image === 'string' ? item.image : item.image?.uri;
                  const maxQty = item.availableQuantity ?? item.quantity ?? 999;
                  return (
                    <View key={item.productId} style={styles.item}>
                      {image ? (
                        <Image source={{ uri: image }} style={styles.itemImage} resizeMode="cover" />
                      ) : (
                        <View style={[styles.itemImage, styles.placeholderImage]} />
                      )}
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.itemPrice}>${Number(item.price).toFixed(2)} × {item.quantity}</Text>
                        <View style={styles.itemActions}>
                          <View style={styles.qtyRow}>
                            <TouchableOpacity
                              onPress={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              style={styles.qtyBtn}
                            >
                              <Text style={styles.qtyBtnText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyValue}>{item.quantity}</Text>
                            <TouchableOpacity
                              onPress={() => updateQuantity(item.productId, Math.min(maxQty, item.quantity + 1))}
                              style={styles.qtyBtn}
                            >
                              <Text style={styles.qtyBtnText}>+</Text>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity onPress={() => removeItem(item.productId)}>
                            <Text style={styles.removeText}>Remove</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.footer}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.totalValue}>${Number(subtotal).toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={handleCheckout} style={styles.checkoutBtn} activeOpacity={0.85}>
                  <Text style={styles.checkoutBtnText}>Checkout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { closeCart(); navigation.navigate('Cart'); }} style={styles.viewCart}>
                  <Text style={styles.viewCartText}>View full cart</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  panel: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 24,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  title: { fontSize: 20, fontFamily: 'Georgia', color: colors.deepRoyalDarkPlum },
  closeBtn: { padding: 8 },
  closeText: { fontSize: 20, color: colors.charcoalDark },
  sub: { fontSize: 14, color: colors.textMuted, paddingHorizontal: 20, marginBottom: 12 },
  scroll: { maxHeight: 320 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16 },
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  itemImage: { width: 64, height: 80, borderRadius: 8 },
  placeholderImage: { backgroundColor: colors.softBeige },
  itemContent: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 14, color: colors.charcoalDark, fontWeight: '500' },
  itemPrice: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  itemActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 14 },
  qtyValue: { fontSize: 14, fontWeight: '600', minWidth: 16, textAlign: 'center' },
  removeText: { fontSize: 13, color: colors.deepRoyalLightPlum },
  empty: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 16, color: colors.textMuted, marginBottom: 16 },
  shopBtn: {
    height: 44,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopBtnText: { color: colors.white, fontWeight: '600' },
  footer: { paddingHorizontal: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.borderGray },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 16, color: colors.charcoalDark },
  totalValue: { fontSize: 18, fontWeight: '700', color: colors.deepRoyalDarkPlum },
  checkoutBtn: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  viewCart: { marginTop: 12, alignItems: 'center' },
  viewCartText: { fontSize: 14, color: colors.deepRoyalLightPlum },
});
