// store/auth.ts
import { User } from '@typess/user';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

// const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   loginUser: (user) => set({ user }),
//   logoutUser: () => set({ user: null }),
// }));

const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
    }),
    { name: 'authStore' },
  ),
);

export default useAuthStore;
