import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CategoriesEdit } from "./pages/categories_edit";
import { CategoriesList } from "./pages/categories_list";
import { CardsEdit } from "./pages/cards_edit";
import { CardsList } from "./pages/cards_list";
import { NewPayment } from "./pages/new_payment";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">New payment</Link>
            </li>
            <li>
              <Link to="/categories">Categories List</Link>
            </li>
            <li>
              <Link to="/categories/1">Categories Edit</Link>
            </li>
            <li>
              <Link to="/cards">Cards List</Link>
            </li>
            <li>
              <Link to="/cards/1">Cards Edit</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/categories/:id">
            <CategoriesEdit />
          </Route>
          <Route path="/categories">
            <CategoriesList />
          </Route>
          <Route path="/cards/:id">
            <CardsEdit />
          </Route>
          <Route path="/cards">
            <CardsList />
          </Route>
          <Route path="/">
            <NewPayment />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
