import {
  Image,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Utils/Types/Types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LightTheme} from '../../Utils/Styles/Theme';
import CommonHeader from '../../Components/CommonHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfileSection from '../../Components/ProfileSection';
import {Bell_Icon, Edit_Icon, LogOut_Icon, Next_Icon} from '../../Assets/Svgs';
import SwitchToggle from 'react-native-switch-toggle';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Button from '../../Components/Button';
import api from '../../Api/HomeApi';
const ProfileScreen = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const [proficPic, setProfilePic] = useState<string>('https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();


    const requestCameraPermission = async () => {
      const cameraPermission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;
      return await request(cameraPermission);
    };
    const openCamera = async () => {
      const cameraStatus = await requestCameraPermission();
      if (cameraStatus === RESULTS.GRANTED) {
        setEditProfileModal(false);
        const result = await launchCamera({ mediaType: 'photo' });
    
        if (result.assets && result.assets.length > 0) {
          const asset = result.assets[0];
          const uri = asset.uri;
          if (uri) {
            const resizedImage = await ImageResizer.createResizedImage(
              uri,
              800,
              800,
              'JPEG',
              80,
              0,
            );
            setProfilePic(resizedImage.uri);
            // uplaodPic(resizedImage.uri);
          } else {
            console.error("No URI found for the selected image.");
          }
        } else {
          console.error("No assets found in camera result.");
        }
      } else {
        // showPermissionAlert();
      }
    };
  
    const openGallery = async () => {
      const galleryPermission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : Number(Platform.Version) > 31
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    
      const galleryStatus = await request(galleryPermission);
    
      if (galleryStatus === RESULTS.GRANTED) {
        setEditProfileModal(false);
        const result = await launchImageLibrary({mediaType: 'photo'});
        if (result.assets && result.assets.length > 0) {
          const asset = result.assets[0];
          const uri = asset.uri;
          if (uri) {
            const resizedImage = await ImageResizer.createResizedImage(
              uri,
              800,
              800,
              'JPEG',
              80,
              0,
            );
            setProfilePic(resizedImage.uri);
            // uplaodPic(resizedImage.uri);
          } else {
            console.error("No URI found for the selected image.");
          }
        } else {
          console.error("No assets found in camera result.");
        }
      } else {
        // showPermissionAlert();
      }
    };

    // const uplaodPic = async(uri:any)=>{
    //   try{
    //     const response =  await api.apiUserCollection.uploadProfilePicture(uri)
    //   }
    //   catch(error){
    //   console.log("🚀 ~ uplaodPic ~ error:", error)
    //   }
    // }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar animated={true} backgroundColor={LightTheme.colors.primary} />
      {/* ---------HEADER---------- */}
      <CommonHeader title={'My Profile'} />
      {/* ---------PROFILE_IMAGE_USER_NAME---------- */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapperContainer}>
          <Image
            source={{uri:proficPic}}
            style={styles.profileImageStyle}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => setEditProfileModal(true)}>
            <Edit_Icon color={'#fff'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameTextStyle}>Muhammad Shibbal</Text>
        <Text style={styles.emailTextStyle}>shibbalfarooq66@gmail.com</Text>
      </View>
      {/* ---------CUSTOMIZE PROFILE SECTION---------- */}
      <View style={styles.blackContainer}>
        <Text style={styles.blackContainerText}>Customize Your Profile</Text>
        <ProfileSection
          LeftIcon={<Edit_Icon color={'yellow'} />}
          heading="Edit Profile"
          rightIcon={<Next_Icon color={'#DDD'} />}
          border={true}
          onPress={() => navigation.navigate('EDITPROFILE')}
        />
        <ProfileSection
          LeftIcon={<Bell_Icon color={'yellow'} />}
          heading="Notifications"
          rightIcon={
            <SwitchToggle
              switchOn={isOn}
              onPress={() => setIsOn(!isOn)}
              circleColorOff="#f4f3f4"
              circleColorOn="#f4f3f4"
              backgroundColorOn="#06DADA"
              backgroundColorOff="#DDDDDD"
              containerStyle={{
                width: 40,
                height: 21,
                borderRadius: 25,
                padding: 2,
              }}
              circleStyle={{
                width: 18,
                height: 18,
                borderRadius: 15,
              }}
            />
          }
          border={true}
          onPress={() => {}}
        />
        <ProfileSection
          LeftIcon={<LogOut_Icon color={'red'} />}
          heading="Logout"
          rightIcon={<Next_Icon color={'red'} />}
          border={false}
          onPress={() => setLogoutModal(true)}
          textStyle={{color: 'red'}}
        />
      </View>
      {/* ---------LOGOUT MODAL---------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModal}
        // onRequestClose={closeModal}
      >
        <View style={styles.modalMainContainer}>
          <View style={styles.modalSubContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalMainText}>Logout?</Text>
            </View>
            <Text style={styles.modalSubHeading}>
              Are you sure want to logout from the app?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                title="CANCEL"
                onPress={() => {
                  setLogoutModal(!logoutModal);
                }}
                style={{
                  backgroundColor: LightTheme.colors.textcolor,
                  borderColor: LightTheme.colors.blueTextColor,
                  borderWidth: 1,
                  width: responsiveWidth(35),
                }}
                textStyle={{color: LightTheme.colors.blueTextColor}}
                // loading={loading}
                // disabled={loading}
              />
              <Button
                title="LOG OUT"
                // onPress={handleLogout}
                onPress={() => {}}
                style={{width: responsiveWidth(50)}}
                textStyle={{color: LightTheme.colors.textcolor}}
                // loading={loading}
                // disabled={loading}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* ---------EDIT PROFILE MODAL---------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editProfileModal}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalSubContainer}>
            <Text style={styles.modalTitle}>Select an Option</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={openCamera}
            >
              <Text style={styles.editModalText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
                onPress={openGallery}
            >
              <Text style={styles.editModalText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              //  onPress={removeProfile}
            >
              <Text style={styles.editModalText}>Remove Profile Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditProfileModal(false)}>
              <Text style={styles.editModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
    alignItems: 'center',
  },
  blackContainer: {
    paddingTop: responsiveHeight(3),
    width: responsiveWidth(90),
    backgroundColor: '#2A2E30',
    borderRadius: 20,
    paddingVertical: responsiveHeight(2.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  blackContainerText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(3),
    fontWeight: '600',
    marginBottom: responsiveHeight(1),
    textAlign: 'center',
  },
  profileImageStyle: {
    height: responsiveHeight(14),
    width: responsiveHeight(14),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  imageWrapperContainer: {
    position: 'relative',
    width: responsiveHeight(14),
    height: responsiveHeight(14),
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(8),
    marginBottom: responsiveHeight(4),
  },
  nameTextStyle: {
    color: LightTheme.colors.textcolor,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(1),
  },
  emailTextStyle: {
    color: LightTheme.colors.textcolor,
  },
  modalMainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalSubContainer: {
    backgroundColor: LightTheme.colors.primary,
    width: responsiveWidth(100),
    paddingBottom: responsiveHeight(7),
    paddingTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(6),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalMainText: {
    color: LightTheme.colors.textcolor,
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
  },
  modalSubHeading: {
    color: LightTheme.colors.textcolor,
    width: responsiveWidth(65),
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1.2),
  },
  modalTitle: {
    color: '#fff',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
  },
  button: {
    width: responsiveWidth(90),
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: responsiveHeight(2),
    marginVertical: responsiveHeight(1),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editModalText: {
    marginLeft: responsiveWidth(2),
    color: LightTheme.colors.blueTextColor,
    fontWeight: '500',
  },
});
