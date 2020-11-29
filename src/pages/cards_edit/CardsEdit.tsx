import React, { useContext } from "react";
import { Card, Category } from "src/types";
import { TabPage } from "src/shared/tab_page";
import {
  Button,
  Input,
  List,
  ListItem,
  ToolbarButton,
  Navigator,
} from "react-onsenui";
import { EditCategories } from "./EditCategories";
import { AddCategoryAlert } from "./AddCategoryAlert";
import { Label } from "./Label";
import { StoreContext } from "src/shared/store";

function getUpdatedCards(cards: Card[], newCard: Card) {
  // insert a new card if the id equals to 0
  if (newCard.id === 0) {
    const existingIds: number[] = cards.map((c) => c.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    const updatedCards = [...cards, { ...newCard, id: newId }];
    return updatedCards;
  }

  // update the existing card if the id is not 0
  const updatedCards = cards.map((c) => {
    if (c.id === newCard.id) {
      return newCard;
    }
    return c;
  });
  return updatedCards;
}

// defaultCard is used when a new card is added
const defaultCard: Card = {
  id: 0,
  name: "",
  bank: "",
  basePercent: 0,
  cashbackCategories: [],
};

interface CardsEditProps {
  navigator: Navigator;
  card?: Card;
}

export function CardsEdit(props: CardsEditProps) {
  const { card = defaultCard, navigator } = props;
  const { id } = card;

  const [name, setName] = React.useState<string>(card.name);
  const [bank, setBank] = React.useState<string>(card.bank);
  const [basePercent, setBasePercent] = React.useState<string>(
    String(card.basePercent)
  );
  const [cashbackCategories, setCashbackCategories] = React.useState<
    {
      category: Category;
      percent: number;
    }[]
  >(card.cashbackCategories);
  const [
    showAddCategoryAlert,
    setShowAddCategoryAlert,
  ] = React.useState<boolean>(false);

  const { cards, setCards } = useContext(StoreContext);

  return (
    <TabPage
      backButtonText="All Cards"
      rightButton={
        <ToolbarButton
          onClick={() => {
            const card = {
              id,
              name,
              bank,
              basePercent: parseFloat(basePercent) || 0,
              cashbackCategories,
            };
            setCards(getUpdatedCards(cards, card));
            navigator.popPage();
          }}
        >
          Save
        </ToolbarButton>
      }
    >
      <List>
        <ListItem>
          <Label>Title</Label>
          <div className="center">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              float
              placeholder="Card name"
            />
          </div>
        </ListItem>
        <ListItem>
          <Label>Bank</Label>
          <div className="center">
            <Input
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              float
              placeholder="Card bank"
            />
          </div>
        </ListItem>
        <ListItem>
          <Label>Cashback %</Label>
          <div className="center">
            <Input
              type="number"
              value={basePercent}
              onChange={(e) => setBasePercent(e.target.value)}
              float
              placeholder="Base cashback %"
            />
          </div>
        </ListItem>
      </List>

      <EditCategories
        categories={cashbackCategories}
        onChange={setCashbackCategories}
      />

      <ListItem>
        <Button modifier="large" onClick={() => setShowAddCategoryAlert(true)}>
          Add category
        </Button>
      </ListItem>

      <AddCategoryAlert
        isOpen={showAddCategoryAlert}
        onClose={() => setShowAddCategoryAlert(false)}
        onSave={(newCategory) => {
          // don't add duplicate categories
          if (
            cashbackCategories.find(
              (c) => c.category.id === newCategory.category.id
            )
          ) {
            return;
          }

          setCashbackCategories([...cashbackCategories, newCategory]);
        }}
      />
    </TabPage>
  );
}
