import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { accountHubCards } from '../data/accountNav';

export default function AccountHubBody({ displayName, onLogout }) {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.labelRow}>
          <View style={styles.labelLine} />
          <View style={styles.labelInner}>
            <Ionicons name="person-outline" size={14} color={colors.champagneGold} />
            <Text style={styles.heroLabel}>My Account</Text>
          </View>
          <View style={styles.labelLine} />
        </View>
        <Text style={styles.heroTitle}>
          Welcome back <Text style={styles.heroTitleAccent}>{displayName}</Text>
        </Text>
        <Text style={styles.heroSub}>Manage your profile, orders, and saved addresses.</Text>
      </View>

      <View style={styles.cardsWrap}>
        {accountHubCards.map((c) => (
          <TouchableOpacity
            key={c.key}
            style={styles.card}
            onPress={() => navigation.navigate(c.route)}
            activeOpacity={0.85}
          >
            <View style={styles.cardIconWrap}>
              <Ionicons name={c.icon} size={24} color={colors.deepRoyalLightPlum} />
            </View>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardDesc}>{c.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.signOutBtn} onPress={onLogout} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={18} color={colors.textMuted} />
        <Text style={styles.signOutText}> Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  hero: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  labelLine: { width: 40, height: 1, backgroundColor: 'rgba(198, 165, 92, 0.55)' },
  labelInner: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroLabel: {
    fontSize: 11,
    color: colors.champagneGold,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '600',
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
  cardsWrap: { padding: 24, gap: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(58, 30, 70, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 6,
    fontWeight: '500',
  },
  cardDesc: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    padding: 12,
  },
  signOutText: { fontSize: 15, color: colors.textMuted },
});
