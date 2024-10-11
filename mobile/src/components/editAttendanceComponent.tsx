import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/authService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
interface Attendance {
  internId: number;
  status: 'Presente' | 'Ausente';
  comment: string;
  date: string;
}

const EditAttendanceComponent: React.FC = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>Por favor, faça login para acessar a tela de edição de presença.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f3f4f6' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>Editar Presenças</Text>
      <FlatList
        data={attendances}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 16, backgroundColor: '#ffffff', borderRadius: 8, marginBottom: 8 }}
            onPress={() => {
              // Navegar para a tela de edição específica da data
              Alert.alert('Editar', `Editar presenças do dia ${item.date}`);
            }}
          >
            <Text style={{ fontSize: 16, color: '#1f2937' }}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EditAttendanceComponent;