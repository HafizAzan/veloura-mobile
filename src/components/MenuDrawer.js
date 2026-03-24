import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../context/MenuContext';
import { useAuth } from '../context/AuthContext';
import { navItems } from '../data/mockData';
import { colors } from '../theme/colors';

const PANEL_WIDTH = 280;

export default function MenuDrawer() {
  const navigation = useNavigation();
  const { isMenuOpen, closeMenu } = useMenu();
  const { isAuthenticated, logout } = useAuth();
  const slideAnim = useRef(new Animated.Value(-PANEL_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isMenuOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMenuOpen, slideAnim, overlayAnim]);

  const runCloseAnimation = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -PANEL_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      closeMenu();
    });
  };

  const handleNav = (route) => {
    runCloseAnimation();
    if (route === 'Cart') {
      navigation.navigate('Cart');
      return;
    }
    navigation.navigate(route);
  };

  if (!isMenuOpen) return null;

  return (
    <Modal
      visible={isMenuOpen}
      transparent
      animationType="none"
      onRequestClose={runCloseAnimation}
      statusBarTranslucent
    >
      <View style={styles.wrapper}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayAnim,
            },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={runCloseAnimation} />
        </Animated.View>
        <Animated.View
          style={[
            styles.panel,
            {
              width: PANEL_WIDTH,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.panelInner}>
            <View style={styles.panelHead}>
              <Text style={styles.logo}>Veloura</Text>
              <TouchableOpacity onPress={runCloseAnimation} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.navScroll}
              contentContainerStyle={styles.navScrollContent}
              showsVerticalScrollIndicator
              keyboardShouldPersistTaps="handled"
              bounces
            >
              {navItems.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.navItem}
                  onPress={() => handleNav(item.route)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.navItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
              {isAuthenticated ? (
                <>
                  <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => handleNav('Account')}
                  >
                    <Text style={styles.navItemText}>Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.navItem, styles.logoutItem]}
                    onPress={() => {
                      runCloseAnimation();
                      logout();
                      navigation.navigate('Home');
                    }}
                  >
                    <Text style={styles.logoutText}>Log out</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => handleNav('Login')}
                >
                  <Text style={styles.navItemText}>Sign in</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.deepRoyalLightPlum,
    paddingTop: 48,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 16,
  },
  panelInner: {
    flex: 1,
    minHeight: 0,
  },
  panelHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  logo: {
    fontFamily: 'Georgia',
    fontSize: 22,
    color: colors.softBeige,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  closeBtn: { padding: 8 },
  closeText: { fontSize: 20, color: colors.softBeige },
  navScroll: {
    flex: 1,
    minHeight: 0,
  },
  navScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  navItem: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  navItemText: { fontSize: 16, color: colors.softBeige },
  logoutItem: { borderBottomWidth: 0, marginTop: 8 },
  logoutText: { fontSize: 16, color: colors.champagneGold, fontWeight: '600' },
});
