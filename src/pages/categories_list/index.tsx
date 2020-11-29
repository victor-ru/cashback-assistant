import { AlertDialog, Button, Input, List, ListItem } from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Category } from "src/types";
import React, { useContext } from "react";
import { DeleteButton } from "src/shared/delete_button";
import { StoreContext } from "src/shared/store";

function getUpdatedCategories(categories: Category[], newCategory: Category) {
  // insert a new category if the id equals to 0
  if (newCategory.id === 0) {
    const existingIds: number[] = categories.map((c) => c.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    const updatedCategories = [...categories, { ...newCategory, id: newId }];
    return updatedCategories;
  }

  // update the existing category if the id is not 0
  const updatedCategories = categories.map((c) => {
    if (c.id === newCategory.id) {
      return newCategory;
    }
    return c;
  });
  return updatedCategories;
}

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
            onClick={() => {
              if (editedCategory === null) {
                return;
              }

              const updatedCategories = getUpdatedCategories(
                categories,
                editedCategory
              );
              setCategories(updatedCategories);
              setEditedCategory(null);
            }}
            className="alert-dialog-button alert-dialog-button--rowfooter"
          >
            Ok
          </Button>
        </div>
      </AlertDialog>
    </TabPage>
  );
}
