/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_USER_ID: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
