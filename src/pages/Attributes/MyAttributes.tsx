import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSpinner,
  IonText,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AttributeItem } from "../../components/AttributeItem";
import { useGetAttributesQuery } from "../../app/api/backend";
import { useEffect, useState } from "react";
import { useProviders } from "../../hooks/useProviders";
import { Web3 } from "web3";
import KYCVerifiedStage0MockContractHelperConfig from "../../abi/KYCVerifiedStage0MockContractHelperConfig.json";
import CreateAndAuthenticateSanctumLinkidentityV2 from "../../abi/CreateAndAuthenticateSanctumLinkidentityV2.json";
import { getTokenAmount } from "../../app/connections/connectionsSlice";

const MyAttributes: React.FC = () => {
  const identityId = useSelector(
    (state: RootState) => state.connections.identityId
  );
  const {
    data: myAttributes,
    error,
    isLoading,
    refetch,
  } = useGetAttributesQuery(identityId, { refetchOnMountOrArgChange: 10 });
  const selectedProviderName = useSelector(
    (state: RootState) => state.connections.selectedProviderName
  );
  const selectedAccount = useSelector(
    (state: RootState) => state.connections.selectedAccount
  );
  const slcToken = useSelector(
    (state: RootState) => state.connections.slcToken
  );
  const providers = useProviders();
  console.log(providers);
  const [receipt, setReceipt] = useState("");
  const [isTransactionRunning, setIsTransactionRunning] = useState(false);
  const [contractError, setContractError] = useState("");
  const dispatch = useDispatch();

  const getAttributeByType = (attrs: any[], type: string) => {
    return attrs.find((a) => a.AttributeType === type) ?? {};
  };

  const requestKycContract = async () => {
    const metaMask = providers.find(
      (p) => p.info.name === selectedProviderName
    );
    if (!metaMask) return;
    const web3 = new Web3(metaMask.provider);

    try {
      setContractError("");
      setIsTransactionRunning(true);

      // step 1, login at contract
      const sanctumLinkContract = new web3!.eth.Contract(
        CreateAndAuthenticateSanctumLinkidentityV2.abi,
        import.meta.env.VITE_SANCTUM_LINK_IDENTITY_CONTRACT_ADDRESS
      );

      const isAuthenticated = await sanctumLinkContract.methods
        .isAuthenticated(selectedAccount)
        .call({
          from: selectedAccount,
        });
      console.log({ isAuthenticated });

      if (!isAuthenticated) {
        const receipt0 = await sanctumLinkContract.methods.authenticate().send({
          from: selectedAccount,
        });
        console.log(receipt0);
      }

      // step 2, send attributes to mock
      const sanctumLinkKycContract = new web3!.eth.Contract(
        KYCVerifiedStage0MockContractHelperConfig.abi,
        import.meta.env.VITE_SANCTUM_LINK_IDENTITY_KYC_MOCK_CONTRACT_ADDRESS
      );

      console.log("updateVerifiedPropertiesMock", {
        _nameOfUser:
          getAttributeByType(myAttributes, "NameOfUser").AttributeValue ?? "", // _nameOfUser
        _primaryPhone:
          getAttributeByType(myAttributes, "PrimaryPhone").AttributeValue ?? "", // _primaryPhone,
        _dateOfBirth:
          parseInt(
            getAttributeByType(myAttributes, "DateOfBirth").AttributeValue
          ) ?? 0, // _dateOfBirth,
        _countryOfBirth:
          getAttributeByType(myAttributes, "CountryOfBirth").AttributeValue ??
          "", // _countryOfBirth,
        _nationalIdNumber:
          getAttributeByType(myAttributes, "NationalId").AttributeValue ?? "", // _nationalIdNumber,
        _currentCountryOfResidence:
          getAttributeByType(myAttributes, "CurrentCountryOfResidence")
            .AttributeValue ?? "", // _currentCountryOfResidence,
        _currentStateOfResidence:
          getAttributeByType(myAttributes, "CurrentStateOfResidence")
            .AttributeValue ?? "", // _currentStateOfResidence,
        _primaryPhysicalAddress:
          getAttributeByType(myAttributes, "PrimaryPhysicalAddress")
            .AttributeValue ?? "", // _primaryPhysicalAddress
      });

      const _receipt = await sanctumLinkKycContract.methods
        .updateVerifiedPropertiesMock(
          getAttributeByType(myAttributes, "NameOfUser").AttributeValue ?? "", // _nameOfUser
          // XXX: static now to claim reward
          "555-1234-1234", // getAttributeByType(myAttributes, 'PrimaryPhone').AttributeValue ?? "", // _primaryPhone,
          parseInt(
            getAttributeByType(myAttributes, "DateOfBirth").AttributeValue
          ) ?? 0, // _dateOfBirth,
          getAttributeByType(myAttributes, "CountryOfBirth").AttributeValue ??
            "", // _countryOfBirth,
          getAttributeByType(myAttributes, "NationalId").AttributeValue ?? "", // _nationalIdNumber,
          getAttributeByType(myAttributes, "CurrentCountryOfResidence")
            .AttributeValue ?? "", // _currentCountryOfResidence,
          getAttributeByType(myAttributes, "CurrentStateOfResidence")
            .AttributeValue ?? "", // _currentStateOfResidence,
          getAttributeByType(myAttributes, "PrimaryPhysicalAddress")
            .AttributeValue ?? "" // _primaryPhysicalAddress
        )
        .send({
          from: selectedAccount,
        });
      console.log(_receipt);
      // @ts-ignore
      BigInt.prototype.toJSON = function () {
        return this.toString();
      };
      setReceipt(JSON.stringify(_receipt));
    } catch (error) {
      console.error(error);
      // @ts-ignore
      setContractError(error.message);
    } finally {
      setIsTransactionRunning(false);
    }
  };

  useEffect(() => {
    console.log("myAttributes", myAttributes);
  }, myAttributes);

  useEffect(() => {
    loadBalance();
  });

  const loadBalance = async () => {
    const prov = providers.find((p) => p.info.name === selectedProviderName);
    // @ts-ignore
    const balance = await dispatch(
    // @ts-ignore
    getTokenAmount({ providerInfo: prov!, account: selectedAccount })
    );
    console.log({ balance });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Attributes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {isLoading && <IonSpinner />}

        <IonText>
          <h2>$SLC: {slcToken}</h2>
        </IonText>

        {myAttributes && (
          <IonList>
            {myAttributes.map((attribute: any, idx: number) => (
              <AttributeItem key={`attr-${idx}`} attribute={attribute} />
            ))}
          </IonList>
        )}

        <hr />
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={() => requestKycContract()}>
                Update Identity
              </IonButton>
            </IonCol>
            <IonCol>{isTransactionRunning && <IonSpinner />}</IonCol>
          </IonRow>
        </IonGrid>

        <hr />
        <IonText color={"danger"}>{contractError}</IonText>
        <IonText>{receipt}</IonText>

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
