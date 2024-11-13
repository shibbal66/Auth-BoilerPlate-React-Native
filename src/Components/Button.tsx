
import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
  } from "react-native";
  import React from "react";
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";
import { LightTheme } from "../Utils/Styles/Theme";

  interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    disabled?:boolean;
  }

  const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    loading,
    disabled
  }) => {

    return (
      <TouchableOpacity style={[styles.mainContainer,style]} onPress={onPress} >
       {loading ? (
        <ActivityIndicator size="small" color={LightTheme.colors.textcolor} />
      ) : (
        <Text style={[styles.text,textStyle]}>{title}</Text>
      )}
      </TouchableOpacity>
    );
  };
  export default Button;
  
  const styles = StyleSheet.create({
    mainContainer: {
      height: responsiveHeight(7),
      width: responsiveWidth(90),
      borderRadius: 40,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: responsiveHeight(2),
      backgroundColor:LightTheme.colors.colorLoginButton,
    },
    text: {
      color:LightTheme.colors.loginButtonTextColor,
      fontSize: responsiveFontSize(2),
      fontWeight:'500'
    },
  });
  