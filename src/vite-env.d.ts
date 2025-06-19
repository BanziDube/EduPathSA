/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_GEMINI_EJ_KEY: 'AIzaSyAh6KDoAAwsGJWK_O4GwpoYptfY-G9nI_o';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
