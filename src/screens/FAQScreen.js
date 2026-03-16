import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { faqs } from '../data/mockData';
import { colors } from '../theme/colors';

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Help</Text>
        <Text style={styles.headerTitle}>
          Frequently Asked{' '}
          <Text style={styles.headerTitleAccent}>Questions</Text>
        </Text>
        <Text style={styles.headerSub}>
          Quick answers to common questions about orders, shipping, and our fragrances.
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <TouchableOpacity
              key={idx}
              style={styles.card}
              onPress={() => setOpenIndex(isOpen ? null : idx)}
              activeOpacity={0.9}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.question}>{faq.q}</Text>
                <Text style={styles.chevron}>{isOpen ? '−' : '+'}</Text>
              </View>
              {isOpen && <Text style={styles.answer}>{faq.a}</Text>}
            </TouchableOpacity>
          );
        })}
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
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.deepRoyalDarkPlum,
    marginRight: 12,
  },
  chevron: { fontSize: 20, color: colors.champagneGold },
  answer: {
    fontSize: 15,
    color: colors.charcoalLight,
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
});
