import React, {FC, useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Network_Provider} from '../constants/SchedulePayment';

interface IconWithTitleDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  onSelect: (val: string) => void;
  dropdown_data: typeof Network_Provider;
}

const IconWithTitleDropdown: FC<IconWithTitleDropdownProps> = ({
  label,
  placeholder,
  value,
  onSelect,
  dropdown_data,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownButtonRef = useRef<TouchableOpacity>(null);

  // Customizing dropdown height based on the available items
  const dropdownHeight =
    dropdown_data?.length === 1
      ? 50
      : dropdown_data?.length === 2
      ? 100
      : dropdown_data?.length === 3
      ? 140
      : dropdown_data?.length === 4
      ? 180
      : 220;

  // Measuring dropdown position based on the available space
  const openDropdown = () => {
    dropdownButtonRef?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      if (py > 400) {
        setDropdownTop(
          dropdown_data?.length === 1
            ? py - 50
            : dropdown_data?.length === 2
            ? py - 100
            : dropdown_data?.length === 3
            ? py - 140
            : dropdown_data?.length === 4
            ? py - 180
            : py - 220,
        );
      } else {
        setDropdownTop(py + h);
      }
    });
    setShowDropdown(true);
  };

  const dropdownValue = (value: string) => {
    const item: any =
      value && dropdown_data?.find(item => item?.name === value);
    return (
      <View style={styles.dropdownValueField}>
        <Image style={styles.icon} source={item?.logo} resizeMode="cover" />
        <Text style={styles.dropdownText}>{item?.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        ref={dropdownButtonRef}
        style={styles.dropDownField}
        onPress={openDropdown}>
        {value ? (
          dropdownValue(value)
        ) : (
          <Text style={value ? styles.dropdownText : styles.placeholder}>
            {placeholder}
          </Text>
        )}
        <Text style={styles.arrowSymbol}>{showDropdown ? '⋀' : '⋁'}</Text>
      </Pressable>
      {showDropdown && dropdown_data?.length && (
        <Modal animationType="fade" transparent={true} visible={showDropdown}>
          <Pressable
            style={styles.modalContainer}
            onPress={() => setShowDropdown(false)}>
            <View
              style={[
                styles.dropdownView,
                {top: dropdownTop, height: dropdownHeight},
              ]}>
              <FlatList
                data={dropdown_data}
                renderItem={({item, index}) => (
                  <Pressable
                    style={styles.dropdownItem}
                    onPress={function (): void {
                      onSelect(item.name);
                      setShowDropdown(false);
                    }}>
                    <Image
                      style={styles.icon}
                      source={item.logo}
                      resizeMode="cover"
                    />
                    <Text style={styles.dropdownItemText}>{item.name}</Text>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default IconWithTitleDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400',
  },
  dropDownField: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
    marginLeft: 8,
  },
  arrowSymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000040',
  },
  dropdownView: {
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    elevation: 4,
    paddingVertical: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 8,
  },
  icon: {
    height: 18,
    width: 18,
  },
  dropdownValueField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
