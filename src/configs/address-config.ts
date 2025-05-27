import type { AppStage } from "./types";

/**
 * @classdesc base address of external resources will gather here and will be accessed base on a defined APP_STAGE environment variable. you can add your server custom address here
 * if your addresses are not depend of app environment you could add static get method
 */
class AddressConfig{
    appStage:AppStage;
    constructor(appStage:AppStage){
        this.appStage = appStage;
    }
    get serviceUrl(){
        switch(this.appStage){
            case 'dev':
                return 'https://api.com';
            case 'test':
                return 'https://api.com';
            case 'staging':
                return 'https://api.com';
            case 'main':
                return 'https://api.com';
        }
        return 'NOT_VALID_ENV';
    }
}
export default AddressConfig;