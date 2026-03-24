import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import AccountHubBody from '../components/AccountHubBody';
import { colors } from '../theme/colors';

export default function AccountScreen() {
  const navigation = useNavigation();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const displayName = user?.name || user?.email || 'Account';

  const onLogout = () => {
    Alert.alert('Log out?', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.navigate('Home');
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.deepRoyalLightPlum} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>My Account</Text>
          <Text style={styles.heroTitle}>
            Sign in to continue <Text style={styles.heroTitleAccent}>Veloura</Text>
          </Text>
          <Text style={styles.heroSub}>Manage your profile, orders, and saved addresses.</Text>
        </View>
        <View style={styles.guestBody}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <AccountHubBody displayName={displayName} onLogout={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  centered: {
    flex: 1,
    backgroundColor: colors.softIvory,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroLabel: {
    fontSize: 11,
    color: colors.champagneGold,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 26,
    fontFamily: 'Georgia',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  heroTitleAccent: { color: colors.champagneGold, fontStyle: 'italic' },
  heroSub: {
    fontSize: 15,
    color: 'rgba(234,227,214,0.8)',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22,
  },
  guestBody: { padding: 24, alignItems: 'center' },
  primaryBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    marginBottom: 12,
  },
  primaryBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  secondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
  },
  secondaryBtnText: { color: colors.deepRoyalLightPlum, fontSize: 16, fontWeight: '600' },
});
