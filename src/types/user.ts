export interface UserSchema {
  email: string;
  password: string;
  name: string;
  comparePassword: (password: string) => Promise<boolean>;
}
