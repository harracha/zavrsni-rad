import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: {email: string, role: string};
  }
}