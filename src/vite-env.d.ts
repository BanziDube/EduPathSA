/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_GEMINI_EJ_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
