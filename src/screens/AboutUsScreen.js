import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';

export default function AboutUsScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Our story</Text>
        <Text style={styles.headerTitle}>
          About{' '}
          <Text style={styles.headerTitleAccent}>Veloura</Text>
        </Text>
        <Text style={styles.headerSub}>
          Luxury fragrances crafted with passion and artistry.
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our story</Text>
          <Text style={styles.sectionContent}>
            Veloura was born from a love of rare ingredients and timeless elegance. We work with master perfumers to create fragrances that become part of your identity — each bottle is crafted to be worn for generations.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our values</Text>
          <Text style={styles.sectionContent}>
            Artisan craftsmanship, rare ingredients sourced from around the world, and a commitment to sustainability. We believe a scent is your most intimate accessory — a silent signature that speaks before you do.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.sectionContent}>
            Have questions or want to share your Veloura experience? We’d love to hear from you. Reach out via our Contact Us page — we’re here to help.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  header: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingVertical: 32,
    paddingHorizontal: 24,
    paddingTop: 56,
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 12,
    color: colors.champagneGold,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Georgia',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  headerTitleAccent: { color: colors.champagneGold },
  headerSub: {
    fontSize: 14,
    color: 'rgba(234,227,214,0.8)',
    textAlign: 'center',
    maxWidth: 320,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 48 },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: colors.charcoalLight,
    lineHeight: 26,
  },
});
