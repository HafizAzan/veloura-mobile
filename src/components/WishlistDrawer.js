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
import { useWishlist } from '../context/WishlistContext';
import { colors } from '../theme/colors';

export default function WishlistDrawer() {
  const navigation = useNavigation();
  const { items, removeFromWishlist, closeWishlist, isWishlistOpen } = useWishlist();

  const handleClose = () => closeWishlist();

  const handleProduct = (productId) => {
    closeWishlist();
    navigation.navigate('ProductDetail', { productId });
  };

  if (!isWishlistOpen) return null;

  return (
    <Modal
      visible={isWishlistOpen}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          <View style={styles.head}>
            <Text style={styles.title}>Wishlist</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sub}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Text>
          {items.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Your wishlist is empty</Text>
              <TouchableOpacity
                onPress={() => { closeWishlist(); navigation.navigate('Shop'); }}
                style={styles.shopBtn}
              >
                <Text style={styles.shopBtnText}>Browse shop</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {items.map((item) => {
                const image = typeof item.image === 'string' ? item.image : item.image?.uri;
                return (
                  <TouchableOpacity
                    key={item.productId}
                    style={styles.item}
                    onPress={() => handleProduct(item.productId)}
                    activeOpacity={0.9}
                  >
                    {image ? (
                      <Image source={{ uri: image }} style={styles.itemImage} resizeMode="cover" />
                    ) : (
                      <View style={[styles.itemImage, styles.placeholderImage]} />
                    )}
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                      <Text style={styles.itemPrice}>${Number(item.price).toFixed(2)}</Text>
                      <TouchableOpacity
                        onPress={() => removeFromWishlist(item.productId)}
                        style={styles.removeBtn}
                      >
                        <Text style={styles.removeText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
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
  scroll: { maxHeight: 400 },
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
  itemPrice: { fontSize: 14, color: colors.deepRoyalDarkPlum, fontWeight: '600', marginTop: 4 },
  removeBtn: { marginTop: 8 },
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
});
