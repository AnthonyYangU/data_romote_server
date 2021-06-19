// const deviceInfo = require('../mongo/deviceInfo')

const { creatData, FindAll, FindByDeviceId, deleteData, updateData, FindById } = require('../mongo/iotData')

module.exports = {
    findDataByDeviceId: async (ctx, next) => {
        let requestData = ctx.request.body.deviceId;
        // console.log(requestData);
        ctx.response.body = {
            status: 0,
            data: await FindByDeviceId(requestData)
        }
    },

}