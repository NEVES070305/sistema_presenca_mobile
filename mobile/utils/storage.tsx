import * as SecureStore from 'expo-secure-store';

// Armazena tokens com SecureStore
export const storeTokens = async ({accessToken, refreshToken}: any) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  } catch (error) {
    console.error('Erro ao armazenar os tokens', error);
  }
};

// Obtém tokens do SecureStore
export const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Erro ao obter os tokens', error);
    return null;
  }
};

// Remove tokens do SecureStore
export const clearTokens = async () => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  } catch (error) {
    console.error('Erro ao remover os tokens', error);
  }
};
