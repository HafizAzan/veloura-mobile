import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { STATIC_PAGES } from '../data/staticContentPages';
import { colors } from '../theme/colors';

export default function ContentPageScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const config = STATIC_PAGES[route.name];

  if (!config) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Page not found: {route.name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.labelRow}>
            <View style={styles.labelLine} />
            <View style={styles.labelInner}>
              <Ionicons name={config.heroIcon || 'document-text-outline'} size={14} color={colors.champagneGold} />
              <Text style={styles.heroLabel}>{config.heroLabel}</Text>
            </View>
            <View style={styles.labelLine} />
          </View>
          <Text style={styles.heroTitle}>
            {config.title} <Text style={styles.heroTitleAccent}>{config.titleAccent}</Text>
          </Text>
          <Text style={styles.heroSub}>{config.subtitle}</Text>
        </View>

        <View style={styles.body}>
          {config.sections.map((sec, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{sec.title}</Text>
              <Text style={styles.cardContent}>{sec.content}</Text>
            </View>
          ))}

          {config.storeLocations?.length ? (
            <View style={styles.card}>
              <Text style={styles.locationsHeading}>Our locations</Text>
              {config.storeLocations.map((store, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.storeRow,
                    idx === config.storeLocations.length - 1 ? styles.storeRowLast : null,
                  ]}
                >
                  <Ionicons name="location-outline" size={20} color={colors.champagneGold} style={styles.storeIcon} />
                  <View style={styles.storeText}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <Text style={styles.storeAddress}>{store.address}</Text>
                    <Text style={styles.storeHours}>{store.hours}</Text>
                    {store.note ? <Text style={styles.storeNote}>{store.note}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {config.primaryCta ? (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate(config.primaryCta.route)}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>{config.primaryCta.label}</Text>
            </TouchableOpacity>
          ) : null}

          {config.footerLinks?.length ? (
            <View style={styles.footerRow}>
              {config.footerLinks.flatMap((link, i) => {
                const btn = (
                  <Text
                    key={link.route}
                    style={styles.footerLink}
                    onPress={() => navigation.navigate(link.route)}
                  >
                    {link.label}
                  </Text>
                );
                if (i === 0) return [btn];
                return [<Text key={`dot-${link.route}`} style={styles.footerDot}> · </Text>, btn];
              })}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  scroll: { paddingBottom: 40 },
  missing: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  missingText: { color: colors.textMuted },
  hero: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
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
    maxWidth: 340,
    lineHeight: 22,
  },
  body: { padding: 24, gap: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    padding: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 10,
    fontWeight: '500',
  },
  cardContent: { fontSize: 15, color: colors.textMuted, lineHeight: 24 },
  locationsHeading: {
    fontSize: 20,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 16,
    fontWeight: '500',
  },
  storeRow: {
    flexDirection: 'row',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    paddingBottom: 16,
  },
  storeRowLast: { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
  storeIcon: { marginTop: 2 },
  storeText: { flex: 1, marginLeft: 10 },
  storeName: { fontSize: 17, fontWeight: '600', color: colors.deepRoyalDarkPlum, marginBottom: 4 },
  storeAddress: { fontSize: 14, color: colors.textMuted },
  storeHours: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  storeNote: { fontSize: 13, color: colors.champagneMutedGold, marginTop: 6, fontStyle: 'italic' },
  primaryBtn: {
    alignSelf: 'center',
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
  },
  primaryBtnText: { color: colors.softBeige, fontSize: 15, fontWeight: '600' },
  footerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  footerDot: { color: colors.textMuted, fontSize: 13 },
  footerLink: { color: colors.deepRoyalLightPlum, fontSize: 13, fontWeight: '600' },
});
