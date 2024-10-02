import React from 'react';
import {SectionList, Text, View, StyleSheet} from 'react-native';

const DATA = [
  {
    title: 'Fruits',
    data: ['Apple', 'Banana', 'Orange', 'Strawberry'],
  },
  {
    title: 'Vegetables',
    data: ['Carrot', 'Broccoli', 'Spinach', 'Pepper'],
  },
  {
    title: 'Dairy',
    data: ['Milk', 'Cheese', 'Butter', 'Yogurt'],
  },
];

const SectionListExample = () => {
  // Render a custom item
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  // Render the section header
  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        scrollEnabled={true}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true} // Keeps section headers sticky at the top
        ItemSeparatorComponent={() => <View style={styles.separator} />} // Separator between items
        ListHeaderComponent={() => (
          <Text style={styles.listHeader}>Section List Example</Text>
        )} // Custom header for the entire list
        ListFooterComponent={() => (
          <Text style={styles.listFooter}>End of List</Text>
        )} // Custom footer for the entire list
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
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

export default SectionListExample;
