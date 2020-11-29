import React from "react";
import ReactDOM from "react-dom";
import { Summary } from "src/pages/summary";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import { Navigator, Page, Tab, Tabbar } from "react-onsenui";
import { routes } from "./routes";
import { CategoriesList } from "./pages/categories_list";
import { StoreProvider } from "./shared/store";

const INITIAL_ACTIVE_TAB_INDEX: number = 1;

function renderPage(route: any, navigator?: Navigator) {
  const props = route.props || {};
  props.navigator = navigator;
  props.key = route.component.name;

  return React.createElement(route.component, props);
}

function App() {
  return (
    <StoreProvider>
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
              content: <Summary key="summary" />,
              tab: <Tab key="summary" label="Summary" icon="md-local-atm" />,
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
    </StoreProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
