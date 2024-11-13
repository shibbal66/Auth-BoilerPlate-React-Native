
import {StyleSheet, Text, TouchableOpacity, View,TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LightTheme} from '../../Utils/Styles/Theme';
import {AuthApp_Icon} from '../../Assets/Svgs';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import PodCastButton from '../../Components/Button';
import { RootStackParamList } from '../../Utils/Types/Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_ROUTES } from '../../Utils/Routes/RouteConst';
const OTPVerificationScreen = () => { 
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]); 
    const inputsRef = useRef<Array<TextInput | null>>([]); 
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleChangeText = (text: string, index: number) => {
        if (/^\d*$/.test(text)) {
          const newOtp = [...otp];
          newOtp[index] = text;
          if (text.length === 1 && index < otp.length - 1) {
            inputsRef.current[index + 1]?.focus(); 
          }
          setOtp(newOtp); 
        }
      };
      const handleBackspace = (text: string, index: number) => {
        if (text === "" && index > 0) {
          inputsRef.current[index - 1]?.focus(); 
        }
      };
      const handleVerify = async () => {
        setLoading(true);
        const otpCode = otp.join("");
        if (otpCode.length < 4) {
          setLoading(false);
          return;
        }
    }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.scrollViewContent}>
          <AuthApp_Icon />
          <Text style={styles.titleText}>OTP Verification</Text>
          <Text style={styles.subTittleText}>Enter the verification code we just sent on your email address.</Text>
          <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            value={value}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(value, index); 
              }
            }}
            keyboardType="numeric" 
            maxLength={1} 
            placeholderTextColor={LightTheme.colors.textcolor}
            style={[
              styles.otpInput,
              {
                borderColor: value ? LightTheme.colors.textcolor: LightTheme.colors.textcolor,
                backgroundColor: value ? LightTheme.colors.textcolor : "transparent",
                color: value ? LightTheme.colors.blueTextColor  : LightTheme.colors.blueTextColor ,
              },
            ]}
            ref={(ref) => (inputsRef.current[index] = ref)} 
          />
        ))}
      </View>
        
          <PodCastButton
            title={"Send Code"}
            onPress={() =>navigation.navigate(NAVIGATION_ROUTES.CREATENEWPASSWORD as keyof RootStackParamList)}
          />
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Didn’t Receive Code?</Text>
          <TouchableOpacity>
            <Text style={[styles.accountText,{fontWeight:'bold'}]}> Resend</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
    paddingTop: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  scrollViewContent: {
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(3),
    width:responsiveWidth(70)
  },
  otpInput: {
    borderRadius: responsiveHeight(6.5)/2,
    height: responsiveHeight(6.5),
    width: responsiveHeight(6.5),
    borderWidth: 1,
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
  },
});
