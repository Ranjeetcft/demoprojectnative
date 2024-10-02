import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Modal,
  I18nManager,
} from "react-native";
import { Font, Colors, mobileW, mobileH } from "../components/Colorsfont";
import Icon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles } from "../components/global/GlobalStyle";
import { useTranslation } from "react-i18next";

const MinMaxBetModal = ({ isMinMaxBet, setIsMinMaxBet, setMinMaxBet }) => {
  const [minBet, setMinBet] = useState("");
  const [maxBet, setMaxBet] = useState("");
  const { t, i18n } = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMinMaxBet}
      onRequestClose={() => setIsMinMaxBet(false)}
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
          <KeyboardAwareScrollView>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setIsMinMaxBet(false);
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
                {t("Min/Max Bet")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              {/* Min Bet */}
              <Text style={styles.textStyle}>{t("Min Bet")}</Text>
              <View style={styles.inputViewStyle}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder={t("Min Bet")}
                  placeholderTextColor={Colors.placeHolderColor}
                  onChangeText={(txt) => {
                    setMinBet(txt);
                  }}
                  value={minBet}
                  style={styles.inputStyle}
                />
              </View>

              {/* Max  Bet */}
              <Text style={styles.textStyle}>{t("Max Bet")}</Text>
              <View style={styles.inputViewStyle}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder={t("Max Bet")}
                  placeholderTextColor={Colors.placeHolderColor}
                  onChangeText={(txt) => {
                    setMaxBet(txt);
                  }}
                  value={maxBet}
                  style={styles.inputStyle}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: "center",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[Colors.dashboardgradient1, Colors.dashboardgradient2]}
                style={{
                  marginVertical: (mobileH * 3) / 100,
                  borderRadius: (mobileW * 2) / 100,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setMinMaxBet(minBet, maxBet);
                  }}
                  style={{
                    margin: (mobileW * 0.4) / 100,
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
                    {t("Update")}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsMinMaxBet(false);
                }}
                style={styles.cancelViewStyle}
              >
                <Text style={styles.cancelText}>{t("Cancel")}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MinMaxBetModal;
const styles = StyleSheet.create({
  inputViewStyle: {
    borderRadius: (mobileW * 2) / 100,
    alignSelf: "center",
    borderWidth: (mobileW * 0.2) / 100,
    borderColor: Colors.bordergray_color,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: (mobileH * 1) / 100,
    width: (mobileW * 95) / 100,
    backgroundColor: Colors.white_color,
    height: (mobileH * 7) / 100,
  },

  inputStyle: {
    color: Colors.black_color,
    width: (mobileW * 85) / 100,
    top: 2,
    paddingHorizontal: (mobileW * 4) / 100,
    fontSize: (mobileW * 3.8) / 100,
    fontFamily: Font.FontMedium,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  cancelViewStyle: {
    marginBottom: (mobileH * 3) / 100,
    alignSelf: "center",
    borderWidth: (mobileW * 0.3) / 100,
    borderColor: Colors.bordergray_color,
    borderRadius: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    height: (mobileW * 12) / 100,
    justifyContent: "center",
  },
  cancelText: {
    top: 2,
    textAlign: "center",
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.FontMedium,
    color: Colors.black_color,
  },
  textStyle: {
    marginTop: (mobileH * 2) / 100,
    width: (mobileW * 95) / 100,
    top: 2,
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.FontMedium,
    color: Colors.black_color,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});
