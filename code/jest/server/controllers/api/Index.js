const BaseController = require('../../libs/BaseController')
const { saveFile } = require('../../libs/utils')
const path = require('path')

module.exports = class extends BaseController {
    async list() {
        const data = this.request.query;
        
        const resData = await this.service.index.list({
            ...data,
            page_index: +data.page_index,
            page_size: +data.page_size,
        })

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async delete() {
        const data = this.request.body;
        
        const resData = await this.service.index.delete(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async query() {
        const data = this.request.query;
        
        const resData = await this.service.index.query(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async add() {
        const data = this.request.body;
        
        const resData = await this.service.index.add(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async update() {
        const data = this.request.body;
        
        const resData = await this.service.index.update(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async uploadImg() {
        let file = this.request.files.file
        let uploadFilePath = path.resolve(__dirname, `../../statics/upload/img/${file.name}`)
        const saveFileRes = await saveFile(file, uploadFilePath, `/upload/img/${file.name}`)
        console.log(saveFileRes)
        this.send(...saveFileRes)
    }
}