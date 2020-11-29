import React, { useContext } from "react";
import { List, ListItem } from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Category, Card } from "src/types";
import classnames from "classnames";
import styles from "./styles.module.css";
import { StoreContext } from "src/shared/store";

interface SummaryListItemProps {
  category: Category;
  cards: Card[];
  percent: number;
}

function SummaryListItem(props: SummaryListItemProps) {
  const cardNames = props.cards.map((card) => card.name).join(", ");

  return (
    <ListItem>
      <div className="center">{props.category.name}</div>
      <div className="right">
        <div>
          <div className="list-item__title">{cardNames}</div>
          <div className={classnames("list-item__subtitle", styles.percent)}>
            {props.percent}%
          </div>
        </div>
      </div>
    </ListItem>
  );
}

function calculateSummaryData(
  categories: Category[],
  cards: Card[]
): {
  category: Category;
  cards: Card[];
  percent: number;
}[] {
  return categories.map((category) => {
    // store the cards with the best base cashback percent
    let bestBasePercent: number = 0;
    let bestBasePercentCards: Card[] = [];

    // store the cards with the best cashback percent in their cashback categories
    let bestPercent: number = 0;
    let bestCards: Card[] = [];

    cards.forEach((card) => {
      // if the card has the same base percent as already stored one(s), add it to bestBasePercentCards
      if (card.basePercent === bestBasePercent) {
        bestBasePercentCards.push(card);
      }

      // if the card has a better base percent than already stored card(s) with best basePercent,
      // replace bestBasePercentCards with it
      if (card.basePercent > bestBasePercent) {
        bestBasePercent = card.basePercent;
        bestBasePercentCards = [card];
      }

      // check if the card has this cashback category
      const cashbackCategory = card.cashbackCategories.find(
        (cashbackCategory) => cashbackCategory.category.id === category.id
      );

      // skip cards not having this cashback category
      if (cashbackCategory === undefined) {
        return;
      }

      // if the card has a better cashback percent than already stored best card(s), replace bestCards with it
      if (cashbackCategory.percent > bestPercent) {
        bestPercent = cashbackCategory.percent;
        bestCards = [card];
        return;
      }

      // if the card has the same cashback percent as already stored best card(s), add it to bestCards
      if (cashbackCategory.percent === bestPercent) {
        bestCards.push(card);
        return;
      }
    });

    // if the best percent found in cashback categories is better than the best base percent found,
    // return the cards having this cashback percent in their cashback categories
    if (bestPercent > bestBasePercent) {
      return {
        category,
        percent: bestPercent,
        cards: bestCards,
      };
    }

    // if the best base percent is better than the best percent found in cashback categories,
    // return the cards having this base percent
    if (bestBasePercent > bestPercent) {
      return {
        category,
        percent: bestBasePercent,
        cards: bestBasePercentCards,
      };
    }

    // if the best percent found in cashback categories is equal to the best base percent,
    // return all cards that have this percent, no matter where - in cashback categories or in base percent
    const allCards: Card[] = [...bestCards, ...bestBasePercentCards];

    // return only unique cards because a card can have the same percent in basePercent and in a category
    // without this, the same card would be included twice
    const uniqueCards: Card[] = Array.from(new Set(allCards));

    return {
      category,
      percent: bestPercent,
      cards: uniqueCards,
    };
  });
}

export function Summary() {
  const { cards, categories } = useContext(StoreContext);

  const summaryData: {
    category: Category;
    cards: Card[];
    percent: number;
  }[] = calculateSummaryData(categories, cards);

  return (
    <TabPage title="Summary">
      <List
        dataSource={summaryData}
        renderRow={(row) => (
          <SummaryListItem
            key={row.category.id}
            category={row.category}
            cards={row.cards}
            percent={row.percent}
          />
        )}
      />
    </TabPage>
  );
}
