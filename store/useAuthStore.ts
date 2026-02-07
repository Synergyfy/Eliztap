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
      
      login: async (email: string, pass: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedPass = pass.trim();

        // 1. Check Pre-defined Mock Users
        const mockUserKey = Object.keys(MOCK_USERS).find(key => 
          MOCK_USERS[key].email.toLowerCase() === normalizedEmail && 
          MOCK_USERS[key].password === normalizedPass
        );

        if (mockUserKey) {
          const { password: _, ...user } = MOCK_USERS[mockUserKey];
          // Ensure role is set correctly based on the key if not explicit
          const finalUser = { 
            ...user, 
            role: user.role || mockUserKey as UserRole 
          };
           set({ user: finalUser, isAuthenticated: true });
           return { success: true };
        }

        // 2. Check "Registered" Users (stored in localStorage via persist)
        // Note: In a real app, this would be a backend call. 
        // Since we are mocking, we can check if there's a stored user that matches.
        // However, Zustand persist only stores the *current* state. 
        // To simulate a "database" of signed up users during a session, we'd need another store or just allow any login that matches a recent signup.
        // For now, let's keep it simple: if it's not a mock user, perform a "fake" check or fail.
        
        // If we want to allow the user who JUST signed up to log in back:
        // We can't really do that easily without a separate 'users' store. 
        // But the user said "signup showing 404", which usually implies a routing issue or unhandled promise.
        
        // Let's add a generic fallback for testing if email/pass matches a pattern (optional, but good for "fake" generic logins)
        // For now, strictly enforce Mock Users or return failure.
        
        return { success: false, error: 'Invalid email or password. Try the demo accounts!' };
      },

      signup: async (userData: any) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real app, you'd post to an API. 
        // Here we just set the user as logged in immediately.
        const newUser = {
            ...userData,
            id: userData.id || `USER-${Math.random().toString(36).substr(2, 9)}`,
            role: userData.role || 'owner'
        };

        set({ user: newUser, isAuthenticated: true });
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
