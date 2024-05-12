import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useState } from "react";
import { EnterConfirmCode } from "../../components/EnterConfirmCode";

const RegisterConfirmation: React.FC = () => {

  const onConfirm = (code:string) => {}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/register"></IonBackButton>
        </IonButtons>
          <IonTitle>Confirmation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>with Sanctum Link</IonCardSubtitle>
            <IonCardTitle>Confirm Register</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <EnterConfirmCode cta={onConfirm} />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RegisterConfirmation;
