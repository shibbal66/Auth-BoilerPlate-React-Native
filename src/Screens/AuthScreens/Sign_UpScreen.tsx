import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LightTheme} from '../../Utils/Styles/Theme';
import {
  Account_Icon,
  Apple_Icon,
  AuthApp_Icon,
  CloseEye_Icon,
  Email_Icon,
  Facebook_Icon,
  Google_Icon,
  OpenEye_Icon,
  Or_Line,
  Password_Icon,
} from '../../Assets/Svgs';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import PodCastButton from '../../Components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../Utils/Types/Types';
import {NAVIGATION_ROUTES} from '../../Utils/Routes/RouteConst';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputField from '../../Components/InputField';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').max(25),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .test('valid-email', 'Invalid email format', value => {
      if (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(value);
      }
      return true;
    }),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

const Sign_UpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleGoogleSignIn = ()=>{
      console.log("Google Sign")
    }
   
    const handleFaceBookSignIn = ()=>{
     console.log("FaceBook Sign")
   }
   
   const handleAppleSignIn = ()=>{
     console.log("Apple Sign")
   }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={Platform.OS === 'ios' ? 100 : 220}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>
        <View style={styles.ViewContent}>
          <AuthApp_Icon />
          <Text style={styles.titleText}>Create your Account</Text>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, {resetForm}) => {
              Keyboard.dismiss();
              console.log('Form Submitted', values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <InputField
                  leftIcon={<Account_Icon />}
                  placeholder={'Enter your name'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  errorMessage={touched.name && errors.name ? errors.name :undefined}
                />
                <InputField
                  leftIcon={<Email_Icon />}
                  placeholder={'Enter your email'}
                  onChangeText={text =>
                    setFieldValue('email', text.replace(/\s/g, ''))
                  }
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorMessage={touched.email && errors.email ? errors.email : undefined}
                />
                <InputField
                  leftIcon={<Password_Icon />}
                  placeholder={'Enter your password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  rightIcon={
                    passwordVisible ? <OpenEye_Icon /> : <CloseEye_Icon />
                  }
                  errorMessage={touched.password && errors.password ? errors.password : undefined}
                  visibility={passwordVisible}
                  onRightPress={() => setPasswordVisible(!passwordVisible)}
                />
                <InputField
                  leftIcon={<Password_Icon />}
                  placeholder={'Enter your confirm password'}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  rightIcon={
                    confirmPasswordVisible ? (
                      <OpenEye_Icon />
                    ) : (
                      <CloseEye_Icon />
                    )
                  }
                  errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword :undefined}
                  visibility={confirmPasswordVisible}
                  onRightPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                />
                <PodCastButton title={'Sign Up'} onPress={handleSubmit} />
              </>
            )}
          </Formik>
          <Or_Line style={styles.line} />
          <View style={styles.socialcontainer}>
            <TouchableOpacity onPress={handleGoogleSignIn}>
              <Google_Icon />
            </TouchableOpacity  >
            {Platform.OS === 'ios' && (
              <TouchableOpacity onPress={handleAppleSignIn}>
                <Apple_Icon />
              </TouchableOpacity>
            )}
            <TouchableOpacity  onPress={handleFaceBookSignIn} >
              <Facebook_Icon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                NAVIGATION_ROUTES.SIGN_IN as keyof RootStackParamList,
              )
            }>
            <Text style={[styles.accountText, {fontWeight: 'bold'}]}>
              {' '}
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Sign_UpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
    paddingTop: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ViewContent: {
    alignItems: 'center',
  },
  titleText: {
    color: LightTheme.colors.textcolor,
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    marginTop: responsiveHeight(6),
    marginBottom: responsiveHeight(2),
  },
  checkContainer: {
    flexDirection: 'row',
    width: responsiveWidth(90),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(2),
  },
  checkBox: {
    flexDirection: 'row',
    width: responsiveWidth(35),
    justifyContent: 'space-between',
  },
  CheckBoxText: {
    color: LightTheme.colors.textcolor,
  },
  line: {
    marginTop: responsiveHeight(3),
  },
  socialcontainer: {
    width: responsiveWidth(40),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
   marginVertical: responsiveHeight(1),
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(4),
  },
  accountText: {
    color: LightTheme.colors.textcolor,
  },
});
