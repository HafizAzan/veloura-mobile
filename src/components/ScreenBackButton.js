import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const VARIANT = {
  primary: { icon: colors.deepRoyalLightPlum, text: colors.deepRoyalLightPlum },
  light: { icon: 'rgba(234, 227, 214, 0.9)', text: 'rgba(234, 227, 214, 0.88)' },
  muted: { icon: colors.textMuted, text: colors.textMuted },
  white: { icon: colors.white, text: colors.white },
};

/**
 * Consistent back control (chevron + label). Avoids Unicode ← which breaks on some Android fonts.
 */
export default function ScreenBackButton({
  onPress,
  label,
  variant = 'primary',
  style,
  textStyle,
  iconSize = 22,
  hitSlop = { top: 8, bottom: 8, left: 8, right: 8 },
}) {
  const c = VARIANT[variant] || VARIANT.primary;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, style]}
      activeOpacity={0.75}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.iconWrap}>
        <Ionicons name="chevron-back" size={iconSize} color={c.icon} />
      </View>
      <Text style={[styles.label, { color: c.text }, textStyle]} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  iconWrap: {
    marginRight: 2,
    marginLeft: -2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    flexShrink: 1,
  },
});
