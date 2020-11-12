import { NewPayment } from "src/pages/new_payment";
import { CategoriesList } from "src/pages/categories_list";
import { CardsEdit } from "src/pages/cards_edit";
import { CardsList } from "src/pages/cards_list";
import { CategoriesEdit } from "src/pages/categories_edit";

export const routes: { [key: string]: React.ComponentType<any> } = {
  cardsList: CardsList,
  cardsEdit: CardsEdit,
  categoriesList: CategoriesList,
  categoriesEdit: CategoriesEdit,
  newPayment: NewPayment,
};
