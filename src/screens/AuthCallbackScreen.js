import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';

/**
 * Parity with web /auth/callback (Google OAuth). Mobile app uses email/password + OTP;
 * OAuth completes in the browser. This screen handles deep links or manual navigation.
 */
export default function AuthCallbackScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.body}>
          Social sign-in is completed on the Veloura website. Use email and password here, or open
          veloura.com in your browser to continue with Google.
        </Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>Go to sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Home')} activeOpacity={0.85}>
          <Text style={styles.secondaryBtnText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory, justifyContent: 'center' },
  content: { padding: 28 },
  title: {
    fontSize: 24,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 8,
  },
  body: { fontSize: 15, color: colors.textMuted, lineHeight: 24, marginBottom: 24 },
  primaryBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    marginBottom: 12,
  },
  primaryBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  secondaryBtn: { paddingVertical: 12, alignItems: 'center' },
  secondaryBtnText: { color: colors.deepRoyalLightPlum, fontSize: 16, fontWeight: '600' },
});
