type ConnectCallback = (arg: unknown) => void;

interface Window {
  // DJI Bridge 模块
  djiBridge: {
    platformGetLogPath: () => string;
    platformSetLogEncryptKey: (key: string) => string;
    platformVerifyLicense: (
      appId: string,
      appKey: string,
      license: string
    ) => string;
    platformIsComponentLoaded: (name: string) => string;
    platformSetWorkspaceId: (uuid: string) => string;
    platformSetInformation: (
      platformName: string,
      workspaceName: string,
      desc: string
    ) => string;
    platformGetRemoteControllerSN: () => string;
    apiSetToken(token: string): string;
    platformLoadComponent(name: string, param: string): string;

    // Thing 模块
    thingGetConnectState: () => string; // 返回 JSON 字符串
    thingConnect: (
      userName: string,
      passwd: string,
      callback: string
    ) => string; // 返回 JSON 字符串
    thingDisconnect: () => string; // 返回 JSON 字符串
    thingGetConfigs: () => string; // 返回 JSON 字符串
  };

  // Thing 回调函数接口
  thing: {
    setConnectCallback: (callback: string) => void;
  };

  connectCallback: ConnectCallback;
}
