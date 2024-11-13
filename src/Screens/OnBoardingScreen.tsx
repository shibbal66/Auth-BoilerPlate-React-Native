import { StatusBar, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LightTheme } from '../Utils/Styles/Theme'
import { OnBoardingApp_Icon } from '../Assets/Svgs'
import PodCastButton from '../Components/Button'
import { NAVIGATION_ROUTES } from '../Utils/Routes/RouteConst'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Utils/Types/Types'

const OnBoardingScreen = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);
  return (
 <SafeAreaView style={styles.mainContainer}>
  <StatusBar
   animated={true}
   backgroundColor = {LightTheme.colors.primary}
   />
  <OnBoardingApp_Icon/>
  {showButtons && (
        <>
          <PodCastButton
            title={"Sign In"}
            onPress={() => {
            navigation.navigate(NAVIGATION_ROUTES.SIGN_IN as keyof RootStackParamList );
            }}
          />
          <PodCastButton
            title={"Sign Up"}
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.SIGN_UP as keyof RootStackParamList );
              }}
          />
        </>
      )}
 </SafeAreaView>
  )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:LightTheme.colors.primary,
    justifyContent:'center',
    alignItems:'center'
  }
})