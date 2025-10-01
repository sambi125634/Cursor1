import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function Chat() {
  const base = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const [prompt, setPrompt] = useState('Jak się przygotować do zabiegu?');
  const [answer, setAnswer] = useState('');

  const send = async () => {
    const res = await fetch(`${base}/chat/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-tenant': 'salon-aurora' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setAnswer(data.answer || JSON.stringify(data));
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput value={prompt} onChangeText={setPrompt} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Button title="Wyślij" onPress={send} />
      <Text style={{ marginTop: 16 }}>{answer}</Text>
    </View>
  );
}

