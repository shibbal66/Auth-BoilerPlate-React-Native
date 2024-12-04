import { Keyboard, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LightTheme } from '../Utils/Styles/Theme'
import CommonHeader from '../Components/CommonHeader'
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputField from '../Components/InputField'
import { Account_Icon, CloseEye_Icon, Email_Icon, OpenEye_Icon, Password_Icon, Phone_Icon } from '../Assets/Svgs'
import Button from '../Components/Button'

const ProfileUpdateSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required").max(25),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test("valid-email", "Invalid email format", (value) => {
        if (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          return emailRegex.test(value);
        }
        return true;
      }),
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(/[\W_]/, "Password must contain at least one special character"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    // .min(10, 'Phone number must be 10 digits')
    // .max(11, 'Phone number must be 10 digits'),
  });
const EditProfile = () => {
    const [oldPasswrodVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  return (
    <SafeAreaView style={styles.mainContainer}>
  <StatusBar
   animated={true}
   backgroundColor = {LightTheme.colors.primary}
   />
      <CommonHeader title={'Edit Profile'}/>

      <Formik
            initialValues={{
                name: "",
                email:"",
                oldPassword: "",
                newPassword: "",
                phoneNumber: "",
            }}
            validationSchema={ProfileUpdateSchema}
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
                     leftIcon={<Phone_Icon />}
                     placeholder={"Enter your phone number"}
                     onChangeText={handleChange("phoneNumber")}
                     onBlur={handleBlur("phoneNumber")}
                     value={values.phoneNumber}
                     errorMessage={
                       touched.phoneNumber && errors.phoneNumber
                         ? errors.phoneNumber
                         : undefined
                     }
                     keyboardType={"numeric"}
                />
                <InputField
                  leftIcon={<Password_Icon />}
                  placeholder={'Enter your old password'}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  value={values.oldPassword}
                  rightIcon={
                    oldPasswrodVisible ? <OpenEye_Icon /> : <CloseEye_Icon />
                  }
                  errorMessage={touched.oldPassword && errors.oldPassword ? errors.oldPassword : undefined}
                  visibility={oldPasswrodVisible}
                  onRightPress={() => setOldPasswordVisible(!oldPasswrodVisible)}
                />
                <InputField
                  leftIcon={<Password_Icon />}
                  placeholder={'Enter your new password'}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  rightIcon={
                    newPasswordVisible ? (
                      <OpenEye_Icon />
                    ) : (
                      <CloseEye_Icon />
                    )
                  }
                  errorMessage={touched.newPassword && errors.newPassword ? errors.newPassword :undefined}
                  visibility={newPasswordVisible}
                  onRightPress={() =>
                    setNewPasswordVisible(!newPasswordVisible)
                  }
                />
                <Button title={'Submit'}
                 onPress={handleSubmit} 
                //   style={{backgroundColor:'red'}}
                 />
                <Button title={'Cancel'}
                style={{backgroundColor:'transparent',borderColor:'yellow',borderWidth:1}}
                textStyle={{color:'yellow'}}
                onPress={()=>{}} />
              </>
            )}
          </Formik>
   </SafeAreaView>

  )
}

export default EditProfile

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:LightTheme.colors.primary,
        alignItems:'center'
      },
})