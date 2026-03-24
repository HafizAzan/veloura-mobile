import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import ScreenBackButton from '../components/ScreenBackButton';
import { colors } from '../theme/colors';

export default function AccountAddressesScreen() {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.centered}>
          <Text style={styles.muted}>Sign in to manage addresses.</Text>
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
        <Text style={styles.title}>Addresses</Text>
        <Text style={styles.sub}>Manage your shipping addresses.</Text>
        <View style={styles.card}>
          <Text style={styles.body}>
            Saved addresses and full address book management match the website. On mobile, enter your
            shipping address at checkout for each order.
          </Text>
          <Text style={styles.body}>
            Need help updating a saved address?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('ContactUs')}>
              Contact us
            </Text>
            .
          </Text>
        </View>
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
  },
  body: { fontSize: 15, color: colors.charcoalLight, lineHeight: 24, marginBottom: 14 },
  link: { color: colors.deepRoyalLightPlum, fontWeight: '600' },
});
