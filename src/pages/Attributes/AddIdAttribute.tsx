import {
  IonPage,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import { Route, RouteComponentProps, useHistory } from "react-router";
import { CameraScanner } from "../../components/MockScanner/CameraScanner";
import { Photo } from "@capacitor/camera";
import { useState } from "react";
import { AddIdAttributeWithPersonaStep1 } from './AddIdWithPersona'

export const AddIdttribute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={`${match.url}`} exact component={AddIdAttributeWithPersonaStep1} />
        <Route path={`${match.url}/verify`} exact component={AddIdttributeMockStep2} />
      </IonRouterOutlet>
    </IonPage>
  );
};

// Capture -> Preview -> Verified -> Transaction

const AddIdttributeMockStep1 = () => {
    const [captured, setCaptured] = useState<Photo | undefined>(undefined);
  const history = useHistory();

  const onCaptureId = async (photo: Photo) => {
    setCaptured(photo)
  }

  return (
    <IonPage>
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/attributes"></IonBackButton>
        </IonButtons>
        <IonTitle>Scan</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding">
      <CameraScanner onCapture={onCaptureId} />
      <hr />
      {captured && (<>
        <IonImg src={`data:image/jpg;base64,${captured.base64String}`} />
        <IonButton>Verify</IonButton>
        </>)}
    </IonContent>
  </IonPage>
  );
};

const AddIdttributeMockStep2 = () => {
    const [captured, setCaptured] = useState<Photo | undefined>(undefined);
  const history = useHistory();

  const onCaptureId = async (photo: Photo) => {
    setCaptured(photo)
  }

  return (
    <IonPage>
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/attributes"></IonBackButton>
        </IonButtons>
        <IonTitle>Scan</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding">
      <IonSpinner />
    </IonContent>
  </IonPage>
  );
};
