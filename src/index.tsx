import React from "react";
import ReactDOM from "react-dom";
import { CategoriesList } from "./pages/categories_list";
import { CardsList } from "./pages/cards_list";
import { NewPayment } from "./pages/new_payment";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import { Page, Tab, Tabbar } from "react-onsenui";

const INITIAL_ACTIVE_TAB_INDEX: number = 1;

function App() {
  return (
    <Page>
      <Tabbar
        index={INITIAL_ACTIVE_TAB_INDEX}
        animation="none"
        position="bottom"
        renderTabs={() => [
          {
            content: <CardsList key="cards" />,
            tab: <Tab key="cards" label="Cards" icon="md-card" />,
          },
          {
            content: <NewPayment key="new_payment" />,
            tab: <Tab key="new_payment" label="New Payment" icon="md-plus" />,
          },
          {
            content: <CategoriesList key="categories" />,
            tab: (
              <Tab key="categories" label="Categories" icon="md-view-list" />
            ),
          },
        ]}
      />
    </Page>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
