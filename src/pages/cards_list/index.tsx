import { Button, List, ListItem, Navigator } from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Card } from "src/types";
import React from "react";
import { routes } from "src/routes";
import { DeleteButton } from "src/shared/delete_button";

const cards: Card[] = [
  {
    id: 1,
    name: "Card 1",
    bank: "Bank 1",
    basePercent: 0,
    cashbackCategories: [],
  },
  {
    id: 2,
    name: "Card 2",
    bank: "Bank 2",
    basePercent: 1,
    cashbackCategories: [],
  },
];

interface CardsListItemProps {
  navigator: Navigator;
  card: Card;
}

function CardsListItem(props: CardsListItemProps) {
  const { card } = props;

  return (
    <ListItem
      tappable
      onClick={() => {
        props.navigator.pushPage(
          { component: routes.cardsEdit },
          { data: { id: card.id } }
        );
      }}
    >
      <div className="center">
        <span className="list-item__title">{card.name}</span>
        <span className="list-item__subtitle">{card.bank}</span>
      </div>
      <div className="right">
        <DeleteButton
          onClick={() => {
            console.log("delete confirmed");
          }}
        />
      </div>
    </ListItem>
  );
}

interface CardsListProps {
  navigator: Navigator;
}

export function CardsList(props: CardsListProps) {
  return (
    <TabPage title="CardsList">
      <List
        dataSource={cards}
        renderFooter={() => (
          <ListItem>
            <Button
              onClick={() => {
                props.navigator.pushPage({ component: routes.cardsEdit });
              }}
              modifier="large"
            >
              Add card
            </Button>
          </ListItem>
        )}
        renderRow={(card) => (
          <CardsListItem
            key={card.id}
            navigator={props.navigator}
            card={card}
          />
        )}
      />
    </TabPage>
  );
}
