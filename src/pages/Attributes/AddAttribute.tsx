import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Route, RouteComponentProps } from "react-router";
import { AddEmailAttribute } from "./AddEmailAttribute";
import { AddPhoneAttribute } from "./AddPhoneAttribute";
import { AddIdttribute } from "./AddIdAttribute";

export enum AttrbuteType {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  ADDRESS = "ADDRESS",
  WALLET = "WALLET",
  ID = "ID",
  PrimaryEmail = "PrimaryEmail",
  Wallet = "Wallet",
}

const AddAttribute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
      <Route
          path={`/add_attribute/${AttrbuteType.EMAIL}`}
          component={AddEmailAttribute}
        />
        <Route
          path={`/add_attribute/${AttrbuteType.PHONE}`}
          component={AddPhoneAttribute}
        />
        <Route
          path={`/add_attribute/${AttrbuteType.ID}`}
          component={AddIdttribute}
        />
        <Route component={NotFoundPage} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AddAttribute;

//

const NotFoundPage = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/attributes"></IonBackButton>
          </IonButtons>
          <IonTitle>Add ???</IonTitle>
        </IonToolbar>
      </IonHeader>{" "}
      <IonContent fullscreen className="ion-padding">
        <h1>Not Implemented</h1>
      </IonContent>
    </IonPage>
  );
};
