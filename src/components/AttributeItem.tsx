import {
  IonItemSliding,
  IonItem,
  IonIcon,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { AttrbuteType } from "../pages/Attributes/AddAttribute";
import {
  add,
  document,
  mail,
  call,
  home,
  person,
  wallet,
  help,
} from "ionicons/icons";

type AttributeItemProps = {
  attribute: {
    AttributeValue: string;
    AttributeType: AttrbuteType;
  };
};

export const AttributeItem: React.FC<AttributeItemProps> = ({ attribute }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <AttributeIcon type={attribute.AttributeType} />
        <IonLabel style={{paddingLeft: '5px'}}>{attribute.AttributeValue}</IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption>Favorite</IonItemOption>
        <IonItemOption color="danger">Delete</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

type AttributeIconProps = {
  type: AttrbuteType;
};

const AttributeIcon: React.FC<AttributeIconProps> = ({ type }) => {
  switch (type) {
    case AttrbuteType.EMAIL:
    case AttrbuteType.PrimaryEmail:
      return <IonIcon icon={mail} about="Mail" title="Email"></IonIcon>;
    case AttrbuteType.PHONE:
      return <IonIcon icon={call} about="Phone" title="Phone"></IonIcon>;
    case AttrbuteType.ADDRESS:
      return <IonIcon icon={home} about="Addres" title="Address"></IonIcon>;
    case AttrbuteType.WALLET:
    case AttrbuteType.Wallet:
      return <IonIcon icon={wallet} about="Wallet" title="Wallets"></IonIcon>;
    case AttrbuteType.ID:
      return <IonIcon icon={person} about="ID" title="ID"></IonIcon>;
    default:
      return <IonIcon icon={help} about="?" title="?"></IonIcon>;
  }
};
