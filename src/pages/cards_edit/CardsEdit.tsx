import React from "react";
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
import { cards as defaultCards } from "src/shared/default_data";
import store from "store";
import { EditCategories } from "./EditCategories";
import { AddCategoryAlert } from "./AddCategoryAlert";
import { Label } from "./Label";

function saveCard(card: Card) {
  const cards: Card[] = store.get("cards", defaultCards);

  // insert a new card if the id equals to 0
  if (card.id === 0) {
    const existingIds: number[] = cards.map((c) => c.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    const updatedCards = [...cards, { ...card, id: newId }];
    store.set("cards", updatedCards);
    return;
  }

  // update the existing card if the id is not 0
  const updatedCards = cards.map((c) => {
    if (c.id === card.id) {
      return card;
    }
    return c;
  });

  store.set("cards", updatedCards);
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

  return (
    <TabPage
      backButtonText="All Cards"
      rightButton={
        <ToolbarButton
          onClick={() => {
            saveCard({
              id,
              name,
              bank,
              basePercent: parseInt(basePercent) || 0,
              cashbackCategories,
            });
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
