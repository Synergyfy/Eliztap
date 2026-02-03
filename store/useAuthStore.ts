import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'owner' | 'manager' | 'staff' | 'admin' | 'customer' | null;

interface User {
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
  logout: () => void;
}

// Mock users for demonstration
const MOCK_USERS: Record<string, any> = {
  owner: {
    email: 'business@latap.com',
    password: 'business123',
    name: 'John Smith',
    role: 'owner' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001'
  },
  manager: {
    email: 'manager@latap.com',
    password: 'manager123',
    name: 'Sarah Supervisor',
    role: 'manager' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001'
  },
  staff: {
    email: 'staff@latap.com',
    password: 'staff123',
    name: 'Michael Cashier',
    role: 'staff' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001'
  },
  admin: {
    email: 'admin@latap.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole
  },
  customer: {
    email: 'customer@latap.com',
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
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find user by email and password
        const userKey = Object.keys(MOCK_USERS).find(key => 
          MOCK_USERS[key].email === email && MOCK_USERS[key].password === password
        );

        if (userKey) {
          const { password: _, ...user } = MOCK_USERS[userKey];
          set({ user, isAuthenticated: true });
          return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
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
