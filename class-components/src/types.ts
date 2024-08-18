export interface IForm {
  name: string;
  age: number;
  email: string;
  password: string;
  comfirmPassword: string;
  gender: string;
  accept: boolean;
  image: File[];
  country: string;
}

export interface ISavedData {
  name: string;
  age: number;
  email: string;
  password: string;
  comfirmPassword: string;
  gender: string;
  accept: boolean;
  image: string;
  country: string;
}