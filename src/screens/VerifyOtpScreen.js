import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import AuthLayoutScreen, { cardStyle } from '../components/AuthLayoutScreen';
import ScreenBackButton from '../components/ScreenBackButton';
import { colors } from '../theme/colors';

export default function VerifyOtpScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { verifyOtp, resendConfirmation } = useAuth();
  const email = (route.params?.email || '').trim();
  const from = route.params?.from || 'signup';
  const next = route.params?.next || 'Home';

  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      navigation.replace(from === 'login' ? 'Login' : 'Signup');
    }
  }, [email, from, navigation]);

  const handleVerify = async () => {
    const code = otp.replace(/\s/g, '');
    if (code.length < 6 || code.length > 8) {
      setError('Please enter the 6–8 digit code from your email.');
      return;
    }
    setError('');
    setVerifying(true);
    try {
      await verifyOtp({ email, token: code });
      navigation.replace(next);
    } catch (err) {
      setError(err?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setResending(true);
    try {
      await resendConfirmation(email);
      Alert.alert('Done', 'A new code has been sent to your email.');
    } catch (err) {
      setError(err?.message || 'Could not send a new code. Try again.');
    } finally {
      setResending(false);
    }
  };

  const handleOtpChange = (text) => {
    setOtp(text.replace(/\D/g, '').slice(0, 8));
    setError('');
  };

  const backLink = from === 'login' ? 'Login' : 'Signup';
  const backLabel = from === 'login' ? 'Back to sign in' : 'Use a different email';

  if (!email) {
    return null;
  }

  return (
    <AuthLayoutScreen
      title="Verify your email"
      subtitle="Enter the code we sent to your inbox."
    >
      <StatusBar style="light" />
      <View style={cardStyle.card}>
        <View style={styles.iconRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✉</Text>
          </View>
        </View>
        <Text style={styles.emailText}>
          We've sent a verification code to <Text style={styles.bold}>{email}</Text>
        </Text>
        <Text style={styles.hint}>Enter the code below to confirm your account.</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={[cardStyle.input, cardStyle.inputLast, styles.otpInput, error ? styles.inputError : null]}
          placeholder="000000"
          placeholderTextColor={colors.textMuted}
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType="number-pad"
          maxLength={8}
          editable={!verifying}
        />
        <TouchableOpacity
          style={cardStyle.primaryButton}
          onPress={handleVerify}
          disabled={verifying}
          activeOpacity={0.85}
        >
          {verifying ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={cardStyle.primaryButtonText}>Verify and continue</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resendBtn}
          onPress={handleResend}
          disabled={resending}
        >
          <Text style={styles.resendText}>
            {resending ? 'Sending…' : 'Resend code'}
          </Text>
        </TouchableOpacity>
        <ScreenBackButton
          onPress={() => navigation.navigate(backLink)}
          label={backLabel}
          variant="muted"
          style={styles.backBtn}
          textStyle={styles.backBtnText}
        />
      </View>
    </AuthLayoutScreen>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(58, 30, 70, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  emailText: {
    fontSize: 14,
    color: colors.charcoalLight,
    textAlign: 'center',
    marginBottom: 4,
  },
  bold: { fontWeight: '700' },
  hint: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    marginBottom: 12,
  },
  otpInput: {
    textAlign: 'center',
    letterSpacing: 8,
    fontSize: 18,
  },
  inputError: { borderColor: '#b91c1c' },
  resendBtn: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  resendText: {
    fontSize: 14,
    color: colors.deepRoyalLightPlum,
  },
  backBtn: {
    alignSelf: 'center',
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
