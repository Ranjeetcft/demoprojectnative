import React, { useContext, useState } from "react";
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
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
const AllotManagersModal = ({
  isAllotManagers,
  setIsAllotManagers,
  managerList,
  setManagerList,
  setDataLoadingManager,
  setSkipDataManager,
  item,
  dataCountManager,
  setSearch,
  search,
}) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [managerList1, setManagerList1] = useState([]);
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const toggleSelection = (id) => {
    const updatedSelection = new Set(selectedItems);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }

    setSelectedItems(updatedSelection);
  };
  const toggleItemSelection = (item) => {
    const updatedSelection = new Set(managerList1);

    // Check if an item with the same id exists in the set

    if (
      updatedSelection?.length > 0 &&
      Array.from(updatedSelection).some(
        (selectedItem) => selectedItem?.id === item?.id
      )
    ) {
      // Remove the item with the same id from the set
      updatedSelection.forEach((selectedItem) => {
        if (selectedItem?.id === item?.id) {
          updatedSelection.delete(selectedItem);
        }
      });
    } else {
      // Add the new item to the set
      updatedSelection.add(item);
    }

    setManagerList1(Array.from(updatedSelection));
    setSearch("");
  };

  const AllotManagersByRoomID = () => {
    const alloted_manager = Array.from(selectedItems);
    if (alloted_manager.length == 0) {
      Toast.showWithGravity(
        t("please select atleast worker"),
        Toast.LONG,
        Toast.CENTER
      );
      return false;
    }

    showLoader();
    const data = {
      managerIds: alloted_manager,
    };
    const endpoint = `/rooms/${item?.id}/managers`;

    // console.log("endpoint", endpoint);

    putApiData(`${API_URL}${endpoint}`, data, navigation).then((res) => {
      const { status } = res;
      hideLoader();
      if (status) {
        setIsAllotManagers(false);
        Toast.showWithGravity(
          t("Managers alloted successfully"),
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
          appLogout(navigation);
          return false;
        }
      }
    });
  };

  function searchUsers(query) {
    if (managerList?.length > 0) {
      const searchResult = managerList.filter((user) => {
        // Convert query and fields to lowercase to make the search case-insensitive
        const lowerQuery = query.toLowerCase();
        return (
          user?.firstname.toLowerCase().includes(lowerQuery) ||
          user?.lastname.toLowerCase().includes(lowerQuery)
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
      visible={isAllotManagers}
      onRequestClose={() => setIsAllotManagers(false)}
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
              setIsAllotManagers(false);
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
              {t("Allot Managers")}
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
            {t("Manager")}
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
                data={
                  managerList1.length > 0
                    ? Array.from(selectedItems).map((id) =>
                        managerList1?.find((item) => item?.id === id)
                      )
                    : []
                }
                keyExtractor={(item) => item?.id.toString()}
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
                        item &&
                          (toggleSelection(item?.id),
                          toggleItemSelection(item));
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
                }}
                value={search}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setSearch("");
                setManagerList1([]);
                setSelectedItems(new Set());
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
              data={managerList.filter((item) => !selectedItems.has(item.id))}
              onEndReached={() => {
                console.log(":dataCountManager", dataCountManager);
                console.log(":managerList.length", managerList.length);
                if (dataCountManager > managerList.length) {
                  setDataLoadingManager(true);
                  setSkipDataManager(managerList.length);
                }
              }}
              onEndReachedThreshold={0.1}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    toggleSelection(item.id);
                    toggleItemSelection(item);
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

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              AllotManagersByRoomID();
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
              setIsAllotManagers(false);
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

export default AllotManagersModal;
