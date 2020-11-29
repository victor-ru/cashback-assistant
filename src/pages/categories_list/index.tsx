import { AlertDialog, Button, Input, List, ListItem } from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Category } from "src/types";
import React, { useContext } from "react";
import { DeleteButton } from "src/shared/delete_button";
import store from "store";
import { StoreContext } from "src/shared/store";

export function CategoriesList() {
  const [editedCategory, setEditedCategory] = React.useState<Category | null>(
    null
  );

  const { categories, setCategories } = useContext(StoreContext);

  return (
    <TabPage title="Categories">
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
                  const updatedCategories = categories.filter(
                    (c) => c.id !== row.id
                  );
                  setCategories(updatedCategories);
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
            onChange={(e) => {
              if (editedCategory !== null) {
                setEditedCategory({
                  ...editedCategory,
                  name: e.target.value,
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
