import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { EnterConfirmCode } from "../../components/EnterConfirmCode";

// @Deprecated: Not used
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
