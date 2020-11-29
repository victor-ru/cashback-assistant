import React, { useEffect, useState } from "react";
import { Card, Category } from "src/types";
import {
  cards as defaultCards,
  categories as defaultCategories,
} from "src/shared/default_data";
import store from "store";

interface StoreContextProps {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const StoreContext = React.createContext<StoreContextProps>({
  cards: [],
  setCards: () => {},
  categories: [],
  setCategories: () => {},
});

export function StoreProvider(props: { children: React.ReactNode }) {
  const [cards, setCardsState] = useState<Card[]>([]);
  const [categories, setCategoriesState] = useState<Category[]>([]);

  useEffect(() => {
    const storedCards: Card[] = store.get("cards", defaultCards);
    setCardsState(storedCards);

    const storedCategories: Category[] = store.get(
      "categories",
      defaultCategories
    );
    setCategoriesState(storedCategories);
  }, []);

  const setCards = (cards: Card[]) => {
    setCardsState(cards);
    store.set("cards", cards);
  };

  const setCategories = (categories: Category[]) => {
    setCategoriesState(categories);
    store.set("categories", categories);
  };

  return (
    <StoreContext.Provider
      value={{ cards, setCards, categories, setCategories }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
