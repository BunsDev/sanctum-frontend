import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { Web3 } from "web3";
import CreateAndAuthenticateSanctumLinkidentityV2 from "../../abi/CreateAndAuthenticateSanctumLinkidentityV2.json";
import { useState } from "react";

enum TransactionStates {
  NOT_SENT,
  SENDING,
  SENT,
  HASH_RECEIVED,
  RECEIPT,
  ERROR,
}

export const CreateTransaction = ({}) => {
  const [stateMessage, setStateMessage] = useState("");
  const [transactionState, setTransactionState] = useState(
    TransactionStates.NOT_SENT
  );
  const history = useHistory();
  const location = useLocation<{ result: { value: string, valueHash: string, type: string, signature: string } }>();

  const onSendTransaction = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      // Request the user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the connected accounts
      const accounts = await web3.eth.getAccounts();

      const sanctumLinkContract = new web3.eth.Contract(
        CreateAndAuthenticateSanctumLinkidentityV2.abi,
        import.meta.env.VITE_SANCTUM_LINK_IDENTITY_CONTRACT_ADDRESS
      );

      const transaction = sanctumLinkContract.methods
        .createSanctumLinkIdentity(location.state.result.value)
        .send({
          from: accounts[0],
        });

      transaction
        .on("sending", (sending) => {
          // Sending example
          console.log("Sending:", sending);
          setTransactionState(TransactionStates.SENDING);
        })
        .on("sent", (sent) => {
          // Sent example
          console.log("Sent:", sent);
          setTransactionState(TransactionStates.SENT);
        })
        .on("transactionHash", (transactionHash) => {
          // Transaction hash example
          console.log("Transaction Hash:", transactionHash);
          setTransactionState(TransactionStates.HASH_RECEIVED);
        })
        // .on("confirmation", (confirmation) => {
        //   console.log("Confirmation:", confirmation);
        // })
        .on("receipt", (receipt) => {
          // Confirmation example
          console.log("Receipt:", receipt);
          setTransactionState(TransactionStates.RECEIPT);
          const { sanctumLinkIdentity } =
            receipt.events!.SanctumLinkIdentityCreated.returnValues;
          return storeIdentity(accounts[0], sanctumLinkIdentity as string);
        })
        .on("error", (error) => {
          // Error example
          // console.error("Error:", error);
          setTransactionState(TransactionStates.ERROR);
          setStateMessage(error.message);
        });
    } else {
      // Alert the user to download Metamask
      alert("Please download Metamask");
    }
  };

  const stateToText = (state: TransactionStates): string => {
    switch (state) {
      case TransactionStates.NOT_SENT:
        return "";
      case TransactionStates.SENDING:
        return "Sending";
      case TransactionStates.SENT:
        return "Sent";
      case TransactionStates.HASH_RECEIVED:
        return "Waiting";
      case TransactionStates.RECEIPT:
        return "Receipt";
      default:
        return "";
    }
  };

  const storeIdentity = async (account: string, identityId: string) => {

  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transaction</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Create Sanctum Link Identity</h1>
        <IonButton
          item-end
          disabled={
            transactionState !== TransactionStates.NOT_SENT &&
            transactionState !== TransactionStates.ERROR
          }
          color={"primary"}
          onClick={onSendTransaction}
        >
          Send Transaction
        </IonButton>
        <h3>{stateToText(transactionState)}</h3>
        <p>{stateMessage}</p>
        <hr />
        <pre>
          <code>{JSON.stringify(location.state, null, 2)}</code>
        </pre>
      </IonContent>
    </IonPage>
  );
};
