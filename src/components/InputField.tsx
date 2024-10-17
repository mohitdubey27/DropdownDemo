import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
}

const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputField}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400',
  },
  inputField: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginVertical: 5,
  },
});
