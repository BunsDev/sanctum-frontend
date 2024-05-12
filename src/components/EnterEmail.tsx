import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import { useState } from "react";

type EnterEmailProps = {
    ctaTitle: string;
    cta: (email: string) => void;
}

export const EnterEmail: React.FC<EnterEmailProps> = ({ctaTitle, cta}) => {
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    cta(email);
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              type="email"
              label="Email"
              labelPlacement="floating"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
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
