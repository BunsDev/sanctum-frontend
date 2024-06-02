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

    const getProp = (data: any[] = [], type: string) => {
        return (data.find(a => a.AttributeType === type) ?? {}).AttributeValue
    }

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

        <IonText>Ship To:</IonText>
        <br />
        <IonText>{getProp(data.attributes, 'NameOfUser')}</IonText>
        <br />
        <IonText>{getProp(data.attributes, 'PrimaryPhysicalAddress')}</IonText>
        <br />
        <IonText>{getProp(data.attributes, 'PrimaryEmail')}</IonText>
        <br />

        <hr />
        <IonText color={'medium'}>{JSON.stringify(data)}</IonText>
        <IonText color={'danger'}>{JSON.stringify(error)}</IonText>
      </IonContent>
    </IonPage>
  );
};
