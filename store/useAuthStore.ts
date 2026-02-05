import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'owner' | 'manager' | 'staff' | 'admin' | 'customer' | null;

interface User {
  id?: string;
  email: string;
  name: string;
  role: UserRole;
  businessName?: string;
  businessId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: User) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Mock users for demonstration
const MOCK_USERS: Record<string, any> = {
  owner: {
    id: 'OW-001',
    email: 'business@eliztap.com',
    password: 'business123',
    name: 'John Smith',
    role: 'owner' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001'
  },
  manager: {
    id: 'MG-001',
    email: 'manager@eliztap.com',
    password: 'manager123',
    name: 'Sarah Supervisor',
    role: 'manager' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001'
  },
  staff: {
    id: 'ST-001',
    email: 'staff@eliztap.com',
    password: 'staff123',
    name: 'Michael Cashier',
    role: 'staff' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001'
  },
  admin: {
    id: 'AD-001',
    email: 'admin@eliztap.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole
  },
  customer: {
    id: 'CS-2847',
    email: 'customer@eliztap.com',
    password: 'customer123',
    name: 'Jane Customer',
    role: 'customer' as UserRole
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const normalizedEmail = email.toLowerCase().trim();

        // Find user by email and password
        const userKey = Object.keys(MOCK_USERS).find(key => 
          MOCK_USERS[key].email.toLowerCase() === normalizedEmail && 
          MOCK_USERS[key].password === password
        );

        if (userKey) {
          const { password: _, ...user } = MOCK_USERS[userKey];
          set({ user, isAuthenticated: true });
          return { success: true };
        }

        return { success: false, error: 'The email or password you entered is incorrect. Please try again or use a demo account.' };
      },

      signup: async (userData: User) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        set({ user: userData, isAuthenticated: true });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
