import {
  IonButton,
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
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { EnterEmail } from "../../components/EnterEmail";
import { useHistory } from "react-router";

const Register: React.FC = () => {
  const history = useHistory();

  const onEnterEmail = (email:string) => {
    history.push(`/register_confirmation`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>with Sanctum Link</IonCardSubtitle>
            <IonCardTitle>Register</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <EnterEmail ctaTitle="Sign up now" cta={onEnterEmail} />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
