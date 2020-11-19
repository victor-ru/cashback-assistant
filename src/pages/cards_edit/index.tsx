import React from "react";
import { Card } from "src/types";
import { TabPage } from "src/shared/tab_page";
import {
  Button,
  Input,
  List,
  ListItem,
  ToolbarButton,
  ListHeader,
} from "react-onsenui";
import styles from "./styles.module.css";
import classnames from "classnames";
import { DeleteButton } from "src/shared/delete_button";
import { card1 } from "src/shared/mockup_data";


function Label(props: { children: React.ReactNode; long?: boolean }) {
  return (
    <div
      className={classnames("left", styles.leftLabel, {
        [styles.leftLabelLong]: props.long,
      })}
    >
      {props.children}
    </div>
  );
}

interface CardsEditProps {
  card: Card;
}

export function CardsEdit(props: CardsEditProps) {
  return (
    <TabPage
      backButtonText="All Cards"
      rightButton={<ToolbarButton>Save</ToolbarButton>}
    >
      <List>
        <ListItem>
          <Label>Title</Label>
          <div className="center">
            <Input value={card1.name} float placeholder="Card name" />
          </div>
        </ListItem>
        <ListItem>
          <Label>Bank</Label>
          <div className="center">
            <Input value={card1.bank} float placeholder="Card bank" />
          </div>
        </ListItem>
      </List>
      <List
        dataSource={card1.cashbackCategories}
        renderHeader={() => <ListHeader>Cashback Categories</ListHeader>}
        renderRow={(cashbackCategory) => (
          <ListItem key={cashbackCategory.category.id}>
            <Label long>{cashbackCategory.category.name}</Label>
            <div className="center">
              <Input
                value={String(cashbackCategory.percent)}
                float
                placeholder="Cashback %"
              />
            </div>
            <div className="right">
              <DeleteButton
                onClick={() => {
                  console.log("delete confirmed");
                }}
              />
            </div>
          </ListItem>
        )}
        renderFooter={() => (
          <ListItem>
            <Button modifier="large">Add category</Button>
          </ListItem>
        )}
      />
    </TabPage>
  );
}
