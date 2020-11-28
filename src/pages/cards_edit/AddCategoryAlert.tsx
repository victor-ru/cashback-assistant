import React, { useEffect } from "react";
import { Category } from "src/types";
import { Button, Input, AlertDialog, Select, Row } from "react-onsenui";
import styles from "./styles.module.css";
import classnames from "classnames";
import { categories as defaultCategories } from "src/shared/default_data";
import store from "store";

interface AddCategoryAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (params: { category: Category; percent: number }) => void;
}

export function AddCategoryAlert(props: AddCategoryAlertProps) {
  const [category, setCategory] = React.useState<Category | null>(null);
  const [percent, setPercent] = React.useState<string>("");
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    const storedCategories: Category[] = store.get(
      "categories",
      defaultCategories
    );
    setCategories(storedCategories);
  }, []);

  // reset the state every time props.isOpen changes from false to true
  useEffect(() => {
    if (!props.isOpen) {
      return;
    }

    setCategory(null);
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
            value={category !== null ? String(category.id) : ""}
            onChange={(e) => {
              if (categories === undefined) {
                return;
              }

              const categoryId = parseInt(e.target.value);
              const selectedCategory = categories.find(
                (c) => c.id === categoryId
              );

              setCategory(selectedCategory || null);
            }}
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
            type="number"
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
            // Category and percent fields are required
            if (category === null || percent === "") {
              return;
            }

            props.onSave({
              category,
              percent: parseInt(percent) || 0,
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
