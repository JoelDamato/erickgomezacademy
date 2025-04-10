/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // Podés agregar más si querés que TypeScript lo autocomplete
    // readonly VITE_OTRA_VAR?: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  