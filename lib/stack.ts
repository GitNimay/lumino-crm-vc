import { StackClientApp } from '@stackframe/js';

const publishableKey = import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY;
const projectId = import.meta.env.VITE_STACK_PROJECT_ID;

if (!publishableKey || !projectId) {
  throw new Error('Missing Stack Auth environment variables');
}

export const stackClientApp = new StackClientApp({
  projectId: projectId,
  publishableClientKey: publishableKey,
  tokenStore: 'localStorage',
});
