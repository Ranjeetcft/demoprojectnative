import React from "react";
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from "react-native";
import { Font, Colors, mobileW, mobileH } from "../components/Colorsfont";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const DeleteRoomModal = ({ isDeleteRoom, setIsDeleteRoom, deleteByRoomID }) => {
  const { t, i18n } = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDeleteRoom}
      onRequestClose={() => setIsDeleteRoom(false)}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#00000070",
        }}
      >
        <StatusBar
          hidden={false}
          backgroundColor={"transparent"}
          translucent={true}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            borderTopLeftRadius: (mobileW * 4) / 100,
            borderTopRightRadius: (mobileW * 4) / 100,
            width: mobileW,
            backgroundColor: Colors.white_color,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setIsDeleteRoom(false);
            }}
            style={{
              marginVertical: (mobileH * 1) / 100,
              paddingVertical: (mobileH * 1) / 100,
              width: mobileW,
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: (mobileW * 0.5) / 100,
                backgroundColor: Colors.gray_color,
                width: (mobileW * 12) / 100,
                height: (mobileW * 1) / 100,
              }}
            ></View>
          </TouchableOpacity>

          <View
            style={{
              alignSelf: "center",
              backgroundColor: "transparent", // Colors.red_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                textAlign: "center",
                fontSize: (mobileW * 4.5) / 100,
                fontFamily: Font.FontSemiBold,
                color: Colors.black_color,
              }}
            >
              {t("Do you really want to Delete the Room?")}
            </Text>
          </View>

          <Image
            style={{
              marginVertical: (mobileH * 2) / 100,
              alignSelf: "center",
              width: (mobileW * 16) / 100,
              height: (mobileW * 16) / 100,
            }}
            source={require("../asset/icons/roomIcon.png")}
          ></Image>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              deleteByRoomID();
            }}
            style={{
              marginVertical: (mobileH * 3) / 100,
              alignSelf: "center",
              backgroundColor: Colors.lightred_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 12) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                textAlign: "center",
                fontSize: (mobileW * 4) / 100,
                fontFamily: Font.FontRegular,
                color: Colors.white_color,
              }}
            >
              {t("Confirm")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setIsDeleteRoom(false);
            }}
            style={{
              marginBottom: (mobileH * 3) / 100,
              alignSelf: "center",
              borderWidth: (mobileW * 0.3) / 100,
              borderColor: Colors.bordergray_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 12) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                textAlign: "center",
                fontSize: (mobileW * 4) / 100,
                fontFamily: Font.FontRegular,
                color: Colors.black_color,
              }}
            >
              {t("Cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DeleteRoomModal;
