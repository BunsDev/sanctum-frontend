import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";


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
import MyAttributes from "./pages/Attributes/MyAttributes";
import AddAttribute from "./pages/Attributes/AddAttribute";
import { CreateTransaction } from "./pages/transactions/CreateTransaction";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { useProviders } from "./hooks/useProviders";

setupIonicReact();

const App: React.FC = () => {
  const providers = useProviders();
  const dispatch: Dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (window.ethereum) {
      // checkHasIdentity().then()
    } else {
      // ask the user to switch to an wallet enabled browser
    }
  }, []);

  useEffect(() => {
    console.log("App.useEffect", providers);
  }, [providers]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
            <Redirect to={"/landingpage"} />
          </Route>
          <Route path="/landingPage" exact={true} component={LandingPage} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/register" component={Register} />
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
