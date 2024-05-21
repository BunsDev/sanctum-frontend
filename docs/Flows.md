# User Flows

## User Registration

Identity creation using a Chainlink Function.

```mermaid
sequenceDiagram
    actor User
    User->>App: Start register with Email
    App->>+API: Register with Email
    API->>SmartContract: Check for existing Email
    SmartContract->>API: Check Email Response
    create participant MailProvider
    API->>MailProvider: Activation Code
    API->>-App: temporary Token
    destroy MailProvider
    User-xMailProvider: Receives Code
    User->>App: Enter Code
    App->>+API: Sent Token and Code
    API->>-App: Account Confirmed
    User->>App: Confirm Ethereum Transaction
    App->>SmartContract: Create Identitiy on Blockchain
    SmartContract->>Chainlink: Call Verify Function
    Chainlink->>API: Verify Data
    API->>Chainlink: Approve Data
    Chainlink->>SmartContract: Approve Response
```

Identity creation using message verification

```mermaid
sequenceDiagram
    actor User
    User->>App: Start register with Email
    App->>+API: Register with Email
    API->>SmartContract: Check for existing Email
    SmartContract->>API: Check Email Response
    create participant MailProvider
    API->>MailProvider: Activation Code
    API->>-App: temporary Token
    destroy MailProvider
    User-xMailProvider: Receives Code
    User->>App: Enter Code
    App->>+API: Sent Token and Code
    API->>-App: Account Confirmed
    User->>App: Confirm Ethereum Transaction
    App->>SmartContract: Create Identitiy on Blockchain
```