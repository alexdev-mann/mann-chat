// import * as constants from '../constants/'

export interface IAppConfig { type: 'DEVTOOLS_CONFIG', property?: string, value?: any, config?: any }
export type appConfig = IAppConfig;
export function app_config(params: any): appConfig {
	return {
		type: 'APP_CONFIG',
		...params
	}
}
