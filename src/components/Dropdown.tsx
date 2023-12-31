import {color} from '@rneui/base';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
const DropdownComponent = ({
  collection,
  title,
  updateValue,
  error,
  updateError,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = collection?.map(item => ({label: item.title, value: item.key}));

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'black'}]}>{title}</Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: 'black'},
          {color: 'black'},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `Select ${title}` : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          updateValue(item.value);
          updateError();
          setIsFocus(false);
        }}
      />
      {error && <Text style={{color: 'red'}}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default DropdownComponent;
