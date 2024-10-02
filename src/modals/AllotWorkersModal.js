import React, { useContext, useState } from "react";
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  I18nManager,
  Keyboard,
} from "react-native";
import { Font, Colors, mobileW, mobileH } from "../components/Colorsfont";

import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/Entypo";
import { LoaderContext } from "../components/LoaderContext";
import {
  appLogout,
  getData,
  postApiData,
  putApiData,
} from "../screens/utils/requests";
import { API_URL } from "../screens/utils/env";
import Toast from "react-native-simple-toast";
import Loader from "../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
const AllotWorkersModal = ({
  isAllotWorkers,
  setIsAllotWorkers,
  workerList,
  setWorkerList,
  workerList1,

  item,
}) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [search, setSearch] = useState("");
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const toggleSelection = (id) => {
    const updatedSelection = new Set(selectedItems);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(parseInt(id));
    }
    console.log(updatedSelection);
    setSelectedItems(updatedSelection);
  };

  const AllotWorkersByRoomID = () => {
    const alloted_worker = Array.from(selectedItems);
    console.log(alloted_worker);

    if (alloted_worker.length == 0) {
      Toast.showWithGravity(
        t("please select atleast workers"),
        Toast.LONG,
        Toast.CENTER
      );
      return false;
    }

    showLoader();
    const data = {
      workerIds: alloted_worker,
    };
    const endpoint = `/rooms/${item?.id}/workers`;

    console.log("endpoint", endpoint);

    putApiData(`${API_URL}${endpoint}`, data, navigation).then((res) => {
      const { status } = res;
      hideLoader();
      if (status) {
        setIsAllotWorkers(false);
        Toast.showWithGravity(
          t("workers alloted successfully"),
          Toast.LONG,
          Toast.TOP
        );
        setTimeout(() => {
          navigation.replace("RoomsScreen");
        }, 300);
      } else {
        if (res?.data?.statusCode == 401) {
          Toast.showWithGravity(
            res?.data?.message ? res?.data?.message : "",
            Toast.LONG,
            Toast.CENTER
          );
          return false;
        }
      }
    });
  };
  function searchUsers(query) {
    if (workerList.length > 0) {
      const searchResult = workerList.filter((user) => {
        // Convert query and fields to lowercase to make the search case-insensitive
        const lowerQuery = query.toLowerCase();
        return (
          user.firstname.toLowerCase().includes(lowerQuery) ||
          user.lastname.toLowerCase().includes(lowerQuery)
        );
      });

      return searchResult;
    } else {
      return [];
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAllotWorkers}
      onRequestClose={() => setIsAllotWorkers(false)}
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
              setIsAllotWorkers(false);
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
              {t("Allot Workers")}
            </Text>
          </View>

          <Text
            style={{
              marginLeft: (mobileW * 5) / 100,
              marginTop: (mobileH * 2) / 100,
              width: (mobileW * 95) / 100,
              top: 2,
              fontSize: (mobileW * 4) / 100,
              fontFamily: Font.FontMedium,
              color: Colors.black_color,
              textAlign: I18nManager.isRTL ? "right" : "left",
            }}
          >
            {t("Worker")}
          </Text>
          <View
            style={{
              borderRadius: (mobileW * 2) / 100,
              alignSelf: "center",
              borderWidth: (mobileW * 0.2) / 100,
              borderColor: Colors.black_color,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: (mobileH * 1) / 100,
              width: (mobileW * 90) / 100,
              backgroundColor: Colors.white_color,
              padding: (mobileW * 3) / 100,
            }}
          >
            <View style={{ width: (mobileW * 70) / 100 }}>
              <FlatList
                numColumns={2}
                data={Array.from(selectedItems).map((id) =>
                  workerList1.find((item) => item.id === id)
                )}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      borderRadius: (mobileW * 2) / 100,
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: (mobileW * 1) / 100,
                      marginBottom: (mobileW * 1) / 100,
                      padding: (mobileW * 1.5) / 100,
                      backgroundColor: Colors.bordergray_color,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black_color,
                        marginRight: (mobileW * 1) / 100,
                        top: 2,
                        textAlign: "center",
                        fontSize: (mobileW * 3) / 100,
                        fontFamily: Font.FontMedium,
                      }}
                    >
                      {item?.firstname} {item?.lastname}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        toggleSelection(item?.id);
                      }}
                    >
                      <Icon
                        name="cross"
                        size={(mobileW * 5) / 100}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              <TextInput
                placeholder={t("Search by name")}
                placeholderTextColor={Colors.placeHolderColor}
                style={{
                  width: (mobileW * 80) / 100,
                  top: 2,
                  color: Colors.black_color,
                  paddingHorizontal: (mobileW * 2) / 100,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                  textAlign: I18nManager.isRTL ? "right" : "left",
                }}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                onChangeText={(txt) => {
                  setSearch(txt);
                  if (txt == "") {
                    setWorkerList(workerList1);
                  } else {
                    setWorkerList(searchUsers(txt));
                  }
                }}
                value={search}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedItems(new Set());
                setSearch("");
                setWorkerList(workerList1);
              }}
              activeOpacity={0.7}
            >
              <Icon name="cross" size={(mobileW * 5) / 100} color="black" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Icon
                name="chevron-down"
                size={(mobileW * 5) / 100}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {workerList && (
            <View
              style={{
                borderRadius: (mobileW * 2) / 100,
                borderWidth: (mobileW * 0.2) / 100,
                borderColor: Colors.bordergray_color,
                width: (mobileW * 90) / 100,
                alignSelf: "center",
                height: (mobileH * 20) / 100,
              }}
            >
              <FlatList
                data={workerList.filter((item) => !selectedItems.has(item.id))}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      toggleSelection(item?.id);
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: (mobileH * 1) / 100,
                        color: Colors.black_color,
                        marginHorizontal: (mobileW * 3) / 100,
                        top: 2,

                        fontSize: (mobileW * 3.8) / 100,
                        fontFamily: Font.FontMedium,
                      }}
                    >
                      {item?.firstname} {item?.lastname}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              AllotWorkersByRoomID();
            }}
            style={{
              marginTop: (mobileH * 6) / 100,
              alignSelf: "center",
              backgroundColor: Colors.yellow_color,
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
                fontFamily: Font.FontMedium,
                color: Colors.white_color,
              }}
            >
              {t("Submit")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setIsAllotWorkers(false);
            }}
            style={{
              marginVertical: (mobileH * 2) / 100,
              alignSelf: "center",
              borderWidth: (mobileW * 0.3) / 100,
              borderColor: Colors.bordergray_color,
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
                fontFamily: Font.FontMedium,
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

export default AllotWorkersModal;
