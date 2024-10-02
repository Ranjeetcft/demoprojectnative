import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text, StatusBar } from "react-native";
import { Font, Colors, mobileW, mobileH } from "../components/Colorsfont";

import { SafeAreaView } from "react-native-safe-area-context";

const FilterModal = ({ filter, setFilter }) => {
  const [block, setBlock] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filter}
      onRequestClose={() => setFilter(false)}
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
              setFilter(false);
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
          {/* Edit */}
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "transparent", // Colors.red_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 10) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                marginHorizontal: (mobileW * 4) / 100,
                fontSize: (mobileW * 3.8) / 100,
                fontFamily: Font.FontMedium,
                color: Colors.black_color,
              }}
            >
              Edit
            </Text>
          </View>

          {/* Block */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setBlock(!block);
            }}
            style={{
              alignSelf: "center",
              backgroundColor: block == true ? Colors.red_color : "transparent",
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 10) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                marginHorizontal: (mobileW * 4) / 100,
                fontSize: (mobileW * 3.8) / 100,
                fontFamily: Font.FontMedium,
                color: block == true ? Colors.white_color : Colors.black_color,
              }}
            >
              Block
            </Text>
          </TouchableOpacity>
          {/* Add Balance */}
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "transparent", // Colors.red_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 10) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                marginHorizontal: (mobileW * 4) / 100,
                fontSize: (mobileW * 3.8) / 100,
                fontFamily: Font.FontMedium,
                color: Colors.black_color,
              }}
            >
              Add Balance
            </Text>
          </View>

          {/* Remove Balance */}
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "transparent", // Colors.red_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 10) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                marginHorizontal: (mobileW * 4) / 100,
                fontSize: (mobileW * 3.8) / 100,
                fontFamily: Font.FontMedium,
                color: Colors.black_color,
              }}
            >
              Remove Balance
            </Text>
          </View>

          {/* View Transactions */}
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "transparent", // Colors.red_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 10) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                marginHorizontal: (mobileW * 4) / 100,
                fontSize: (mobileW * 3.8) / 100,
                fontFamily: Font.FontMedium,
                color: Colors.black_color,
              }}
            >
              View Transactions
            </Text>
          </View>

          {/* Cancel */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setFilter(false);
            }}
            style={{
              marginVertical: (mobileH * 3) / 100,
              alignSelf: "center",
              backgroundColor: Colors.lightgray_color,
              borderRadius: (mobileW * 2) / 100,
              width: (mobileW * 80) / 100,
              height: (mobileW * 10) / 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                top: 2,
                textAlign: "center",

                fontSize: (mobileW * 3.8) / 100,
                fontFamily: Font.FontMedium,
                color: Colors.black_color,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal;
