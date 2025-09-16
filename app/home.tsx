import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';
import { supabase } from './supabase';

export default function HomeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('primary_base').select('*').eq('id_number', id).single();
      setDetails(data);
    };
    fetchData();
  }, [id]);

  if (!details) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Details</Text>
      <Text>Ref#: {details.ref}</Text>
      <Text>Original Loan Amount: {details.original_loan_amount}</Text>
      <Text>Originator: {details.originator}</Text>
      <Text>Debt Amount: {details.debt_amount}</Text>
      <Button title="Chat on WhatsApp" onPress={() => Linking.openURL('https://wa.me/27600000000')} />
      <Button title="Pay with Ozow" onPress={() => Linking.openURL('https://pay.ozow.com/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' }
});
