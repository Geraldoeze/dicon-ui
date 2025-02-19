/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AxiosInstance } from 'axios'

async function handler<T, R = any>(
    endpoint: string,
    req: R,
    method: 'post' | 'get' | 'patch' | 'delete' | 'put',
    client: AxiosInstance,
    err?: any
): Promise<T>{
    const config = {
        url: endpoint,
        method: method,
        ...(method === 'get' ? {params: req} : {data: req})
    }
    try{
        const response = await client.request<T>(config)
        return response.data as T
    }catch(error: unknown){
        throw new Error(err)
    }
}

export {handler}