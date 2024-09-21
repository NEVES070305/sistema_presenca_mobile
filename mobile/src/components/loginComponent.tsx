import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../context/authService';
import { useNavigation } from 'expo-router';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    await login(username, password);
  };

  if(isAuthenticated){
    const navigation = useNavigation<any>();

    navigation.navigate('Dashboard');
  }
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <Text className="text-4xl font-bold text-gray-800 mb-8">Bem-vindo!</Text>
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-white text-lg shadow-sm"
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white text-lg shadow-sm"
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        className="w-full bg-purple-600 py-3 rounded-lg items-center shadow-lg"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-semibold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginComponent;
