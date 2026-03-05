import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'support-tickets-storage',
  encryptionKey: 'st-secure-key',
  mode: 'multi-process',
  readOnly: false,
});

const KEYS = {
  AUTH_TOKEN: '@auth/token',
} as const;

type StorageKey = (typeof KEYS)[keyof typeof KEYS];

export const mmkvStorage = {
  getString(key: StorageKey): string | undefined {
    return storage.getString(key);
  },

  setString(key: StorageKey, value: string): void {
    storage.set(key, value);
  },

  remove(key: StorageKey): void {
    storage.remove(key);
  },

  contains(key: StorageKey): boolean {
    return storage.contains(key);
  },

  KEYS,
} as const;
