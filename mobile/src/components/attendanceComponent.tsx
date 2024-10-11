import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/authService';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Attendance {
  internId: number;
  status: 'Presente' | 'Ausente';
  comment: string;
  date: string;
}

interface Intern {
  id: number;
  name: string;
}

const AttendanceComponent: React.FC = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  const interns: Intern[] = [
    { id: 1, name: 'Intern 1' },
    { id: 2, name: 'Intern 2' },
    { id: 3, name: 'Intern 3' },
  ];

  const handleDateChange = (event: any, date?: Date) => {
    setIsDatePickerVisible(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const toggleAttendanceStatus = (internId: number) => {
    const formattedDate = selectedDate.toLocaleDateString();
    setAttendances((prevAttendances) => {
      const existingAttendance = prevAttendances.find(
        (attendance) => attendance.internId === internId && attendance.date === formattedDate
      );
      if (existingAttendance) {
        return prevAttendances.map((attendance) =>
          attendance.internId === internId && attendance.date === formattedDate
            ? { ...attendance, status: attendance.status === 'Presente' ? 'Ausente' : 'Presente' }
            : attendance
        );
      } else {
        return [
          ...prevAttendances,
          { internId, status: 'Presente', comment: '', date: formattedDate },
        ];
      }
    });
  };

  const updateComment = (internId: number, newComment: string) => {
    const formattedDate = selectedDate.toLocaleDateString();
    setAttendances((prevAttendances) =>
      prevAttendances.map((attendance) =>
        attendance.internId === internId && attendance.date === formattedDate
          ? { ...attendance, comment: newComment }
          : attendance
      )
    );
  };

  const handleSaveChanges = () => {
    // Aqui você pode adicionar a lógica para salvar as alterações, por exemplo, enviar para um servidor
    Alert.alert('Alterações salvas', 'As presenças foram salvas com sucesso.');
  };

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>Por favor, faça login para acessar a tela de presença.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f3f4f6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>Tela de Presença</Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Selecione a Data:</Text>
          <TouchableOpacity
            onPress={() => setIsDatePickerVisible(true)}
            style={{
              padding: 12,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: '#ffffff',
              marginVertical: 8,
            }}
          >
            <Text style={{ fontSize: 16, color: '#1f2937' }}>{selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Estagiários:</Text>
          {interns.map((intern) => (
            <View key={intern.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ flex: 1, fontSize: 18, color: '#1f2937' }}>{intern.name}</Text>
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderRadius: 8,
                  backgroundColor: attendances.find(
                    (attendance) =>
                      attendance.internId === intern.id &&
                      attendance.date === selectedDate.toLocaleDateString() &&
                      attendance.status === 'Presente'
                  )
                    ? '#6b21a8'
                    : '#ffffff',
                  marginRight: 8,
                }}
                onPress={() => toggleAttendanceStatus(intern.id)}
              >
                <Text style={{ color: '#ffffff', fontWeight: '600' }}>
                  {attendances.find(
                    (attendance) =>
                      attendance.internId === intern.id &&
                      attendance.date === selectedDate.toLocaleDateString() &&
                      attendance.status === 'Presente'
                  )
                    ? 'Presente'
                    : 'Ausente'}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  backgroundColor: '#ffffff',
                }}
                placeholder="Adicionar comentário..."
                placeholderTextColor="#aaa"
                value={
                  attendances.find(
                    (attendance) =>
                      attendance.internId === intern.id && attendance.date === selectedDate.toLocaleDateString()
                  )?.comment || ''
                }
                onChangeText={(text) => updateComment(intern.id, text)}
              />
            </View>
          ))}
        </View>

        <FlatList
          data={attendances}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 8, borderBottomWidth: 1, borderBottomColor: '#d1d5db' }}>
              <Text style={{ fontSize: 16, color: '#1f2937' }}>
                {item.date} - {interns.find((intern) => intern.id === item.internId)?.name} - {item.status}: {item.comment}
              </Text>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={handleSaveChanges}
          style={{
            padding: 16,
            backgroundColor: '#2563eb',
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AttendanceComponent;