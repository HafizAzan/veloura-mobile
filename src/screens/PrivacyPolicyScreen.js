import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { sections } from '../data/mockData';
import { colors } from '../theme/colors';

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Legal</Text>
        <Text style={styles.headerTitle}>
          Privacy{' '}
          <Text style={styles.headerTitleAccent}>Policy</Text>
        </Text>
        <Text style={styles.headerSub}>
          How we collect, use, and protect your information.
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
        <Text style={styles.updated}>Last updated: March 2025</Text>
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
  headerSub: { fontSize: 14, color: 'rgba(234,227,214,0.8)', textAlign: 'center' },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 48 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    color: colors.charcoalLight,
    lineHeight: 24,
  },
  updated: { fontSize: 13, color: colors.textMuted, marginTop: 16 },
});
