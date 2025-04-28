export { auth as middleware } from '@/auth';

export const config = {
  matcher: ['/session'],
  pages: {
    sigIn: '/api/auth/signin',
  },
};
