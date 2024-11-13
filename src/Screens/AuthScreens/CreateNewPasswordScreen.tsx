
import {StyleSheet, Text, View,TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LightTheme} from '../../Utils/Styles/Theme';
import { AuthApp_Icon, CloseEye_Icon,OpenEye_Icon, Password_Icon} from '../../Assets/Svgs';
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


const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/\d/, 'Password must contain at least one digit')
  .matches(/[\W_]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const CreateNewPasswordScreen = () => {  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
 const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


 const handlePasswordUpdate = (values:any)=>{
  console.log(values)
  navigation.navigate(NAVIGATION_ROUTES.PASSWORDCHANGED as keyof RootStackParamList)
 }
    
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.ViewContent}>
          <AuthApp_Icon />
          <Text style={styles.titleText}>Create New Password</Text>
          <Text style={styles.subTittleText}>Your new password must be unique from those previously used.</Text>
          <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={PasswordSchema}
        onSubmit={(values) => handlePasswordUpdate(values)}
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
            leftIcon={<Password_Icon />}
            placeholder={'Enter your password'}
            onChangeText={handleChange("newPassword")}
            onBlur={handleBlur("newPassword")}
            value={values.newPassword}
            rightIcon={passwordVisible ?<CloseEye_Icon/>:<OpenEye_Icon/>}
            visibility={passwordVisible}
            onRightPress={() => setPasswordVisible(!passwordVisible)}
            errorMessage={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
          />
            <PodCastInputField
            leftIcon={<Password_Icon />}
            placeholder={'Enter confirm password'}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            rightIcon={confirmPasswordVisible ?<CloseEye_Icon/>:<OpenEye_Icon/>}
            visibility={confirmPasswordVisible}
            onRightPress={() =>setConfirmPasswordVisible(!confirmPasswordVisible)}
            errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword :undefined}
          />
          <PodCastButton
            title={"Reset Password"}
            onPress={handleSubmit}
          />
        </>
        )}
        </Formik>
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
    paddingTop: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'flex-start', 
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
    paddingBottom: responsiveHeight(3), 
  },
  accountText:{
    color:LightTheme.colors.textcolor,
  },
});
