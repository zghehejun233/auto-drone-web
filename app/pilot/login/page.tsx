"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DJIModule, jsNativeAPI, ThingParams } from "@/lib/dji-bridge";
import "dotenv/config";
import { Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import VConsole from "vconsole";

export default function Home() {
  const { toast } = useToast();

  const [isLoginEnabled, setLoginEnabled] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoginEnabled(username !== null && password !== null);
  // }, [username, password]);

  useEffect(() => {
    const vConsole = new VConsole();
    vConsole.showSwitch();

    const licenseInfo = {
      appId: process.env.NEXT_PUBLIC_DJI_APP_ID,
      appKey: process.env.NEXT_PUBLIC_DJI_APP_KEY,
      license: process.env.NEXT_PUBLIC_DJI_LICENSE,
    };
    jsNativeAPI.setLicense(licenseInfo);

    // 定义连接状态回调函数
    const connectCallback = async (arg: unknown) => {
      console.log(arg);

      if (arg) {
        console.log("Connected successfully!");
        // 在这里添加连接成功后的逻辑
      } else {
        console.log("Disconnected!");
        // 在这里添加连接失败后的逻辑
      }
    };
    window.connectCallback = connectCallback;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="m-auto w-96 bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-4">
        <div className="my-4 text-center text-xl">Pilot 登录</div>
        <div className="flex items-center">
          <User className="w-8 h-8 mr-4" />
          <Input onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="flex items-center">
          <Lock className="w-8 h-8 mr-4" />
          <Input onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex justify-center">
          <Button
            disabled={!isLoginEnabled}
            onClick={() => {
              const { success: isVerified, message } =
                jsNativeAPI.platformVerifyLicense();
              console.log(isVerified, message);

              if (isVerified) {
                toast({
                  title: "登录成功",
                  description: "欢迎回来！",
                });
              } else {
                toast({
                  title: "登录失败",
                  description: message,
                });
              }

              jsNativeAPI.setInformation(
                "DroneSphere",
                "DEMO",
                "This is a demo worksace for DroneSphere."
              );

              const thingParams: ThingParams = {
                host: "tcp://47.245.40.222:1883",
                connectCallback: "connectCallback",
                username: "drone",
                password: "drone",
              };
              jsNativeAPI.setThingParams(thingParams);
              jsNativeAPI.initComponent(DJIModule.THING);

              // jsNativeAPI.connect();
            }}
            className="w-full my-4"
          >
            登录
          </Button>
        </div>
        <Button
          onClick={() => {
            const configs = jsNativeAPI.getConfigs();
            console.log(configs);
            
          }}
          className="w-full"
        >
          获取参数
        </Button>
        <Button
          onClick={() => {
            jsNativeAPI.disconnect();
          }}
          className="w-full"
        >
          断开连接
        </Button>
        <Button
          onClick={() => {
            jsNativeAPI.connect();
          }}
          className="w-full"
        >
          连接
        </Button>
        <Button
          onClick={() => {
            const state = jsNativeAPI.getConnectState();
            console.log(state);
          }}
          className="w-full"
        >
          获取状态
        </Button>
      </div>
    </div>
  );
}
