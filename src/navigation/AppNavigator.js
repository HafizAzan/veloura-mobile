import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import ShopScreen from '../screens/ShopScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CheckoutSuccessScreen from '../screens/CheckoutSuccessScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import FAQScreen from '../screens/FAQScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsScreen from '../screens/TermsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  contentStyle: { backgroundColor: '#fdf6f2' },
};

const headerScreenOptions = {
  ...defaultScreenOptions,
  header: () => <Header />,
};

const authScreenOptions = {
  ...defaultScreenOptions,
  headerShown: false,
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={defaultScreenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={headerScreenOptions} />
        <Stack.Screen name="Login" component={LoginScreen} options={authScreenOptions} />
        <Stack.Screen name="Signup" component={SignupScreen} options={authScreenOptions} />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtpScreen}
          options={authScreenOptions}
          initialParams={{ email: '', from: 'signup', next: 'Home' }}
        />
        <Stack.Screen name="Shop" component={ShopScreen} options={headerScreenOptions} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={headerScreenOptions} />
        <Stack.Screen name="Cart" component={CartScreen} options={headerScreenOptions} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={headerScreenOptions} />
        <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} options={headerScreenOptions} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={headerScreenOptions} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} options={headerScreenOptions} />
        <Stack.Screen name="FAQ" component={FAQScreen} options={headerScreenOptions} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={headerScreenOptions} />
        <Stack.Screen name="Terms" component={TermsScreen} options={headerScreenOptions} />
      </Stack.Navigator>
      <MenuDrawer />
      <CartDrawer />
      <WishlistDrawer />
    </NavigationContainer>
  );
}
