import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { RouteComponentProps, useLocation } from "react-router";
import { useGetAuthenticationQuery } from "../../app/api/backend";

export const CheckoutPage: React.FC<RouteComponentProps> = ({}) => {
  const location = useLocation();
  const qp = new URLSearchParams(location.search);
  const authId = qp.get("authId");
  console.log(authId);

  const { data, error, isLoading } = useGetAuthenticationQuery(authId!);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/CartPage" />
          </IonButtons>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isLoading && <IonSpinner />}
        <IonText>{JSON.stringify(data)}</IonText>
        <IonText color={'danger'}>{JSON.stringify(error)}</IonText>
      </IonContent>
    </IonPage>
  );
};
