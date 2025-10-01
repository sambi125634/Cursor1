import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

type Svc = { id: string; name: string; durationMin: number; price: string };

export default function Services() {
  const [data, setData] = useState<Svc[]>([]);
  const base = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  useEffect(() => {
    fetch(`${base}/services`, { headers: { 'x-tenant': 'salon-aurora' } })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Usługi</Text>
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text>{item.name}</Text>
            <Text>
              {item.durationMin} min — {item.price} PLN
            </Text>
          </View>
        )}
      />
    </View>
  );
}

