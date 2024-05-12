import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import { useState } from "react";

type EnterConfirmCodeProps = {
  cta: (code: string) => void;
};

export const EnterConfirmCode: React.FC<EnterConfirmCodeProps> = ({ cta }) => {
  const [confirmation, setConfirmation] = useState("");

  const onSumit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(confirmation)
    cta(confirmation);
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              type="text"
              label="Confirmation"
              labelPlacement="floating"
              value={confirmation}
              onIonInput={(e) => setConfirmation(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton item-end color={"primary"} size="small" onClick={onSumit}>
            Confirm
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
