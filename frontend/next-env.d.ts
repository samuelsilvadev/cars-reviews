/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_URL: string;
    readonly BFF_URL: string;
  }
}
