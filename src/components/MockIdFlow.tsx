import { Photo } from "@capacitor/camera";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonImg, IonButton, IonSpinner } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { CameraScanner } from "./MockScanner/CameraScanner";

export const AddIdttributeMockStep1 = () => {
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

export const AddIdttributeMockStep2 = () => {
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
