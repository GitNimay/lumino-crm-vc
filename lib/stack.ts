import { StackClientApp } from '@stackframe/js';

const publishableKey = import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY;
const projectId = import.meta.env.VITE_STACK_PROJECT_ID;

if (!publishableKey || !projectId) {
  throw new Error('Missing Stack Auth environment variables');
}

const tokenStore = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key) || null;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },
};

export const stackClientApp = new StackClientApp({
  projectId: projectId,
  publishableClientKey: publishableKey,
  tokenStore,
});
