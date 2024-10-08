import { ICategory } from "@/types/category";

export type Payment = {
  id: string;
  amount: number;
  category: ICategory[];
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const dataTransaction: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    category: [
      {
        id: 0,
        category_title: "Transportation",
        colorBadge: "red",
      },
    ],
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    category: [
      {
        id: 1,
        category_title: "Transportation",
        colorBadge: "red",
      },
    ],
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    category: [
      {
        id: 2,
        category_title: "Transportation",
        colorBadge: "red",
      },
    ],
    email: "Monserrat44@gmail.com",
  },
  {
    id: "derv1wsa",
    amount: 900,
    status: "success",
    category: [
      {
        id: 3,
        category_title: "Transportation",
        colorBadge: "red",
      },
    ],
    email: "testing@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    category: [
      {
        id: 4,
        category_title: "Transportation",
        colorBadge: "yellow",
      },
      {
        id: 5,
        category_title: "Vacation",
        colorBadge: "teal",
      },
    ],
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    category: [
      {
        id: 6,
        category_title: "Transportation",
        colorBadge: "red",
      },
    ],
    email: "carmella@hotmail.com",
  },
];
