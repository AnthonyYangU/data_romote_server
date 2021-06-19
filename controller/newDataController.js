// const deviceInfo = require('../mongo/deviceInfo')

const { creatData, FindAll, FindByDeviceId, deleteData, deleteAll, updateData, FindById } = require('../mongo/newData')

module.exports = {
    findAllNewData: async (ctx, next) => {
        ctx.response.body = {
            status: 0,
            data: await FindAll()
        }
    },

}