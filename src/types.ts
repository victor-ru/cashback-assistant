export interface Category {
  id: number;
  name: string;
}

export interface Card {
  id: number;
  name: string;
  bank: string;
  basePercent: number;
  cashbackCategories: {
    category: Category;
    percent: number;
  }[];
}
