const Service = require('../libs/Service')

module.exports = class ActivityService extends Service {
    async list(data) {
        return this.packege({list: [], tatal: 0}, true, '成功')
    }

    async delete(data) {
        return this.packege({}, true, '成功')
    }

    async query(data) {
        return this.packege({}, true, '成功')
    }

    async add(data) {
        return this.packege({}, true, '成功')
    }

    async update(data) {
        return this.packege({}, true, '成功')
    }
}