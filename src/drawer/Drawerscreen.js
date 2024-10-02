import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  I18nManager,
} from 'react-native';
import {Font, Colors, mobileW, mobileH} from '../components/Colorsfont';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {localStorage} from '../components/localstorageProvider';
//import { getUserDetails } from "../utils/requests";
import {UserComponent} from './UserComponent';
import {appLogout} from '../screens/utils/requests';
import {useTranslation} from 'react-i18next';

const Drawerscreen = () => {
  const navigation = useNavigation();
  const token = global.accessToken;
  const {t, i18n} = useTranslation();
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [changeIndex, setChangeIndex] = useState(1);
  useEffect(() => {
    getUserDetails();
  }, [token]);
  async function getUserDetails() {
    const userdata = await localStorage.getItemObject('user');

    setUserData(userdata);
  }

  // Memoizing DashboardData with useMemo
  const DashboardData = useMemo(
    () => [
      {
        id: 0,
        image: require('../asset/icons/DashboardIcon.png'),
        name: t('Dashboard'),
        //Lang_chg.Dashboard[language]
      },
      {
        id: 1,
        image: require('../asset/icons/ManagerIcon.png'),
        name: t('Manager'),
      },
      {
        id: 2,
        image: require('../asset/icons/WorkerIcon.png'),
        name: t('Worker'),
      },
      {
        id: 3,
        image: require('../asset/icons/RoomsIcon.png'),
        name: t('Rooms'),
      },

      {
        id: 4,
        image: require('../asset/icons/TransactionsIcon.png'),
        name: t('Transactions'),
      },
      {
        id: 5,
        image: require('../asset/icons/GamesIcon.png'),
        name: t('Games'),
      },
      {
        id: 6,
        image: require('../asset/icons/MachineIcon.png'),
        name: t('Spin'),
      },
      {
        id: 7,
        image: require('../asset/icons/UserIcon.png'),
        name: t('Profile'),
      },
      {
        id: 8,
        image: require('../asset/icons/SettingsIcon.png'),
        name: t('Settings'),
      },
    ],
    [changeIndex],
  );

  const navigationCall = useCallback(
    id => {
      setModalVisible(false);

      const screens = [
        'HomeScreen',
        'ManagerScreen',
        'WorkerScreen',
        'RoomsScreen',
        'TransactionsScreen',
        'GamesScreen',
        'SpinScreen',
        'ProfileScreen',
        'SettingsScreen',
      ];

      if (screens[id]) {
        setTimeout(() => navigation.navigate(screens[id]), 300);
      }
    },
    [navigation, setModalVisible, userData],
  );

  // Use useFocusEffect to update the selected index when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const routeName =
        navigation.getState().routes[navigation.getState().index].name;

      const screenIndexMap = {
        HomeScreen: 0,
        ManagerScreen: 1,
        WorkerScreen: 2,
        RoomsScreen: 3,
        TransactionsScreen: 4,
        GamesScreen: 5,
        SpinScreen: 6,
        ProfileScreen: 7,
        SettingsScreen: 8,
      };

      const currentScreenIndex = screenIndexMap[routeName];
      if (currentScreenIndex !== undefined) {
        setChangeIndex(currentScreenIndex);
      }
    }, [navigation, setChangeIndex, userData]),
  );

  return (
    <SafeAreaView>
      <StatusBar
        hidden={false}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[Colors.gradient_color3, Colors.gradient_color4]}
        style={{
          paddingVertical: (mobileH * 5) / 100,
          width: (mobileW * 80) / 100,
          height: (mobileH * 100) / 100,
          opacity: 0.98,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(false)}
          style={{
            marginRight: (mobileW * 3) / 100,
            alignSelf: 'flex-end',
            width: (mobileW * 9) / 100,
          }}>
          <Image
            style={{
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              width: (mobileW * 7) / 100,
              height: (mobileW * 7) / 100,
            }}
            source={require('../asset/icons/yellowbackIcon.png')}
          />
        </TouchableOpacity>

        {/* Profile View */}

        <UserComponent userData={userData} />

        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <FlatList
            data={DashboardData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <>
                {item.id === changeIndex ? (
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[
                      Colors.dashboardgradient1,
                      Colors.dashboardgradient2,
                    ]}
                    style={{
                      alignSelf: 'flex-end',

                      borderRadius: (mobileW * 2) / 100,
                      opacity: 0.97,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setChangeIndex(item.id);
                        navigationCall(item.id);
                      }}
                      style={[
                        {
                          backgroundColor:
                            item.id === changeIndex
                              ? Colors.dashboard_active_color
                              : 'transparent',
                        },
                        styles.touchableViewStyle,
                      ]}>
                      <View style={styles.flexCenterStyle}>
                        <Image
                          style={{
                            width:
                              item.id == 3
                                ? (mobileW * 7) / 100
                                : (mobileW * 6) / 100,
                            height: (mobileW * 6) / 100,
                          }}
                          source={item.image}
                        />
                        <Text style={styles.textStyle}>{item.name}</Text>
                      </View>

                      <Image
                        style={styles.rightBackStyle}
                        source={require('../asset/icons/rightWhiteIcon.png')}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setChangeIndex(item.id);
                      navigationCall(item.id);
                    }}
                    style={[
                      {
                        backgroundColor:
                          item.id === changeIndex
                            ? Colors.dashboard_active_color
                            : 'transparent',
                      },
                      styles.touchableViewStyle,
                    ]}>
                    <View style={styles.flexCenterStyle}>
                      <Image
                        style={{
                          width:
                            item.id == 3
                              ? (mobileW * 7) / 100
                              : (mobileW * 6) / 100, // because rooms icon is cut (image is not proper)
                          height: (mobileW * 6) / 100,
                        }}
                        source={item.image}
                      />
                      <Text style={styles.textStyle}>{item.name}</Text>
                    </View>

                    <Image
                      style={styles.rightBackStyle}
                      source={require('../asset/icons/rightWhiteIcon.png')}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(false);
            appLogout(navigation);
          }}
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: (mobileH * 1) / 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: (mobileW * 2) / 100,
            width: (mobileW * 68) / 100,
            paddingHorizontal: (mobileW * 3) / 100,
            height: (mobileW * 13) / 100,
            backgroundColor: Colors.red_color,
          }}>
          <View style={styles.flexCenterStyle}>
            <Image
              style={{
                width: (mobileW * 6) / 100,
                height: (mobileW * 6) / 100,
              }}
              source={require('../asset/icons/LogoutIcon.png')}
            />
            <Text style={styles.textStyle}>{t('Logout')}</Text>
          </View>
          <Image
            style={styles.rightBackStyle}
            source={require('../asset/icons/rightWhiteIcon.png')}
          />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Drawerscreen;

const styles = StyleSheet.create({
  rightBackStyle: {
    width: (mobileW * 2) / 100,
    height: (mobileW * 4) / 100,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  flexCenterStyle: {flexDirection: 'row', alignItems: 'center'},
  textStyle: {
    top: 2,
    marginHorizontal: (mobileW * 2) / 100,
    textAlign: 'center',
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.FontMedium,
    color: Colors.white_color,
  },
  touchableViewStyle: {
    margin: (mobileW * 0.4) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: (mobileW * 2) / 100,
    width: (mobileW * 68) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    height: (mobileW * 13) / 100,
  },
});
