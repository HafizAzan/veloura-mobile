import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import ScreenBackButton from '../components/ScreenBackButton';
import { colors } from '../theme/colors';

export default function AccountProfileScreen() {
  const navigation = useNavigation();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.centered}>
          <Text style={styles.muted}>Sign in to view your profile.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenBackButton
          onPress={() => navigation.goBack()}
          label="Back to account"
          variant="primary"
          style={styles.back}
        />
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.sub}>Your account details (same as web).</Text>
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Name</Text>
          <Text style={styles.fieldValue}>{user?.name || '—'}</Text>
          <View style={styles.divider} />
          <Text style={styles.fieldLabel}>Email</Text>
          <Text style={styles.fieldValue}>{user?.email || '—'}</Text>
        </View>
        <Text style={styles.hint}>
          To change your password or update your details, use the Veloura website or contact support.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  scroll: { padding: 24, paddingBottom: 48 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  muted: { fontSize: 16, color: colors.textMuted },
  back: { marginBottom: 20 },
  title: {
    fontSize: 24,
    fontFamily: 'Georgia',
    color: colors.deepRoyalDarkPlum,
    marginBottom: 8,
  },
  sub: { fontSize: 14, color: colors.textMuted, marginBottom: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderGray,
    padding: 20,
    marginBottom: 16,
  },
  fieldLabel: { fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  fieldValue: { fontSize: 17, color: colors.charcoalDark, marginTop: 4, marginBottom: 16 },
  divider: { height: 1, backgroundColor: colors.borderGray, marginBottom: 16 },
  hint: { fontSize: 14, color: colors.textMuted, lineHeight: 22 },
});
