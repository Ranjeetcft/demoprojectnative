import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableNativeFeedback,
  Image,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { Colors, Font } from "../Colorsfont";

export const mobileH = Math.round(Dimensions.get("window").height);
export const mobileW = Math.round(Dimensions.get("window").width);
export default function DateRangePickerCustom({
  onChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  clearCalender,
  handleClear,
  refreshing,
}) {
  const [selectedDates, setSelectedDates] = useState({});
  const [isStartSelected, setIsStartSelected] = useState(false);
  // const [startDate, setStartDate] = useState(parentStartDate);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const toggleCalendar = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  useEffect(() => {
    setStartDate(moment().toDate());
    setEndDate(moment().toDate());
    console.log("dasdsdasd", moment().toDate());
  }, [refreshing]);

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  useEffect(() => {
    setSelectedDates({});
  }, [clearCalender]);

  const onDayPress = (day) => {
    if (!isStartSelected) {
      setSelectedDates({
        [day.dateString]: {
          selected: true,
          startingDay: true,
          color: Colors.lightgreen_color,
          textColor: "white",
          margin: 5,
          padding: 5,
        },
      });
      setIsStartSelected(true);
      setStartDate(day.dateString);
      setEndDate(day.dateString);
    } else {
      endDate = day.dateString;
      const markedDates = { ...selectedDates };

      if (startDate && endDate && endDate >= startDate) {
        let currentDate = startDate;
        while (currentDate !== endDate) {
          markedDates[currentDate] = {
            color: Colors.lightgreen_color,
            textColor: "white",
            margin: 5,
            padding: 5,
          };
          const newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() + 1);
          currentDate = newDate.toISOString().split("T")[0];
        }

        markedDates[endDate] = {
          selected: true,
          endingDay: true,
          color: Colors.lightgreen_color,
          textColor: "white",
          margin: 5,
          padding: 5,
        };

        setSelectedDates(markedDates);
        // setIsPickerVisible(false);
        if (onChange) {
          setStartDate(startDate);
          setEndDate(endDate);
          onChange([startDate, endDate]);
        }
        setIsStartSelected(false);
      }
      setIsStartSelected(false);
    }
  };

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={togglePicker}
          style={{
            marginVertical: (mobileH * 2) / 100,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            borderWidth: (mobileW * 0.3) / 100,
            borderColor: Colors.bordergray_color,
            borderRadius: (mobileW * 2) / 100,
            paddingHorizontal: (mobileW * 2) / 100,
            width: (mobileW * 90) / 100,
            height: (mobileW * 12) / 100,
          }}
        >
          <Image
            style={{
              width: (mobileW * 5) / 100,
              height: (mobileW * 5) / 100,
            }}
            source={require("../../asset/icons/calendar_today.png")}
          />
          <Text
            style={{
              marginHorizontal: (mobileW * 3) / 100,
              width: (mobileW * 70) / 100,
              top: 2,

              fontSize: (mobileW * 4) / 100,
              fontFamily: Font.FontSemiBold,
              color: Colors.black_color,
            }}
          >
            {startDate ? moment(startDate).format("D MMM YYYY") : "Start Date"}{" "}
            - {endDate ? moment(endDate).format("D MMM YYYY") : "end date"}
          </Text>

          <Image
            style={{
              width: (mobileW * 3) / 100,
              height: (mobileW * 2.6) / 100,
            }}
            source={require("../../asset/icons/dropdownIcon.png")}
          />
        </TouchableOpacity>
      </View>

      <Modal
        // animationType="slide"
        animationType="fade"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={toggleCalendar}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={toggleCalendar}>
            <View style={styles.modalContent}>
              <Calendar
                style={styles.calendar}
                onDayPress={onDayPress}
                markingType="period"
                markedDates={selectedDates}
                theme={{
                  textMonthFontSize: 12,
                  textMonthFontWeight: "bold",
                  arrowColor: "#fff",
                  arrowStyle: {
                    backgroundColor: Colors.lightgreen_color,
                    borderRadius: 50,
                    height: 30,
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  textDayFontSize: 12,
                  textDayColor: "black",
                  textDayFontWeight: "bold",
                  textSectionTitleColor: "#000",
                  "stylesheet.calendar.header": {
                    header: {
                      backgroundColor: "#f0f0f0",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 40,
                    },
                    dayHeader: {
                      backgroundColor: "#f0f0f0",
                      marginTop: -10,
                      textAlign: "center",
                      fontSize: 12,
                      color: "#000",
                      padding: 10,
                      borderBottomWidth: 1,
                    },
                  },
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "hidden",
  },
  customInput: {
    color: "balck",
    borderRadius: 5,
    width: (mobileW * 86) / 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendar: {
    width: (mobileW * 60) / 100,

    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    shadowColor: "#171717",
    elevation: 10,
  },
  modalContent: {
    alignSelf: "center",
    height: mobileH / 1,
    width: mobileW / 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
