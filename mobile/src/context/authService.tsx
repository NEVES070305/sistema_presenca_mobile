import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  // Função para fazer login e armazenar tokens
  const login = async (username: string, password: string) => {
    await axios.post('https://localhost:44352/v1/login', { username, password }).then((response)=>{
      console.log(response);
      const { token, refreshToken } = response.data;
      console.log(token);
      // Armazena os tokens e o tempo de expiração
      setAccessToken(token);
      setRefreshToken(refreshToken);
      setExpiresIn(expiresIn);
    })
     .catch( (error) =>{
      console.error('Erro no login:', error)}
    );
    
  };

  // Função para logout
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setExpiresIn(null);
  };

  // Função para renovar o token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/refresh-token', { refreshToken });
      const { accessToken, expiresIn } = response.data;

      // Atualiza o accessToken e o tempo de expiração
      setAccessToken(accessToken);
      setExpiresIn(expiresIn);
    } catch (error) {
      console.error('Erro ao renovar o token:', error);
      logout();
    }
  };

  // Efeito para monitorar o tempo de expiração do token
  useEffect(() => {
    if (!accessToken || !expiresIn) return;

    // Define o tempo antes do qual o token deve ser renovado (ex: 1 minuto antes de expirar)
    const renewTime = expiresIn * 1000 - 60 * 1000;

    const timer = setTimeout(() => {
      refreshAccessToken(); // Renova o token
    }, renewTime);

    // Limpa o timer ao desmontar ou mudar o token
    return () => clearTimeout(timer);
  }, [accessToken, expiresIn]);

  const isAuthenticated = accessToken !== null;

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para utilizar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
