import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { submitContact } from '../api/contact';
import { colors } from '../theme/colors';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactUsScreen() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await submitContact(form);
      setForm(initialForm);
      setErrors({});
      setSubmitted(true);
      Alert.alert('Sent', "We'll get back to you within 24–48 hours.");
    } catch (err) {
      setErrors((e) => ({ ...e, message: err?.message || 'Failed to send. Please try again.' }));
      Alert.alert('Error', err?.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Contact us</Text>
          <Text style={styles.headerSub}>Reach out — we're here to help.</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {submitted && (
              <Text style={styles.successText}>Thank you! We'll be in touch soon.</Text>
            )}
            <Field
              label="Name"
              value={form.name}
              onChange={(t) => { setForm((f) => ({ ...f, name: t })); setErrors((e) => ({ ...e, name: '' })); }}
              error={errors.name}
              editable={!loading}
            />
            <Field
              label="Email"
              value={form.email}
              onChange={(t) => { setForm((f) => ({ ...f, email: t })); setErrors((e) => ({ ...e, email: '' })); }}
              error={errors.email}
              keyboardType="email-address"
              editable={!loading}
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(t) => setForm((f) => ({ ...f, phone: t }))}
              keyboardType="phone-pad"
              editable={!loading}
            />
            <Field
              label="Subject"
              value={form.subject}
              onChange={(t) => { setForm((f) => ({ ...f, subject: t })); setErrors((e) => ({ ...e, subject: '' })); }}
              error={errors.subject}
              editable={!loading}
            />
            <View style={styles.field}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textArea, errors.message ? styles.inputError : null]}
                value={form.message}
                onChangeText={(t) => { setForm((f) => ({ ...f, message: t })); setErrors((e) => ({ ...e, message: '' })); }}
                placeholder="Your message"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                editable={!loading}
              />
              {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}
            </View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.submitBtnText}>Send message</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({ label, value, onChange, error, keyboardType, editable }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.softIvory },
  keyboard: { flex: 1 },
  header: {
    backgroundColor: colors.deepRoyalDarkPlum,
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  headerTitle: { fontSize: 24, fontFamily: 'Georgia', color: colors.white, marginBottom: 4 },
  headerSub: { fontSize: 14, color: 'rgba(234,227,214,0.8)' },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 48 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  successText: { color: colors.tanBrown, marginBottom: 16, fontWeight: '500' },
  field: { marginBottom: 16 },
  label: { fontSize: 14, color: colors.charcoalDark, marginBottom: 6 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.charcoalDark,
  },
  textArea: { height: 100, paddingTop: 12, textAlignVertical: 'top' },
  inputError: { borderColor: '#b91c1c' },
  errorText: { fontSize: 12, color: '#b91c1c', marginTop: 4 },
  submitBtn: {
    height: 52,
    backgroundColor: colors.deepRoyalLightPlum,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },
});
