import { Request } from '@common/index'

export class PageApi extends Request {
    static getPageConfig(data: any, params?: any) {
        return this.request( '/api/page/get_page_config', { 
            method: 'get',
            data,
            ...params 
        })
    }
}

export class GoodApi extends Request {
    static query(data: any, params?: any) {
        return this.$request( '/api/good/query', { 
            method: 'get',
            data,
            ...params 
        })
    } 
}