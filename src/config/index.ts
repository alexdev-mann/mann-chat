import store from '../store/'

type APP_CONFIG = {
    MODE: "DEV" | "PROD";
    SOCKET: {
        PROTOCOL: string
        HOST: string
        PORT: string
    };
    VERBOSE: boolean;
    toggle_devtools: Function;
}

let config:APP_CONFIG = {
    MODE: "DEV",
    SOCKET: {
        PROTOCOL: 'ws',
        HOST: '127.0.0.1',
        PORT: '5544'
    },
    VERBOSE: true,
    toggle_devtools: (display_devtools:boolean) => {
        store.dispatch({ type: 'DEVTOOLS_CONFIG', property: 'display_devtools', value: display_devtools })
    }
}

export default {...config}
