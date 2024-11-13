
import {StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LightTheme} from '../../Utils/Styles/Theme';
import {AuthApp_Icon, Email_Icon} from '../../Assets/Svgs';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import PodCastInputField from '../../Components/InputField';
import PodCastButton from '../../Components/Button';
import { RootStackParamList } from '../../Utils/Types/Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_ROUTES } from '../../Utils/Routes/RouteConst';
import {Formik} from 'formik';
import * as Yup from 'yup';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const ResetPasswordScreen = () => {  

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleForgotPassword =(value:any)=>{
      console.log(value)
     navigation.navigate(NAVIGATION_ROUTES.OTPVERIFICATION as keyof RootStackParamList)
    }
  return (
  
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.ViewContent}>
          <AuthApp_Icon />
          <Text style={styles.titleText}>Reset Password</Text>
          <Text style={styles.subTittleText}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
          <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values) => handleForgotPassword(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
          <PodCastInputField
            leftIcon={<Email_Icon />}
            placeholder={'Enter your email'}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            errorMessage={touched.email && errors.email ? errors.email : undefined} 
          />
          <PodCastButton
            onPress={handleSubmit}
            title={"Send Code"}
          />
        </>
          )}
          </Formik>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Didn’t Receive Code?</Text>
          <TouchableOpacity>
            <Text style={[styles.accountText,{fontWeight:'bold'}]}> Resend</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
 
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
    paddingTop: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  ViewContent: {
    flexGrow: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingBottom: responsiveHeight(10), 
  },
  titleText: {
    color: LightTheme.colors.textcolor,
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    marginTop: responsiveHeight(6),
    marginBottom: responsiveHeight(1),
  },
  subTittleText:{
    color: LightTheme.colors.textcolor,
    fontSize: responsiveFontSize(1.8),
    width:responsiveWidth(74),
    alignSelf:'center',
    textAlign:'center',
    lineHeight: responsiveHeight(2.5),
    marginBottom:responsiveHeight(2)
  },

  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(4), 
  },
  accountText:{
    color:LightTheme.colors.textcolor,
  },
});
