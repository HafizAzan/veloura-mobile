import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { getProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { colors } from '../theme/colors';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params?.productId;
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(!!productId);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productId) {
      setError('Invalid product');
      setLoading(false);
      return;
    }
    let cancelled = false;
    getProductById(productId)
      .then((p) => {
        if (!cancelled) {
          setProduct(p);
          setError('');
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || 'Product not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [productId]);

  const handleAddToBag = () => {
    if (!product) return;
    const id = product.id ?? product._id;
    const stock = Math.max(0, Number(product.quantity) ?? 0);
    const toAdd = Math.min(quantity, stock);
    if (toAdd <= 0) {
      Alert.alert('Out of stock', 'This item is currently unavailable.');
      return;
    }
    addItem({ product: { ...product, id }, quantity: toAdd });
    openCart();
    Alert.alert('Added', toAdd > 1 ? `Added ${toAdd} to cart` : 'Added to cart');
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist({ ...product, id: product.id ?? product._id });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={colors.deepRoyalLightPlum} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <StatusBar style="dark" />
        <Text style={styles.errorText}>{error || 'Product not found.'}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkBtn}>
          <Text style={styles.linkText}>← Back to shop</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const id = product.id ?? product._id;
  const image = typeof product.image === 'string' ? product.image : product.image?.uri;
  const price = product.price ?? 0;
  const oldPrice = product.oldPrice ?? 0;
  const stock = Math.max(0, Number(product.quantity) ?? 0);
  const inWishlist = isInWishlist(id);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={[styles.image, styles.placeholderImage]} />
          )}
          <TouchableOpacity style={styles.wishlistBtn} onPress={handleWishlist}>
            <Text style={styles.wishlistIcon}>{inWishlist ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.category}>{product.category || product.family || ''}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${Number(price).toFixed(2)}</Text>
            {oldPrice > 0 && (
              <Text style={styles.oldPrice}>${Number(oldPrice).toFixed(2)}</Text>
            )}
          </View>
          {product.desc ? (
            <Text style={styles.desc}>{product.desc}</Text>
          ) : null}
          {product.notes ? (
            <Text style={styles.notes}>{product.notes}</Text>
          ) : null}
          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity((q) => Math.min(stock, q + 1))}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {stock <= 5 && stock > 0 && (
            <Text style={styles.stockHint}>Only {stock} left</Text>
          )}
          {stock === 0 && (
            <Text style={styles.outOfStock}>Out of stock</Text>
          )}
          <TouchableOpacity
            style={[styles.addBtn, stock === 0 && styles.addBtnDisabled]}
            onPress={handleAddToBag}
            disabled={stock === 0}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>Add to bag</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={styles.backLink}>
            <Text style={styles.backLinkText}>← Back to shop</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  scroll: { paddingBottom: 32 },
  imageWrap: { position: 'relative', backgroundColor: colors.white, padding: 24 },
  image: { width: '100%', aspectRatio: 1 },
  placeholderImage: { backgroundColor: colors.softBeige },
  wishlistBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: { fontSize: 22, color: colors.deepRoyalLightPlum },
  content: { padding: 24, paddingTop: 16 },
  category: {
    fontSize: 12,
    color: colors.champagneGold,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 12,
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  price: { fontSize: 24, fontWeight: '700', color: colors.deepRoyalDarkPlum },
  oldPrice: { fontSize: 16, color: colors.textMuted, textDecorationLine: 'line-through' },
  desc: { fontSize: 15, color: colors.charcoalLight, lineHeight: 22, marginBottom: 12 },
  notes: { fontSize: 14, color: colors.textMuted, fontStyle: 'italic', marginBottom: 20 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  quantityLabel: { fontSize: 16, color: colors.charcoalDark },
  quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 18, color: colors.charcoalDark },
  qtyValue: { fontSize: 16, fontWeight: '600', minWidth: 24, textAlign: 'center' },
  stockHint: { fontSize: 14, color: '#b45309', marginBottom: 8 },
  outOfStock: { fontSize: 14, color: '#b91c1c', marginBottom: 8 },
  addBtn: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addBtnDisabled: { opacity: 0.5 },
  addBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },
  backLink: { marginTop: 16 },
  backLinkText: { fontSize: 14, color: colors.deepRoyalLightPlum },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { color: '#b91c1c', textAlign: 'center', marginBottom: 12 },
  linkBtn: { marginTop: 8 },
  linkText: { fontSize: 14, color: colors.deepRoyalLightPlum },
});
