
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { LightTheme } from "../Utils/Styles/Theme";

interface inputProps {
  placeholder: string;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  value: string;
  errorMessage?: string | null;
  visibility?: boolean;
  onRightPress?: () => void;
  editable?: boolean;
}

const InputField: React.FC<inputProps> = ({
  leftIcon,
  placeholder,
  rightIcon,
  onChangeText,
  onBlur,
  value,
  errorMessage,
  visibility,
  onRightPress,
  editable = true,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputWrapper}>
        {leftIcon}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={LightTheme.colors.textcolor}
          style={styles.textInput}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          secureTextEntry={visibility}
          autoCapitalize="none"
          editable={editable}
        />
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={onRightPress}
        >
          {rightIcon}
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  mainContainer: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginVertical: responsiveHeight(1.2),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: responsiveHeight(6.5),
    borderColor: LightTheme.colors.textcolor,
    borderRadius: 40,
    borderWidth: 0.8,
    paddingHorizontal: responsiveWidth(4),
  },
  textInput: {
    width: responsiveWidth(70),
    height: responsiveHeight(6),
    color: LightTheme.colors.textcolor,
    marginLeft: responsiveWidth(1.5),
    fontSize: responsiveFontSize(2),
  },
  errorText: {
    color: LightTheme.colors.errorTextColor,
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(0.5),
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginLeft:responsiveWidth(3),
    top:1
  },
});
