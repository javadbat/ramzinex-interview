import AddressConfig from "./address-config";
import type { AppStage, NodeEnv } from "./types";

class AppConfig{
    nodeEnv:NodeEnv;
    appStage: AppStage;
    address: AddressConfig;
    constructor(env:NodeEnv,appStage:AppStage){
        this.nodeEnv = env;
        //app stage tell which stage our app are in for example if you are in local env or you are in dev or master environment.
        //currently it only use to determine server address but you can write more logic on it for example you can change your app log level base on environment
        this.appStage = appStage;
        this.address = new AddressConfig(this.appStage);
    }
}
export const appConfig = new AppConfig(import.meta.env.MODE as NodeEnv || "development",import.meta.env.APP_STAGE||"dev");