import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors, Font, mobileH, mobileW} from '../components/Colorsfont';

export const UserComponent = ({}) => {
  return (
    <>
      <View
        style={{
          marginVertical: (mobileH * 2) / 100,
          flexDirection: 'row',
          alignItems: 'center',
          width: (mobileW * 68) / 100,
          paddingHorizontal: (mobileW * 6) / 100,
        }}>
        <Image
          source={require('../asset/icons/userPlaceholder.jpeg')}
          style={{
            backgroundColor: Colors.lightgray_color,
            width: (mobileW * 12) / 100,
            height: (mobileW * 12) / 100,
            borderRadius: (mobileW * 6) / 100,
          }}
        />

        <View
          style={{
            bottom: (mobileW * 1) / 100,
            left: (mobileW * 14) / 100,
            position: 'absolute',
            backgroundColor: 'green',
            borderWidth: (mobileW * 0.3) / 100,
            borderColor: Colors.white_color,
            width: (mobileW * 3) / 100,
            height: (mobileW * 3) / 100,
            borderRadius: (mobileW * 1.5) / 100,
          }}
        />

        <View>
          <Text
            style={{
              top: 2,
              marginHorizontal: (mobileW * 2) / 100,
              fontSize: (mobileW * 3.6) / 100,
              fontFamily: Font.FontMedium,
              color: Colors.white_color,
            }}>
            {'ranjeet'} {'singh'}
          </Text>
          <Text
            style={{
              top: 2,
              marginHorizontal: (mobileW * 2) / 100,
              fontSize: (mobileW * 3.6) / 100,
              fontFamily: Font.FontRegular,
              color: Colors.white_color,
            }}>
            {'ranjeetsingh.mongoosetech@gmail.com'}{' '}
          </Text>
        </View>
      </View>
    </>
  );
};
