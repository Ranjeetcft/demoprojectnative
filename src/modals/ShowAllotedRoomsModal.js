import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import { Font, Colors, mobileW, mobileH } from "../components/Colorsfont";

import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";

const ShowAllotedRoomsModal = ({
  isDetails,
  setIsDetails,
  allotedRoom,
  //   allotedManagers,
  //   allotedWorkers,
  //   getAllotedManager,
  //   getAllotedWorker,
}) => {
  const [tabChange, setTabChange] = useState(1);
  const { t, i18n } = useTranslation();
  const [tabListData, setTabListData] = useState([
    { id: 1, name: t("Managers") },
    { id: 2, name: t("Workers") },
  ]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDetails}
      onRequestClose={() => setIsDetails(false)}
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
              setIsDetails(false);
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

          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[Colors.dashboardgradient1, Colors.dashboardgradient2]}
            style={{
              margin: (mobileH * 1) / 100,
              alignSelf: "center",
              width: (mobileW * 90) / 100,
              borderRadius: (mobileW * 2) / 100,
              opacity: 0.97,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                borderRadius: (mobileW * 2) / 100,
                alignSelf: "center",
                margin: (mobileW * 0.3) / 100,
                width: (mobileW * 89) / 100,
                backgroundColor: Colors.black_color,

                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                onPress={() => {}}
                style={{
                  margin: (mobileW * 1) / 100,
                }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[
                    Colors.dashboardgradient1,
                    Colors.dashboardgradient2,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {}}
                  style={{
                    borderWidth: (mobileW * 0.4) / 100,
                    borderColor: Colors.white_color,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: (mobileW * 2) / 100,
                    width: (mobileW * 87) / 100,
                    height: (mobileW * 12.4) / 100,
                  }}
                >
                  <Text
                    style={{
                      top: 2,

                      textAlign: "center",
                      fontSize: (mobileW * 4.2) / 100,
                      fontFamily: Font.FontSemiBold,
                      color: Colors.black_color,
                    }}
                  >
                    {t("Alloted Rooms")}
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
          <View style={{ height: (mobileH * 35) / 100 }}>
            <FlatList
              contentContainerStyle={{ paddingBottom: (mobileH * 3) / 100 }}
              data={allotedRoom}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: (mobileH * 1) / 100,
                    borderRadius: (mobileW * 2) / 100,
                    borderWidth: (mobileW * 0.2) / 100,
                    borderColor: Colors.bordergray_color,
                    width: (mobileW * 90) / 100,
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <View
                    style={{
                      width: (mobileW * 85) / 100,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: (mobileH * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        top: 2,
                        fontSize: (mobileW * 3.6) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}
                    >
                      {t("S. No.")}
                    </Text>
                    <Text
                      style={{
                        top: 2,
                        fontSize: (mobileW * 3.6) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: (mobileW * 85) / 100,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        top: 2,
                        fontSize: (mobileW * 3.6) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}
                    >
                      {t("Room Name")}
                    </Text>
                    <Text
                      style={{
                        top: 2,
                        fontSize: (mobileW * 3.6) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                      }}
                    >
                      {item?.name}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setIsDetails(false);
            }}
            style={{
              marginBottom: (mobileH * 3) / 100,
              alignSelf: "center",
              backgroundColor: Colors.bordergray_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 90) / 100,
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

export default ShowAllotedRoomsModal;
