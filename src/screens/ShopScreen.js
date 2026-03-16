import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { getProducts } from '../api/products';
import { colors } from '../theme/colors';

function ProductCard({ product }) {
  const navigation = useNavigation();
  const id = product.id ?? product._id;
  const title = product.title || '';
  const image = typeof product.image === 'string' ? product.image : product.image?.uri;
  const price = product.price ?? 0;
  const isSale = product.isSale;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { productId: id })}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrap}>
        {image ? (
          <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <View style={[styles.cardImage, styles.placeholderImage]} />
        )}
        {isSale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleBadgeText}>Sale</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
      <Text style={styles.cardPrice}>${Number(price).toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

export default function ShopScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const load = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={colors.deepRoyalLightPlum} />
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <Text style={styles.headerSub}>All fragrances</Text>
      </View>
      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => load()} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id ?? item._id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <ProductCard product={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(true)}
              colors={[colors.deepRoyalLightPlum]}
            />
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No products yet.</Text>
            </View>
          }
        />
      )}
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
    fontSize: 24,
    fontFamily: 'Georgia',
    color: colors.white,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 14,
    color: 'rgba(234,227,214,0.8)',
  },
  listContent: { padding: 12, paddingBottom: 32 },
  row: { gap: 12, marginBottom: 12, paddingHorizontal: 4 },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  imageWrap: { position: 'relative', aspectRatio: 1 },
  cardImage: { width: '100%', height: '100%' },
  placeholderImage: { backgroundColor: colors.softBeige },
  saleBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.tanBrown,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saleBadgeText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  cardTitle: {
    fontSize: 14,
    color: colors.charcoalDark,
    padding: 10,
    paddingBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.deepRoyalDarkPlum,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: colors.charcoalLight },
  errorText: { color: '#b91c1c', textAlign: 'center', marginBottom: 12 },
  retryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
  },
  retryText: { color: colors.white, fontWeight: '600' },
  emptyText: { color: colors.textMuted },
});
