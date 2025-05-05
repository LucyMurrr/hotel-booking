// import React, { useState, useEffect, type PropsWithChildren, useMemo } from 'react';
// import { createContext } from 'react';
// // import type User from '@api';

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
// }

// const defaultAuthContextValue: AuthContextType = {
//   isAuthenticated: false,
//   user: null,
//   login: () => {},
//   logout: () => {},
// };

// const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       const parsedUser: User = JSON.parse(storedUser) as User;
//       setUser(parsedUser);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = (userData: User) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('user');
//   };

//   const value = useMemo(() => ({
//     isAuthenticated,
//     user,
//     login,
//     logout,
//   }), [isAuthenticated, user]);

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export { AuthContext };
