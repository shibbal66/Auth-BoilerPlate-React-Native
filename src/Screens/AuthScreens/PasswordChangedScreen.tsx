
import {StyleSheet, Text} from 'react-native';
import React  from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LightTheme} from '../../Utils/Styles/Theme';
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
const PasswordChangedScreen = () => {  
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
      <SafeAreaView style={styles.mainContainer}>
          <Text style={styles.titleText}>Congratulations!</Text>
          <Text style={styles.subTittleText}>Your password has been changed successfully.</Text>
          <PodCastButton
            title={"Back to Sign In"}
            onPress={() =>navigation.navigate(NAVIGATION_ROUTES.SIGN_IN as keyof RootStackParamList)}
          />
      </SafeAreaView>
  );
};

export default PasswordChangedScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  titleText: {
    color: LightTheme.colors.textcolor,
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
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
});
