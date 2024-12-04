import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

interface customizeProfileProps {
    onPress: () => void;
    heading:string;
    LeftIcon:any;
    border:boolean;
    rightIcon:any
    textStyle?: StyleProp<TextStyle>;
   }
const ProfileSection:React.FC<customizeProfileProps> = ({onPress,heading,LeftIcon,border,rightIcon,textStyle}) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = () => {
    if (!isPressed) {
      setIsPressed(true);
      onPress(); 
      setTimeout(() => setIsPressed(false), 1000); 
    }
  };
  return (
    <TouchableOpacity style={[styles.mainContainer,border && styles.border]} onPress={handlePress}> 
      <View style={styles.subContainer}>
        {LeftIcon}
        <Text style={[styles.text,textStyle]}>{heading}</Text>
      </View>
        {rightIcon}
    </TouchableOpacity>
  )
}

export default ProfileSection

const styles = StyleSheet.create({
    mainContainer:{
      width:responsiveWidth(80),
      height:responsiveHeight(7),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    border:{
    borderBottomColor:'#DDDDDD',
    borderBottomWidth: 1,
    },
    subContainer:{
     flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
    },
    text:{
        color:'#fff',
        fontSize:responsiveFontSize(2.5),
        marginLeft:responsiveWidth(5),
        width:responsiveWidth(60),
    }
})