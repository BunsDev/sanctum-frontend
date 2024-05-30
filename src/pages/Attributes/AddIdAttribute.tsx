import {
  IonPage,
  IonRouterOutlet,
} from "@ionic/react";
import { Route, RouteComponentProps } from "react-router";
import { AddIdAttributeWithPersonaStep1, AddIdAttributeWithPersonaStep2 } from './AddIdWithPersona'

export const AddIdttribute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={`${match.url}`} exact component={AddIdAttributeWithPersonaStep1} />
        <Route path={`${match.url}/verify`} exact component={AddIdAttributeWithPersonaStep2} />
      </IonRouterOutlet>
    </IonPage>
  );
};

