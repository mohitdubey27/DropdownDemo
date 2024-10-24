import React, {useState, useRef, FC} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {Country_List} from '../constants/SchedulePayment';

interface CountryListDropdownProps {
  label: string;
  placeholder: string;
  value: {symbol: string; amount: string};
  onChange: (val: {symbol: string; amount: string}) => void;
}

const CountryListDropdown: FC<CountryListDropdownProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownButtonRef = useRef<TouchableOpacity>(null);

  const dropdown_data = Country_List;

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

  const inputFieldValue = (value: {symbol: string; amount: string}) => {
    const item: any =
      value?.symbol &&
      dropdown_data?.find(item => item?.currency_symbol === value.symbol);
    return (
      <View style={styles.dropdownValueField}>
        <View style={styles.amountField}>
          <View style={styles.currencySymbolView}>
            <Text style={styles.currencySymbolText}>
              {item?.currency_symbol}
            </Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={item?.amount}
            keyboardType={'decimal-pad'}
            onChangeText={(val: string) => {
              onChange({symbol: value?.symbol, amount: val});
            }}
          />
        </View>
        <Pressable
          style={styles.flagField}
          ref={dropdownButtonRef}
          onPress={openDropdown}>
          <Text style={styles.flagText}>{item?.flag}</Text>
          <Text style={styles.arrowSymbol}>{showDropdown ? '▲' : '▼'}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textField}>{inputFieldValue(value)}</View>
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
                      onChange({
                        symbol: item.currency_symbol,
                        amount: value?.amount,
                      });
                      setShowDropdown(false);
                    }}>
                    <Text style={styles.flagText}>{item.flag}</Text>
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

export default CountryListDropdown;

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
  textField: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowSymbol: {
    fontSize: 16,
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
    marginLeft: 3,
  },
  dropdownValueField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  currencySymbolView: {
    height: 43,
    width: 35,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencySymbolText: {
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
  },
  flagField: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
    height: 45,
  },
  flagText: {
    fontSize: 16,
    marginHorizontal: 3,
  },
});
