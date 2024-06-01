import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSpinner,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { Web3 } from "web3";
import CreateAndAuthenticateSanctumLinkidentityV2 from "../../abi/CreateAndAuthenticateSanctumLinkidentityV2.json";
import { useEffect, useState } from "react";
import { useProviders } from "../../hooks/useProviders";
import { useDispatch } from "react-redux";
import { useStoreIdentityMutation } from "../../app/api/backend";
import { setIdentity, setSelectedProviderName, setSelectedAccount as setSelectedAccountInRedux } from "../../app/connections/connectionsSlice";
import { EIP6963ProviderDetail } from "web3/lib/commonjs/providers.exports";

enum TransactionStates {
  NOT_SENT,
  SENDING,
  SENT,
  HASH_RECEIVED,
  RECEIPT,
  ERROR,
}

export const CreateTransaction = ({}) => {
  const provider = useProviders();
  const [selectedProvider, setSelectedProvider] = useState<
    EIP6963ProviderDetail | undefined
  >(undefined);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation<{
    result: {
      value: string;
      valueHash: string;
      type: string;
      valueHashSignature: string;
    };
  }>();
  const [stateMessage, setStateMessage] = useState("");
  const [transactionState, setTransactionState] = useState(
    TransactionStates.NOT_SENT
  );
  const [doStoreIdentity, resultStoreIdentity] = useStoreIdentityMutation();
  const [contractError, setContractError] = useState("");
  const providers = useProviders();
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false)

  const onSendTransaction = async () => {
    // return storeIdentity(accounts[0], "0xa957d485de4666277cfa9ce6b55f418975dd4c154558c377cfafdc188bcc374d" as string);

    // configure contract
    const sanctumLinkContract = new web3!.eth.Contract(
      CreateAndAuthenticateSanctumLinkidentityV2.abi,
      import.meta.env.VITE_SANCTUM_LINK_IDENTITY_CONTRACT_ADDRESS
    );

    // TODO: do a save without identity id

    try {
      setContractError("")
      setIsRunning(true);
      const createSanctumLinkIdentityReceipt = await sanctumLinkContract.methods
        .createSanctumLinkIdentity(location.state.result.value)
        .send({
          from: selectedAccount,
        });
      console.log(
        "createSanctumLinkIdentityReceipt",
        createSanctumLinkIdentityReceipt
      );
      const { sanctumLinkIdentity } =
        createSanctumLinkIdentityReceipt.events!.SanctumLinkIdentityCreated
          .returnValues;
      // TODO: save account
      await storeIdentity(selectedAccount, sanctumLinkIdentity as string);
      await dispatch(
        setIdentity({ identityId: sanctumLinkIdentity, isValidIdentity: true })
      );
      history.replace("/attributes", {});
    } catch (error: any) {
      console.error(error);
      console.log(error.message);
      setContractError(error.message);
    } finally {
      setIsRunning(false)
    }

    // transaction
    //   .on("sending", (sending) => {
    //     // Sending example
    //     console.log("Sending:", sending);
    //     setTransactionState(TransactionStates.SENDING);
    //   })
    //   .on("sent", (sent) => {
    //     // Sent example
    //     console.log("Sent:", sent);
    //     setTransactionState(TransactionStates.SENT);
    //   })
    //   .on("transactionHash", (transactionHash) => {
    //     // Transaction hash example
    //     console.log("Transaction Hash:", transactionHash);
    //     setTransactionState(TransactionStates.HASH_RECEIVED);
    //   })
    //   // .on("confirmation", (confirmation) => {
    //   //   console.log("Confirmation:", confirmation);
    //   // })
    //   .on("receipt", (receipt) => {
    //     // Confirmation example
    //     console.log("Receipt:", receipt);
    //     setTransactionState(TransactionStates.RECEIPT);
    //     const { sanctumLinkIdentity } =
    //       receipt.events!.SanctumLinkIdentityCreated.returnValues;
    //     return storeIdentity(accounts[0], sanctumLinkIdentity as string);
    //   })
    //   .on("error", (error) => {
    //     // Error example
    //     // console.error("Error:", error);
    //     setTransactionState(TransactionStates.ERROR);
    //     setStateMessage(error.message);
    //   });
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

  useEffect(() => {
    if (resultStoreIdentity.isSuccess) {
      console.log({ resultStoreIdentity });
      // history.replace("/attributes", { });
    }
  }, [resultStoreIdentity]);

  const storeIdentity = async (account: string, identityId: string) => {
    const resp = await doStoreIdentity({
      id: identityId,
      email: location.state.result.value,
      account: account,
      signature: location.state.result.valueHashSignature,
    });
    console.log({ resp });
    dispatch(setIdentity(identityId));
    history.replace("/attributes", {});
  };

  const selectProvider = async (p: EIP6963ProviderDetail) => {
    console.log(p);
    setSelectedProvider(p);
    dispatch(setSelectedProviderName(p.info.name));
    const _web3 = new Web3(p.provider);
    setWeb3(_web3);
    try {
      await _web3.currentProvider?.request({ method: "eth_requestAccounts" });
      const as = await _web3.eth.getAccounts();
      setAccounts(as);
    } catch (error) {
      console.log(error);
    }
  };

  const selectAccount = async (account: string) => {
    console.log(account);
    setSelectedAccount(account);
    dispatch(setSelectedAccountInRedux(account));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transaction</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h1>Create Sanctum Link Identity</h1>
        </IonText>

        <IonList inset={false}>
          <IonListHeader>Select Wallet Provider</IonListHeader>
          {providers.map((p: EIP6963ProviderDetail) => {
            return (
              <IonItem onClick={() => selectProvider(p)} key={p.info.uuid}>
                <IonAvatar aria-hidden="true" slot="start">
                  <img alt="" src={p.info.icon} />
                </IonAvatar>
                <IonLabel>{p.info.name}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>

        <IonList>
          <IonListHeader>Select Account</IonListHeader>
          {accounts.map((a) => {
            return (
              <IonItem onClick={() => selectAccount(a)} key={a}>
                <IonLabel>{a}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                item-end
                disabled={
                  selectedAccount === "" ||
                  (transactionState !== TransactionStates.NOT_SENT &&
                    transactionState !== TransactionStates.ERROR)
                }
                color={"primary"}
                onClick={onSendTransaction}
              >
                Send Transaction
              </IonButton>
            </IonCol>
            <IonCol className="ion-align-items-center">
              {isRunning && <IonSpinner />}
            </IonCol>
          </IonRow>
        </IonGrid>

        <hr />
        {contractError && <IonText color={"danger"}>{contractError}</IonText>}
        <hr />
        <h3>{stateToText(transactionState)}</h3>
        <p>{stateMessage}</p>
        <hr />
        {/* <pre>
          <code>{JSON.stringify(location.state, null, 2)}</code>
        </pre> */}
      </IonContent>
    </IonPage>
  );
};
