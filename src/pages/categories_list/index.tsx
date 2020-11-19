import {
  AlertDialog,
  Button,
  Input,
  List,
  ListItem,
} from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Category } from "src/types";
import React from "react";
import { DeleteButton } from "src/shared/delete_button";

const categories: Category[] = [
  {
    id: 1,
    name: "Category 1",
  },
  {
    id: 2,
    name: "Category 2",
  },
];

export function CategoriesList() {
  const [editedCategory, setEditedCategory] = React.useState<Category | null>(
    null
  );

  return (
    <TabPage title="CategoriesList">
      <List
        dataSource={categories}
        renderFooter={() => (
          <ListItem>
            <Button
              onClick={() => {
                setEditedCategory({ id: 0, name: "" });
              }}
              modifier="large"
            >
              Add category
            </Button>
          </ListItem>
        )}
        renderRow={(row) => (
          <ListItem
            key={row.id}
            tappable
            onClick={() => {
              setEditedCategory(row);
            }}
          >
            <div className="center">
              <span className="list-item__title">{row.name}</span>
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
      />
      <AlertDialog
        isOpen={editedCategory !== null}
        onCancel={() => setEditedCategory(null)}
        modifier="rowfooter"
      >
        <div className="alert-dialog-title">Category Name</div>
        <div className="alert-dialog-content">
          <Input
            placeholder="Type here"
            modifier="underbar"
            value={editedCategory === null ? "" : editedCategory.name}
            onChange={(event) => {
              if (editedCategory !== null) {
                setEditedCategory({
                  ...editedCategory,
                  name: event.target.value,
                });
              }
            }}
          />
        </div>
        <div className="alert-dialog-footer">
          <Button
            onClick={() => setEditedCategory(null)}
            // the --rowfooter modifier is not applied automatically for some reason
            // added it manually here and in the button below
            className="alert-dialog-button alert-dialog-button--rowfooter"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setEditedCategory(null)}
            className="alert-dialog-button alert-dialog-button--rowfooter"
          >
            Ok
          </Button>
        </div>
      </AlertDialog>
    </TabPage>
  );
}
