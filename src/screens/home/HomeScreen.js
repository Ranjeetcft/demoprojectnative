import React, {useMemo, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {Colors, mobileH, mobileW} from '../../components/Colorsfont';

const DATA = [
  {
    title: 'Fruits',
    data: ['Apple', 'Banana', 'Orange', 'Strawberry', 'Grapes'],
  },
  {
    title: 'Vegetables',
    data: ['Carrot', 'Broccoli', 'Spinach', 'Pepper', 'Cucumber'],
  },
  {
    title: 'Dairy',
    data: ['Milk', 'Cheese', 'Butter', 'Yogurt', 'Ice Cream'],
  },
  {
    title: 'Grains',
    data: ['Rice', 'Quinoa', 'Oats', 'Pasta', 'Bread'],
  },
  {
    title: 'Meats',
    data: ['Chicken', 'Beef', 'Pork', 'Turkey', 'Fish'],
  },
  {
    title: 'Snacks',
    data: ['Chips', 'Popcorn', 'Nuts', 'Chocolate', 'Cookies'],
  },
  {
    title: 'Legumes',
    data: ['Lentils', 'Chickpeas', 'Black Beans', 'Kidney Beans', 'Peas'],
  },
  {
    title: 'Nuts & Seeds',
    data: [
      'Almonds',
      'Walnuts',
      'Sunflower Seeds',
      'Pumpkin Seeds',
      'Chia Seeds',
    ],
  },
  {
    title: 'Herbs & Spices',
    data: ['Basil', 'Cilantro', 'Oregano', 'Thyme', 'Cinnamon'],
  },
  {
    title: 'Condiments',
    data: ['Ketchup', 'Mustard', 'Mayonnaise', 'Hot Sauce', 'Soy Sauce'],
  },
  {
    title: 'Beverages',
    data: ['Water', 'Juice', 'Coffee', 'Tea', 'Soda'],
  },
  {
    title: 'Frozen Foods',
    data: [
      'Frozen Vegetables',
      'Frozen Pizza',
      'Ice Cream',
      'Frozen Fruits',
      'Frozen Meals',
    ],
  },
  {
    title: 'Baking Ingredients',
    data: ['Flour', 'Sugar', 'Baking Powder', 'Vanilla Extract', 'Yeast'],
  },
  {
    title: 'Breakfast Items',
    data: ['Cereal', 'Pancakes', 'Oatmeal', 'Bagels', 'Smoothies'],
  },
  {
    title: 'Canned Goods',
    data: [
      'Canned Tomatoes',
      'Canned Beans',
      'Canned Soup',
      'Canned Tuna',
      'Canned Fruit',
    ],
  },
  {
    title: 'Specialty Foods',
    data: [
      'Gluten-Free Pasta',
      'Vegan Cheese',
      'Organic Honey',
      'Fermented Vegetables',
      'Plant-Based Protein',
    ],
  },
];

const HomeScreen = () => {
  const bottomSheetRef = useRef(null);
  const [isShowFooter, setIsShowFooter] = useState(false);

  const snapPoints = useMemo(() => ['50%'], []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={index => {
          if (index === -1) {
            setIsShowFooter(true);
          } else {
            setIsShowFooter(false);
          }
        }}
        animateOnMount={false}>
        <View style={styles.contentContainer}>
          <BottomSheetSectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={true}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={() => (
              <Text style={styles.listHeader}>Section List Example</Text>
            )}
            ListFooterComponent={() => (
              <Text style={styles.listFooter}>End of List</Text>
            )}
          />
        </View>
      </BottomSheet>
      {isShowFooter && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            bottomSheetRef.current?.expand();
          }}
          style={{
            borderTopLeftRadius: (mobileW * 5) / 100,
            borderTopRightRadius: (mobileW * 5) / 100,
            position: 'absolute',
            bottom: 0,
            width: mobileW,
            height: (mobileH * 5) / 100,
            backgroundColor: 'white',
          }}>
          <Text style={{textAlign: 'center', lineHeight: (mobileH * 5) / 100}}>
            Open Bottom Sheet
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white_color,
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
  },
  header: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginVertical: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  listHeader: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listFooter: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
  },
});

export default HomeScreen;
