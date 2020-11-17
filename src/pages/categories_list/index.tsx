import { Button, Icon, List, ListItem, Navigator } from "react-onsenui";
import { TabPage } from "src/shared/tab_page";
import { Category } from "src/types";
import React from "react";
import { routes } from "src/routes";

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

interface CategoriesListProps {
  navigator: Navigator;
}

export function CategoriesList(props: CategoriesListProps) {
  return (
    <TabPage title="CategoriesList">
      <List
        dataSource={categories}
        renderFooter={() => (
          <ListItem>
            <Button
              onClick={() => {
                props.navigator.pushPage({ component: routes.categoriesEdit });
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
              props.navigator.pushPage(
                { component: routes.categoriesEdit },
                { data: { id: row.id } }
              );
            }}
          >
            <div className="center">
              <span className="list-item__title">{row.name}</span>
            </div>
            <div className="right">
              <Icon icon="fa-trash-alt" />
            </div>
          </ListItem>
        )}
      />
    </TabPage>
  );
}
