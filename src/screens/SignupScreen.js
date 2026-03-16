import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import AuthLayoutScreen, { cardStyle } from '../components/AuthLayoutScreen';
import { colors } from '../theme/colors';

export default function SignupScreen() {
  const navigation = useNavigation();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const result = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      if (result.needsConfirmation && result.email) {
        navigation.replace('VerifyOtp', {
          email: result.email,
          from: 'signup',
          next: 'Home',
        });
        return;
      }
      navigation.replace('Home');
    } catch (err) {
      setError(err?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayoutScreen
      title="Create account"
      subtitle="Fill in your details to get started."
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={cardStyle.card}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
              style={[cardStyle.input, error ? styles.inputError : null]}
              placeholder="Full name"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={(t) => { setName(t); setError(''); }}
              editable={!loading}
            />
            <TextInput
              style={cardStyle.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={(t) => { setEmail(t); setError(''); }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            <TextInput
              style={cardStyle.input}
              placeholder="Password (at least 6 characters)"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              secureTextEntry
              editable={!loading}
            />
            <TextInput
              style={[cardStyle.input, cardStyle.inputLast, error ? styles.inputError : null]}
              placeholder="Confirm password"
              placeholderTextColor={colors.textMuted}
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); setError(''); }}
              secureTextEntry
              editable={!loading}
            />
            <TouchableOpacity
              style={cardStyle.primaryButton}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={cardStyle.primaryButtonText}>Create account</Text>
              )}
            </TouchableOpacity>
            <View style={cardStyle.orRow}>
              <View style={cardStyle.orLine} />
              <Text style={cardStyle.orText}>Or</Text>
              <View style={cardStyle.orLine} />
            </View>
            <TouchableOpacity
              style={cardStyle.secondaryButton}
              onPress={() => Alert.alert('Google', 'Use web app for Google sign in.')}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={cardStyle.secondaryButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <Text style={cardStyle.footerText}>
              Already have an account?{' '}
              <Text
                style={cardStyle.link}
                onPress={() => navigation.navigate('Login')}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayoutScreen>
  );
}

const styles = StyleSheet.create({
  keyboardView: { width: '100%' },
  scrollContent: { alignItems: 'center', paddingBottom: 24 },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    marginBottom: 12,
  },
  inputError: {
    borderColor: '#b91c1c',
  },
});
