import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, isAuthenticated } = useAuth();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.body}>
        <Text style={styles.welcome}>
          {isAuthenticated
            ? `Welcome back, ${user?.name || user?.email}.`
            : 'Welcome to Veloura.'}
        </Text>
        <Text style={styles.sub}>
          Shop luxury fragrances, manage your bag and wishlist, and get in touch — all in one app.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Shop')}
          style={styles.primaryBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Shop now</Text>
        </TouchableOpacity>
        {!isAuthenticated && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.secondaryBtn}
          >
            <Text style={styles.secondaryBtnText}>Create account</Text>
          </TouchableOpacity>
        )}
        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
            <Text style={styles.linkText}>Contact us</Text>
          </TouchableOpacity>
          <Text style={styles.dot}> · </Text>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <Text style={styles.linkText}>FAQ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  body: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 24,
    color: colors.charcoalDark,
    marginBottom: 12,
  },
  sub: {
    fontSize: 16,
    color: colors.charcoalLight,
    lineHeight: 24,
    marginBottom: 24,
  },
  primaryBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    marginBottom: 24,
  },
  secondaryBtnText: {
    color: colors.deepRoyalLightPlum,
    fontSize: 16,
    fontWeight: '600',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: { fontSize: 14, color: colors.deepRoyalLightPlum },
  dot: { color: colors.textMuted },
});
