import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenBackButton from './ScreenBackButton';
import { colors } from '../theme/colors';

/**
 * Shared layout for auth screens (Login, Signup, VerifyOtp) – same as Veloura web.
 */
export default function AuthLayoutScreen({
  title,
  subtitle,
  children,
  backToHome = true,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.orb} pointerEvents="none" />
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
          <Text style={styles.logo}>Veloura</Text>
        </TouchableOpacity>
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.sectionLabel}>{title}</Text>
          <View style={styles.dividerLine} />
        </View>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {children}
        {backToHome && (
          <ScreenBackButton
            onPress={() => navigation.navigate('Home')}
            label="Back to home"
            variant="light"
            style={styles.backLink}
            textStyle={styles.backLinkText}
            iconSize={20}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.deepRoyalDarkPlum,
  },
  orb: {
    position: 'absolute',
    bottom: '25%',
    right: '25%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.deepRoyalLightPlum,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logo: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 28,
    color: colors.softBeige,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 32,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dividerLine: {
    width: 32,
    height: 1,
    backgroundColor: 'rgba(198, 165, 92, 0.5)',
  },
  sectionLabel: {
    fontSize: 12,
    color: colors.champagneGold,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(234, 227, 214, 0.7)',
    marginBottom: 24,
    textAlign: 'center',
  },
  backLink: {
    marginTop: 32,
    alignSelf: 'center',
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export const cardStyle = {
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.charcoalDark,
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  inputLast: { marginBottom: 24 },
  primaryButton: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.deepRoyalLightPlum,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orLine: { flex: 1, height: 1, backgroundColor: colors.borderGray },
  orText: {
    paddingHorizontal: 8,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  secondaryButton: {
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.borderGray,
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: colors.deepRoyalDarkPlum,
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  link: {
    color: colors.deepRoyalLightPlum,
    fontWeight: '600',
  },
};
