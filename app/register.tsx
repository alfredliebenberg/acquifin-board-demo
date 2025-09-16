import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabase';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [form, setForm] = useState({ id_number: '', name: '', surname: '', email: '', cell: '', password: '' });
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    const { error } = await supabase.from('users').insert([form]);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Account created');
      router.push('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {Object.keys(form).map((field) => (
        <TextInput
          key={field}
          placeholder={field}
          value={(form as any)[field]}
          onChangeText={(text) => handleChange(field, text)}
          style={styles.input}
          secureTextEntry={field === 'password'}
        />
      ))}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }
});
