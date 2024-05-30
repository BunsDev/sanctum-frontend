import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  document,
  mail,
  call,
  home,
  person,
  wallet,
} from "ionicons/icons";
import { AttrbuteType } from "./AddAttribute";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AttributeItem } from "../../components/AttributeItem";
import { useGetAttributesQuery } from "../../app/api/backend";

const MyAttributes: React.FC = () => {
  const myAttributes = useSelector(
    (state: RootState) => state.attributes.myAttributes
  );
  const identityId = useSelector((state: RootState) => state.connections.identityId)
  const { data, error, isLoading } = useGetAttributesQuery(identityId) 

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>My Attributes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Attributes</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*  */}

        {isLoading && <IonSpinner />}

        {data && (
        <IonList>
        {data.map((attribute, idx) => <AttributeItem key={`attr-${idx}`} attribute={attribute} />)}
      </IonList>
      )}

        {/*  */}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            {/* <IonFabButton routerLink={`/add_attribute/${AttrbuteType.EMAIL}`}>
              <IonIcon
                icon={document}
                about="Document"
                title="Document"
              ></IonIcon>
            </IonFabButton> */}
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.EMAIL}`}>
              <IonIcon icon={mail} about="Mail" title="Email"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.PHONE}`}>
              <IonIcon icon={call} about="Phone" title="Phone"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.ADDRESS}`}>
              <IonIcon icon={home} about="Addres" title="Address"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.WALLET}`}>
              <IonIcon icon={wallet} about="Wallet" title="Wallets"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.ID}`}>
              <IonIcon icon={person} about="ID" title="ID"></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MyAttributes;
