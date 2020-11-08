import React from "react";
import { TabPage } from "../../shared/tab_page";
import { List, ListItem, Button } from "react-onsenui";
import { Card } from "../../types";

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

export function CardsList() {
  return (
    <TabPage title="CardsList">
      <List
        dataSource={cards}
        renderRow={(row) => (
          <ListItem key={row.id} modifier="chevron" tappable>
            {JSON.stringify(row)}
            <div className="center">
              <span className="list-item__title">{row.name}</span>
              <span className="list-item__subtitle">{row.bank}</span>
            </div>
          </ListItem>
        )}
      />
    </TabPage>
  );
}
