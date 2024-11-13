import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LightTheme} from '../../Utils/Styles/Theme';
import {
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
import PodCastInputField from '../../Components/InputField';
import PodCastButton from '../../Components/Button';
import {RootStackParamList} from '../../Utils/Types/Types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, validatePathConfig} from '@react-navigation/native';
import {NAVIGATION_ROUTES} from '../../Utils/Routes/RouteConst';
import {CheckBox} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
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
    // .min()
    .required('Password is required'),
});

const Sign_InScreen = () => {
  const [checked, setChecked] = React.useState(true);
  const [visible, setVisible] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const Hide = () => {
    setVisible(!visible);
  };

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
   
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.ViewContent}>
          <AuthApp_Icon />
          <Text style={styles.titleText}>Sign In your Account</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
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
                <PodCastInputField
                  leftIcon={<Email_Icon />}
                  placeholder={'Enter your email'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorMessage={touched.email && errors.email ? errors.email :undefined}
                />
                <PodCastInputField
                  leftIcon={<Password_Icon />}
                  placeholder={'Enter your password'}
                  onChangeText={handleChange('password')} 
                  onBlur={handleBlur('password')} 
                  value={values.password} 
                  onRightPress={Hide}
                  rightIcon={visible ? <CloseEye_Icon /> : <OpenEye_Icon />} 
                  visibility={visible}
                  errorMessage={touched.password && errors.password ? errors.password :undefined}
                />
                <View style={styles.checkContainer}>
                  <View style={styles.checkBox}>
                    <CheckBox
                      title={'Remeber me'}
                      checked={checked}
                      onPress={toggleCheckbox}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor={LightTheme.colors.colorLoginButton}
                      containerStyle={styles.checkboxContainer}
                      textStyle={styles.CheckBoxText}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(
                        NAVIGATION_ROUTES.RESETPASSWORD as keyof RootStackParamList,
                      );
                    }}>
                    <Text style={styles.CheckBoxText}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                <PodCastButton title={'Sign In'} onPress={handleSubmit} />
              </>
            )}
          </Formik>
          <Or_Line style={styles.line} />
          <View style={styles.socialcontainer}>
            <TouchableOpacity onPress={handleGoogleSignIn}>
              <Google_Icon />
            </TouchableOpacity>
           {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={handleAppleSignIn}>
                <Apple_Icon />
              </TouchableOpacity>
            )}
         <TouchableOpacity onPress={handleFaceBookSignIn}>
            <Facebook_Icon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                NAVIGATION_ROUTES.SIGN_UP as keyof RootStackParamList,
              );
            }}>
            <Text style={[styles.accountText, {fontWeight: 'bold'}]}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>


  );
};

export default Sign_InScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
    paddingTop: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: "space-between",
  },
  ViewContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: responsiveHeight(10),
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
    marginBottom: responsiveHeight(2),
    marginTop:responsiveHeight(1)
  },
  checkBox: {
    flexDirection: 'row',
    width: responsiveWidth(35),
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: responsiveHeight(2),
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(4),
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0, 
    padding: 0, 
  },
  accountText: {
    color: LightTheme.colors.textcolor,
  },
});
