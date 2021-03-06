import { Button, List, ListItem, Navigator } from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Card } from "src/types";
import React, { useContext } from "react";
import { routes } from "src/routes";
import { DeleteButton } from "src/shared/delete_button";
import { StoreContext } from "src/shared/store";

interface CardsListItemProps {
  navigator: Navigator;
  card: Card;
  onDelete: () => void;
}

function CardsListItem(props: CardsListItemProps) {
  const { card } = props;

  return (
    <ListItem
      tappable
      onClick={() => {
        props.navigator.pushPage({
          component: routes.cardsEdit,
          props: { card },
        });
      }}
    >
      <div className="center">
        <span className="list-item__title">{card.name}</span>
        <span className="list-item__subtitle">{card.bank}</span>
      </div>
      <div className="right">
        <DeleteButton onClick={props.onDelete} />
      </div>
    </ListItem>
  );
}

interface CardsListProps {
  navigator: Navigator;
}

export function CardsList(props: CardsListProps) {
  const { cards, setCards } = useContext(StoreContext);

  return (
    <TabPage title="Cards">
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
            onDelete={() => {
              const updatedCards = cards.filter((c) => c.id !== card.id);
              setCards(updatedCards);
            }}
          />
        )}
      />
    </TabPage>
  );
}
