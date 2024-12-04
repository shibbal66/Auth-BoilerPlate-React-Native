import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Back_Icon } from '../Assets/Svgs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Utils/Types/Types'
import { LightTheme } from '../Utils/Styles/Theme'

interface commonHeader {
  title?:string;
  backIconColor?:string
}
const CommonHeader:React.FC<commonHeader> = ({title,backIconColor}) => {
  const navigation =useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backIcon}>
        <Back_Icon color={backIconColor}/>
      </TouchableOpacity>
      <Text style={styles.titleText}>
       {title}
      </Text>
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
  mainContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop:responsiveHeight(1)
  },
  titleText: {
    textAlign: 'center', 
    color:LightTheme.colors.textcolor,
    fontSize:responsiveFontSize(2.7),
    fontWeight:'700',
    zIndex: 0, 
  },
   backIcon:{
    width:responsiveWidth(10),
   }
})

