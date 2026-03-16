import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useMenu } from '../context/MenuContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export default function Header({ title }) {
  const navigation = useNavigation();
  const { totalItems, openCart } = useCart();
  const { items: wishlistItems, openWishlist } = useWishlist();
  const { openMenu } = useMenu();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={openMenu} style={styles.iconBtn} hitSlop={12}>
        <Text style={styles.iconText}>☰</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.logoWrap}
      >
        <Text style={styles.logo}>{title || 'Veloura'}</Text>
      </TouchableOpacity>
      <View style={styles.rightRow}>
        <TouchableOpacity onPress={openWishlist} style={styles.iconBtn} hitSlop={12}>
          <Text style={styles.iconText}>♡</Text>
          {wishlistItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{wishlistItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={openCart} style={styles.iconBtn} hitSlop={12}>
          <Text style={styles.iconText}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.softBeige,
  },
  iconBtn: { padding: 8, position: 'relative' },
  iconText: { fontSize: 22 },
  logoWrap: { flex: 1, alignItems: 'center' },
  logo: {
    fontFamily: 'Georgia',
    fontSize: 20,
    color: colors.deepRoyalDarkPlum,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  rightRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.deepRoyalLightPlum,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },
});
