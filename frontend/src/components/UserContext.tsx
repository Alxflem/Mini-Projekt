import React, { createContext, useState, ReactNode, useContext } from 'react';

interface PurchaseHistoryItem {
  id: number;
  productName: string;
  purchaseDate: string;
  price: number;
}

interface User {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  username: string;
  password: string;
  purchaseHistory: PurchaseHistoryItem[];
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
