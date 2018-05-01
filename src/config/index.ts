
type APP_CONFIG = {
    MODE: "DEV" | "PROD";
    SOCKET: {
        PROTOCOL: string
        HOST: string
        PORT: string
    };
    VERBOSE: boolean;
}

let config:APP_CONFIG = {
    MODE: "DEV",
    SOCKET: {
        PROTOCOL: 'ws',
        HOST: '127.0.0.1',
        PORT: '5544'
    },
    VERBOSE: true
}

export default {...config}
