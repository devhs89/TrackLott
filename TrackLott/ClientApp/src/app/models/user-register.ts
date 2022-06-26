export interface UserRegister {
  email: string;
  password: string;
  repeatPassword: string;
  givenName: string;
  surname: string;
  dob: Date;
  country: string;
  termsCheck: boolean;
}
