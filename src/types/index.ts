import { ReactNode } from "react";

export type TUserState = { email: string; id: string; role: string };

export type TRoutePath = {
  name: string;
  path?: string;
  //   index?: boolean;
  element?: ReactNode;
  children?: TRoutePath[];
  icon?: ReactNode;
};
export type TRoute = {
  path: string;
  element: ReactNode;
  children?: TRoute[];
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  children?: TSidebarItem[];
};

export interface TProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  occasion: string;
  recipient: string;
  category: string;
  theme: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
