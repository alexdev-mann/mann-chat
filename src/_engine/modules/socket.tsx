import * as React from 'react'
import __socket from '../modules/socket_connector'
import { SOCKET_REQUEST, SOCKET_RESPONSE, SOCKET_UPDATE } from '../../constants/'
// import config from '../../config/app'
import store from '../../store/'

type socket_stack_element = {
    id: string | number;
    method: "get" | "post";
};
// const replicate_actions_to_ignore_array = ["SUBSCRIBE_SOCKET", "UNSUBSCRIBE_SOCKET"];

export let socket_stack: socket_stack_element[] = [];
// let req_id = 0;
var token: string;

const socket = {
    req_id: 0,

    emit: (data?: any) => {
        return new Promise((resolve, reject) => {
            // store.dispatch({ type: SOCKET_REQUEST, id: socket.req_id, method: 'emit', params: { ...data } });
            __socket.emit('get', { ...data, id: socket.req_id++ }, (response: any) => {
                store.dispatch({ type: SOCKET_RESPONSE, id: response.id, response, api: response.api, success: response.success, reason: response.reason, logic: response.logic, sql: response.sql, timing: response.timing, source: response.source });
                if (!response.success) {
                    reject(`${data.cmd} failed`);
                } else {
                    resolve(response);
                }
            });
        });
    },

    get: (data: any) => {
        return new Promise((resolve, reject) => {
            __socket.emit('subscribe', { ...data, id: socket.req_id++ }, (response: any) => {
                response.socket_received_time = performance.now()
                console.warn('response:', response);
                // if(response.data && Array.isArray(response.data)){ console.log(response.data[0], response.data.length) }
                store.dispatch({ type: SOCKET_RESPONSE, id: response.id, response, api: response.api, success: response.success, reason: response.reason, logic: response.logic, sql: response.sql, timing: response.timing, source: response.source });
                if (!response.success) {
                    reject(`${data.cmd} failed`);
                } else {
                    console.log(`resolving ${data.cmd}`);
                    resolve(response);
                }
            });
        });
    },
    proxy: (data: any) => {
        return new Promise((resolve, reject) => {
            // console.warn(data, token);
            if (!data.params) { data.params = {}; }
            if (!data.params.token && token) { console.log('token', token); data.params.token = token; }
            console.log('sending proxy_command', data);
            store.dispatch({ type: SOCKET_REQUEST, id: socket.req_id, method: 'proxy', params: { ...data } });
            __socket.emit('proxy', { ...data, id: socket.req_id++ }, (response: any) => {
                store.dispatch({ type: SOCKET_RESPONSE, id: response.id, response, api: response.api, success: response.success, reason: response.reason, logic: response.logic, sql: response.sql, timing: response.timing, source: response.source });
                // console.log('socket object data', data);
                // console.log('socket object response', response);
                if (!response.success) {
                    reject(`${data.cmd} failed`)
                } else {
                    resolve(response)
                }
            });
        });
    },
    post: (data: any) => {
        // console.log('calling post', data);
        return new Promise((resolve, reject) => {
            if (!data.token && token) { data.token = token; }
            store.dispatch({ type: SOCKET_REQUEST, id: socket.req_id, method: 'post', params: { ...data } })
            __socket.emit('post', { ...data, id: socket.req_id++ }, (response: any) => {
                console.log('post response', response)
                response.data = response.params
                store.dispatch({ type: SOCKET_RESPONSE, id: response.id, response, api: response.api, success: response.success, reason: response.reason, logic: response.logic, sql: response.sql, timing: response.timing, source: response.source });
                // store.dispatch({ type: SOCKET_UPDATE, payload: (response.data ? response.data.payload : null), req_id: response.id, id: response.id });
                
                // send SOCKET UPDATE without socket_devtools (prod mode)
                store.dispatch({ type: SOCKET_UPDATE, payload: (response.data ? response.data.payload : null), req_id: response.id, id: response.id })

                // console.warn('response', response);
                if (!response.success) {
                    reject(`${data.cmd} failed`)
                } else {
                    console.log(response)
                    resolve(response)
                }
            });
        });
    },
};
export default socket

export function withSocket<P>(Comp: React.ComponentClass<P> | React.StatelessComponent<P>) {
    return class extends React.Component<any>{
        render(): any{
            const props: any = { ...this.props, socket }
            return <Comp {...props} />
        }
    }
}
