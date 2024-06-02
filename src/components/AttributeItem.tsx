import {
  IonItemSliding,
  IonItem,
  IonIcon,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonCheckbox,
  CheckboxCustomEvent,
  CheckboxChangeEventDetail,
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
  showSelect?: boolean;
  onSelect?: (add: any[], remove: any[]) => void;
};

export const AttributeItem: React.FC<AttributeItemProps> = ({
  attribute,
  showSelect = false,
  onSelect
}) => {

  const _onSelectCallback = (d: CheckboxChangeEventDetail, attribute: any) => {
    // console.log(d, attribute);
    if(onSelect) {
      const toAdd = [];
      const toRemove = [];
      if(d.checked) {
        toAdd.push(attribute)
      } else {
        toRemove.push(attribute)
      }
      onSelect(toAdd, toRemove);
    }
  }

  return (
    <IonItemSliding>
      <IonItem>
        <AttributeIcon type={attribute.AttributeType} />
        {showSelect ? (
          <IonCheckbox justify="end" onIonChange={(e) => _onSelectCallback(e.detail, attribute)}>
            <IonLabel style={{ paddingLeft: "5px" }}>
              {attribute.AttributeValue}
            </IonLabel>
          </IonCheckbox>
        ) : (
          <IonLabel style={{ paddingLeft: "5px" }}>
            {attribute.AttributeValue}
            <p>{attribute.AttributeType}</p>
          </IonLabel>
        )}
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
      return <IonIcon icon={mail} about="Mail" title="Email" slot="start"></IonIcon>;
    case AttrbuteType.PHONE:
      return <IonIcon icon={call} about="Phone" title="Phone" slot="start"></IonIcon>;
    case AttrbuteType.ADDRESS:
      return <IonIcon icon={home} about="Addres" title="Address" slot="start"></IonIcon>;
    case AttrbuteType.WALLET:
    case AttrbuteType.Wallet:
      return <IonIcon icon={wallet} about="Wallet" title="Wallets" slot="start"></IonIcon>;
    case AttrbuteType.ID:
      return <IonIcon icon={person} about="ID" title="ID" slot="start"></IonIcon>;
    default:
      return <IonIcon icon={help} about="?" title="?" slot="start"></IonIcon>;
  }
};
