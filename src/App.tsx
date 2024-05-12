import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";

import Register from "./pages/Register/Register";
import RegisterConfirmation from "./pages/Register/RegisterConfirm";
import MyAttributes from "./pages/Attributes/MyAttributes";
import AddAttribute from "./pages/Attributes/AddAttribute";
import { CreateTransaction } from "./pages/transactions/CreateTransaction";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
            <Redirect to={"/attributes"} />
          </Route>
          <Route path="/login" exact={true} component={Login} />
          <Route path="/register" exact={true} component={Register} />
          <Route
            path="/register_confirmation"
            exact={true}
            component={RegisterConfirmation}
          />
          <Route path="/attributes" exact={true} component={MyAttributes} />
          <Route path="/add_attribute" component={AddAttribute} />
          <Route
            path="/transactions"
            exact={true}
            component={CreateTransaction}
          />

          {/* <IonSplitPane contentId="main">
            <Menu />
            <Route path="/" exact={true}>
              <Redirect to="/folder/Inbox" />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
          </IonSplitPane> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
