import { createContext, useContext } from 'react';

export const AuthContext = createContext();

// hook
export function useAuth() {
  return useContext(AuthContext);
}
