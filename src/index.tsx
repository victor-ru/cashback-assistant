import React from "react";
import ReactDOM from "react-dom";
import { NewPayment } from "src/pages/new_payment";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import { Navigator, Page, Tab, Tabbar } from "react-onsenui";
import { routes } from "./routes";

const INITIAL_ACTIVE_TAB_INDEX: number = 1;

function renderPage(route: any, navigator?: Navigator) {
  const props = route.props || {};
  props.navigator = navigator;

  return React.createElement(route.component, props);
}

function App() {
  return (
    <Page>
      <Tabbar
        index={INITIAL_ACTIVE_TAB_INDEX}
        position="bottom"
        renderTabs={() => [
          {
            content: (
              <Navigator
                key="cards"
                animation="lift"
                initialRoute={{ component: routes.cardsList }}
                renderPage={renderPage}
              />
            ),
            tab: <Tab key="cards" label="Cards" icon="md-card" />,
          },
          {
            content: <NewPayment key="new_payment" />,
            tab: <Tab key="new_payment" label="New Payment" icon="md-plus" />,
          },
          {
            content: (
              <Navigator
                key="categories"
                animation="lift"
                initialRoute={{ component: routes.categoriesList }}
                renderPage={renderPage}
              />
            ),
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
