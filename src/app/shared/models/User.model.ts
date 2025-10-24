export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  attributes: Map<string, any[]>;
}
