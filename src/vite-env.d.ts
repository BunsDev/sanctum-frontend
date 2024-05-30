/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    readonly VITE_SANCTUM_LINK_IDENTITY_CONTRACT_ADDRESS: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  