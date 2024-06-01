import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRouterOutlet,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  Route,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router";
import "../Page.css";
import { useProviders } from "../../hooks/useProviders";
import { EIP6963ProviderDetail } from "web3/lib/commonjs/providers.exports";
import { useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getIdentityForAccount,
  setSelectedAccount,
  setSelectedProviderName,
} from "../../app/connections/connectionsSlice";
import { Web3 } from "web3";
import { useGetAttributesQuery, useStoreAuthenticationMutation } from "../../app/api/backend";
import { AttributeItem } from "../../components/AttributeItem";

export const Authentication: React.FC<RouteComponentProps> = ({ match }) => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={`${match.url}`} exact component={AuthenticationStep1} />
        <Route
          path={`${match.url}/approval`}
          exact
          component={AuthenticationStep2}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

const AuthenticationStep1: React.FC = ({}) => {
  const providers = useProviders();
  const dispatch: Dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [selectedProvider, setSelectedProvider] = useState<
    EIP6963ProviderDetail | undefined
  >(undefined);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  const selectProvider = async (p: EIP6963ProviderDetail) => {
    console.log(p);
    setSelectedProvider(p);
    dispatch(setSelectedProviderName(p.info.name));
    try {
      const web3 = new Web3(p.provider);
      await web3.currentProvider?.request({ method: "eth_requestAccounts" });
      const as = await web3.eth.getAccounts();
      setAccounts(as);
    } catch (error) {
      console.log(error);
    }
  };

  const selectAccount = async (account: string) => {
    console.log(account);
    dispatch(setSelectedAccount(account));
    const resp = await dispatch(
      // @ts-ignore
      getIdentityForAccount({ providerInfo: selectedProvider!, account })
    );
    console.log("after dispatch", resp);

    // @ts-ignore
    if (
      resp.type === "identity/get/fulfilled" && resp.payload.isValidIdentity
    ) {
      history.replace(`/authentication/approval`);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText>
          <h1>Authenticate</h1>
        </IonText>
        <IonText>
          <h4>with SanctumLink</h4>
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
      </IonContent>
    </>
  );
};

const AuthenticationStep2: React.FC = ({}) => {
  const identityId = useSelector(
    (state: RootState) => state.connections.identityId
  );
  const {
    data: myAttributes,
    error,
    isLoading,
    refetch,
  } = useGetAttributesQuery(identityId, { refetchOnMountOrArgChange: 10 });
  const [selectedAttributes, setSelectedAttributes] = useState<any>([]);
  const [doStoreAuthentication, storeAuthenticationResult] = useStoreAuthenticationMutation()

  const onChangeAttribute = (toAdd: any[], toRemove: any[]) => {
    console.log({toAdd, toRemove})
    const newAttrs = [...selectedAttributes, ...toAdd];
    toRemove.forEach(tra => {
        const idx = newAttrs.findIndex(a => a.AttributeValue === tra.AttributeValue);
        if(idx >= 0) {
            newAttrs.splice(idx, 1);
        }
    })
    setSelectedAttributes(newAttrs)
  }

  const onApprove = async () => {
    const result = await doStoreAuthentication({ identityId, attributes: selectedAttributes })
    // @ts-ignore
    const { authId } = result.data
    console.log(authId)
    window.location.href = import.meta.env.VITE_TMP_SHOP_URL +'?authId='+ authId
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Approve Attributes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText><h2>Approval for MyShop</h2></IonText>
        {myAttributes && (
          <IonList>
            {myAttributes.map((attribute: any, idx: number) => (
              <AttributeItem key={`attr-${idx}`} attribute={attribute} showSelect={true} onSelect={onChangeAttribute} />
            ))}
          </IonList>
        )}

        <br />
        <br />

        <IonButton expand="block" color={'warning'}>Reject</IonButton>
        <IonButton expand="block" onClick={onApprove}>Approve</IonButton>

        {/* <hr />
        <IonText>{JSON.stringify(selectedAttributes)}</IonText> */}
      </IonContent>
    </IonPage>
  );
};
