// store/auth.ts
import { User } from '@typess/user';

import { create } from 'zustand';

interface AuthState {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loginUser: (user) => set({ user }),
  logoutUser: () => set({ user: null }),
}));

export default useAuthStore;
