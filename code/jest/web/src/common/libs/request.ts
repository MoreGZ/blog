import axios from 'axios'
import {Modal, message } from 'antd'
import config from '../config/index'

export interface Response {
    message: string,
    code: number,
    success: boolean,
    data: {}
}

export default class Request {
    /**
     * Requests a URL, returning a promise.
     *
     * @param  {string} url       The URL we want to request
     * @param  {Object} data      The data send to the server
     * @param  {object} [option]  The options we want to pass to "fetch"
     * @return {object}           An object containing either "data" or "err"
     */
    static request( url='', params={} ): Promise<any> { 
        // 判断传进来的是不是object
        if(typeof params !== "object") params = {};
        let options: any = {
            baseURL: config.baseUrl,
            url,
            method: 'get',
            withCredentials: true,
            timeout: 30000,
            headers: null,
            validateStatus: function (status: any) {
                return status >= 200 && status < 300; // 默认的
            },
            ...params
        }
        
        if(options.method == 'get' || options.method == 'GET') {
            options.params = options.data;
        }
    
        return axios(options).then((response) => {
            const { data: res } = response
        
            // 对失败请求做统一提示
            if(!this.checkSuccess(res)) {
                return Promise.reject(res);
            }
        
            return res;
        }, (error) => {
            // 对所有服务器错误做统一处理
            return Promise.reject(error);
        })
    }

    static $request( url='', params={} ): Promise<any> {
        return this.request(url, params).catch((res) => {
            // 对所有需要登录态的请求做统一拦截, 检查是否登录
            if(this.checkNoLogin(res)) {
                Modal.error({
                    title: '未登录',
                    content: '您还未登录哦，请先登录~',
                    onOk() {
                        return location.replace('/login')
                    },
                })
        
                return Promise.reject(res);
            }

            return Promise.reject(res);
        })
    }

    static checkNoLogin(res: Response) : boolean{
        return res.code === -1                
    }
    
    static checkSuccess(res: Response) : boolean {
        return res.code === 1
    }
    
}