const { creatData, FindAll, FindByDeviceId, deleteData, deleteAll, updateData, FindById, updateByDeviceId } = require('../mongo/deviceInfo')
const JSON_MIME = 'application/json'

module.exports = {
    equipRegister: async (ctx, next) => {
        let requestData = ctx.request.body;

        // console.log(requestData.ruleForm);
        ctx.response.body = {
            status: await updateByDeviceId(requestData.ruleForm)
        }
    },
    findEquip: async (ctx, next) => {
        ctx.response.body = {
            status: 0,
            data: await FindAll()
        }
    },
    findEquipById: async (ctx, next) => {
        let id = ctx.request.body._id;
        // console.log(id);
        ctx.response.body = {
            status: 0,
            data: await FindById(id)
        }
    },
    findEquipByDeviceId: async (ctx, next) => {
        let id = ctx.request.body.deviceId;
        // console.log(id);
        ctx.response.body = {
            status: 0,
            data: await FindByDeviceId(id)
        }
    },
    deleteEquip: async (ctx, next) => {
        let id = ctx.request.body.deviceId;
        // console.log(id)
        ctx.response.body = {
            // status1: await counterDelete(id),
            status2: await deleteData(id)
        }
    }
}