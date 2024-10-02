import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  TextInput,
  I18nManager,
} from "react-native";
import { Font, Colors, mobileW, mobileH } from "../components/Colorsfont";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const AddRemoveBalanceModal = ({
  isBalance,
  setIsBalance,
  balanceText,
  AddRemoveBalanceAPI,
}) => {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState("");
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isBalance}
      onRequestClose={() => setIsBalance(false)}
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
              setIsBalance(false);
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
              {balanceText == "Add Balance"
                ? t("Add Balance")
                : t("Remove Balance")}
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
            {t("Amount")}
          </Text>
          <View
            style={{
              borderRadius: (mobileW * 2) / 100,
              alignSelf: "center",
              borderWidth: (mobileW * 0.2) / 100,
              borderColor: Colors.black_color,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: (mobileH * 1) / 100,
              width: (mobileW * 90) / 100,
              backgroundColor: Colors.white_color,
              height: (mobileH * 7) / 100,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              placeholder={t("Amount")}
              placeholderTextColor={Colors.placeHolderColor}
              onChangeText={(txt) => {
                setAmount(txt);
              }}
              value={amount}
              style={{
                color: Colors.black_color,
                width: (mobileW * 85) / 100,
                top: 2,
                paddingHorizontal: (mobileW * 4) / 100,
                fontSize: (mobileW * 3.8) / 100,
                fontFamily: Font.FontMedium,
                textAlign: I18nManager.isRTL ? "right" : "left",
              }}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0}
            onPress={() => {
              AddRemoveBalanceAPI(amount);
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
              setIsBalance(false);
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

export default AddRemoveBalanceModal;
