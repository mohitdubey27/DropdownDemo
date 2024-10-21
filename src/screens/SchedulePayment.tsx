import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputField from '../components/InputField';
import DropDownField from '../components/DropDownField';
import {
  Cable_Bill,
  Network_Provider,
  Packages,
  Request_Type,
} from '../constants/SchedulePayment';
import IconWithTitleDropdown from '../components/IconWithTitleDropdown';

const {height, width} = Dimensions.get('window');

export function SchedulePayment() {
  const [cardNumber, setCardNumber] = useState('');
  const [cableBill, setCableBill] = useState('');
  const [requestType, setRequestType] = useState('');
  const [packageType, setPackageType] = useState('');
  const [networkProvider, setNetworkProvider] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.safeAreaContainer}>
        <Text style={styles.headerText}>Schedule Payment</Text>
        <View style={styles.paymentDetailsContainer}>
          {/* Dropdown field for to select cable bill */}
          <DropDownField
            label={'Choose Cable Bill'}
            value={cableBill}
            onSelect={setCableBill}
            placeholder={'Select Cable Bill'}
            dropdown_data={Cable_Bill}
          />
          {/* Input field to enter card number */}
          <InputField
            label={'Smart Card Number'}
            placeholder={'Enter Card Number'}
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          {/* Dropdown field for to select request type*/}
          <DropDownField
            label={'Request type'}
            value={requestType}
            onSelect={setRequestType}
            placeholder={'Select Request type'}
            dropdown_data={Request_Type}
          />
          {/* Dropdown field for to select packages */}
          <DropDownField
            label={'Select package'}
            value={packageType}
            onSelect={setPackageType}
            placeholder={'Select package'}
            dropdown_data={Packages}
          />
          {/* IconWithTitleDropdown field for to select network providers */}
          <IconWithTitleDropdown
            label={'Select network provider'}
            value={networkProvider}
            onSelect={setNetworkProvider}
            placeholder={'Select package'}
            dropdown_data={Network_Provider}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#f2f2f2',
  },
  safeAreaContainer: {
    flex: 1,
    margin: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  paymentDetailsContainer: {
    flex: 1,
    marginTop: 20,
  },
});
