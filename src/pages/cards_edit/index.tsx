import React, { useEffect } from "react";
import { Card } from "src/types";
import { TabPage } from "src/shared/tab_page";
import {
  Button,
  Input,
  List,
  ListItem,
  ToolbarButton,
  ListHeader,
  AlertDialog,
  Select,
  Row,
} from "react-onsenui";
import styles from "./styles.module.css";
import classnames from "classnames";
import { DeleteButton } from "src/shared/delete_button";
import { card1, categories } from "src/shared/mockup_data";

interface AddCategoryAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (params: { categoryId: number; percent: number }) => void;
}

function AddCategoryAlert(props: AddCategoryAlertProps) {
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [percent, setPercent] = React.useState<string>("");

  // reset the state every time props.isOpen changes from false to true
  useEffect(() => {
    if (!props.isOpen) {
      return;
    }

    setCategoryId("");
    setPercent("");
  }, [props.isOpen]);

  return (
    <AlertDialog
      isOpen={props.isOpen}
      onCancel={props.onClose}
      modifier="rowfooter"
    >
      <div className="alert-dialog-title">Add cashback category</div>
      <div
        className={classnames(
          "alert-dialog-content",
          styles.addCategoryAlertContent
        )}
      >
        <Row>
          <Select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Input
            value={percent}
            modifier="underbar"
            float
            onChange={(event) => {
              setPercent(event.target.value);
            }}
            placeholder="Cashback %"
          />
        </Row>
      </div>
      <div className="alert-dialog-footer">
        <Button
          onClick={props.onClose}
          // the --rowfooter modifier is not applied automatically for some reason
          // added it manually here and in the button below
          className="alert-dialog-button alert-dialog-button--rowfooter"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (categoryId === "" || percent === "") {
              return;
            }

            props.onSave({
              categoryId: parseInt(categoryId),
              percent: parseInt(percent),
            });
            props.onClose();
          }}
          className="alert-dialog-button alert-dialog-button--rowfooter"
        >
          Ok
        </Button>
      </div>
    </AlertDialog>
  );
}

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
  const [
    showAddCategoryAlert,
    setShowAddCategoryAlert,
  ] = React.useState<boolean>(false);

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
            <Button
              modifier="large"
              onClick={() => setShowAddCategoryAlert(true)}
            >
              Add category
            </Button>
          </ListItem>
        )}
      />
      <AddCategoryAlert
        isOpen={showAddCategoryAlert}
        onClose={() => setShowAddCategoryAlert(false)}
        onSave={(params) => {
          console.log("params", params);
        }}
      />
    </TabPage>
  );
}
