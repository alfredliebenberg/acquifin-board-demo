import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function App() {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id_number', idNumber)
      .eq('password', password)
      .single();

    if (error || !data) {
      Alert.alert('Login failed', 'User not found. Please register.');
    } else {
      Alert.alert('Welcome', `Hello ${data.name} ${data.surname}`);
    }
  }

  async function handleRegister() {
    const { error } = await supabase.from('users').insert([{
      id_number: idNumber,
      password,
      cell: '000',
      email: 'demo@example.com',
      name: 'New',
      surname: 'User'
    }]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Registered!', 'You can log in now.');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>ID Number</Text>
      <TextInput value={idNumber} onChangeText={setIdNumber} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Password</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 20 }} />

      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
