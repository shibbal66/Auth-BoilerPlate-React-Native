
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NAVIGATION_ROUTES } from './RouteConst';
import {  OnBoardingScreen,CreateNewPasswordScreen,OTPVerificationScreen,PasswordChangedScreen,ResetPasswordScreen, Sign_InScreen,Sign_UpScreen, ProfileScreen, EditProfileScreen } from './Imports';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    const option_Screen = {
      headerShown: false,
  };
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION_ROUTES.ONBOARDING} component={OnBoardingScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.SIGN_IN} component={Sign_InScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.SIGN_UP} component={Sign_UpScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.OTPVERIFICATION} component={OTPVerificationScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.RESETPASSWORD} component={ResetPasswordScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.CREATENEWPASSWORD} component={CreateNewPasswordScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.PASSWORDCHANGED} component={PasswordChangedScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.PROFILESCREEN} component={ProfileScreen} options={option_Screen} />
      <Stack.Screen name={NAVIGATION_ROUTES.EDITPROFILE} component={EditProfileScreen} options={option_Screen} />

    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation