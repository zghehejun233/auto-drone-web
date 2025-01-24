declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_DJI_APP_ID: string;
      NEXT_PUBLIC_DJI_APP_KEY: string;
      NEXT_PUBLIC_DJI_LICENSE: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}
export { };

