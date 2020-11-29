import React from "react";
import { Input, List, ListItem, ListHeader } from "react-onsenui";
import { DeleteButton } from "src/shared/delete_button";
import { Category } from "src/types";
import { Label } from "./Label";

interface EditCategoriesProps {
  categories: { category: Category; percent: number }[];
  onChange: (categories: { category: Category; percent: number }[]) => void;
}

export function EditCategories(props: EditCategoriesProps) {
  const { categories, onChange } = props;

  return (
    <List
      dataSource={categories}
      renderHeader={() => <ListHeader>Cashback Categories</ListHeader>}
      renderRow={(cashbackCategory) => (
        <ListItem key={cashbackCategory.category.id}>
          <Label long>{cashbackCategory.category.name}</Label>
          <div className="center">
            <Input
              value={String(cashbackCategory.percent)}
              onChange={(e) => {
                onChange(
                  categories.map((c) => {
                    if (c.category.id !== cashbackCategory.category.id) {
                      return c;
                    }

                    return {
                      ...c,
                      percent: parseFloat(e.target.value) || 0,
                    };
                  })
                );
              }}
              float
              placeholder="Cashback %"
            />
          </div>
          <div className="right">
            <DeleteButton
              confirm={false}
              onClick={() => {
                onChange(
                  categories.filter(
                    (c) => c.category.id !== cashbackCategory.category.id
                  )
                );
              }}
            />
          </div>
        </ListItem>
      )}
    />
  );
}
