import { Button, Icon, List, ListItem, Navigator } from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Card } from "src/types";
import React from "react";
import { routes } from "src/routes";

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
            <Button onClick={() => {
              props.navigator.pushPage(
                { component: routes.cardsEdit },
              );
            }} modifier="large">Add card</Button>
          </ListItem>
        )}
        renderRow={(row) => (
          <ListItem
            key={row.id}
            tappable
            onClick={() => {
              props.navigator.pushPage(
                { component: routes.cardsEdit },
                { data: { id: row.id } }
              );
            }}
          >
            <div className="center">
              <span className="list-item__title">{row.name}</span>
              <span className="list-item__subtitle">{row.bank}</span>
            </div>
            <div className="right">
              <Icon icon="fa-trash-alt" />
            </div>
          </ListItem>
        )}
      />
    </TabPage>
  );
}
