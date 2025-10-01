import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function Booking() {
  const base = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const [serviceId, setServiceId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const submit = async () => {
    const res = await fetch(`${base}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-tenant': 'salon-aurora', 'x-customer-email': 'mobile@example.com' },
      body: JSON.stringify({ serviceId, staffId, start, end }),
    });
    const data = await res.json();
    if (res.ok) Alert.alert('OK', `Booking ${data.id}`);
    else Alert.alert('Error', data.message || 'Failed');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>serviceId</Text>
      <TextInput value={serviceId} onChangeText={setServiceId} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>staffId</Text>
      <TextInput value={staffId} onChangeText={setStaffId} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>start (ISO)</Text>
      <TextInput value={start} onChangeText={setStart} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>end (ISO)</Text>
      <TextInput value={end} onChangeText={setEnd} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Button title="Reserve" onPress={submit} />
    </View>
  );
}

