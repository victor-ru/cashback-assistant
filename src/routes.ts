import { Summary } from "src/pages/summary";
import { CategoriesList } from "src/pages/categories_list";
import { CardsEdit } from "src/pages/cards_edit";
import { CardsList } from "src/pages/cards_list";

export const routes: { [key: string]: React.ComponentType<any> } = {
  cardsList: CardsList,
  cardsEdit: CardsEdit,
  categoriesList: CategoriesList,
  summary: Summary,
};
