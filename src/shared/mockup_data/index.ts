import { Card, Category } from "src/types";

const cashbackCategory1: Category = {
  id: 1,
  name: "Category 1",
};

const cashbackCategory2: Category = {
  id: 2,
  name: "Category 2",
};

export const card1: Card = {
  id: 1,
  name: "Card 1",
  bank: "Bank 1",
  basePercent: 0,
  cashbackCategories: [
    { category: cashbackCategory1, percent: 5 },
    { category: cashbackCategory2, percent: 10 },
  ],
};

const card2: Card = {
  id: 2,
  name: "Card 2",
  bank: "Bank 2",
  basePercent: 1,
  cashbackCategories: [],
};

export const cards: Card[] = [card1, card2];

export const categories: Category[] = [
  {
    id: 1,
    name: "Category 1",
  },
  {
    id: 2,
    name: "Category 2",
  },
];
