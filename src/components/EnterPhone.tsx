import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import { useState } from "react";

type EnterPhoneProps = {
    ctaTitle: string;
    cta: (phone: string) => void;
}

export const EnterPhone: React.FC<EnterPhoneProps> = ({ctaTitle, cta}) => {
  const [phone, setPhone] = useState("");

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    cta(phone);
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              type="tel"
              label="phone"
              labelPlacement="floating"
              value={phone}
              onIonInput={(e) => setPhone(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            item-end
            color={"primary"}
            size="small"
            onClick={onSubmit}
          >
            {ctaTitle}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
