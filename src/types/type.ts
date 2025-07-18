import type { ReactNode } from "react";

export type Item ={
       id: number;
       name: string;
       category: string;
       gender: string; 
       price: number;
       image: string
}


export type PropType = {
    gender:string; 
}

export type Category = {
  category: string
  image: string
}

export type User = {
  email: string;
  role: "admin" | "user";
}

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export type Theme = "dark" | "light" | "system"

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export type Props={
  children:ReactNode;
}

export type ErrorState = {
  hasError:boolean;
  error:Error | null;
  errorInfo?:React.ErrorInfo | null
}