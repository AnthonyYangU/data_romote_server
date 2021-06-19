const { mongoose } = require('./config')

//iotData 模型
var IotSchema = mongoose.Schema({
    deviceId: {
        type: String,
        index: true
    },
    collectTime: String,
    mcuVoltage: String,
    batteryVoltage: String,
    stress1: String,
    pressure1: String,
    pressure2: String,
    current: String,
    stress2: String,
}, {
    versionKey: false,
    //自动创建时间与更新时间生成
    timestamps: true
})

const IotModel = mongoose.model('IotData', IotSchema);


/**
 * 
 * @param {写入的json Object 或 json Object数组} json 
 * @returns undefined
 */
async function creatData(json) {
    return await IotModel.create(json, (err) => {
        if (err) {
            console.error(err)
        }
    })
}

/**
 * 按照_id删除单个数据项
 * @param {String} _id 
 * @returns 
 */
async function deleteData(_id) {
    return await IotModel.deleteOne({ _id: _id }, err => {
        if (err)
            console.error(err)
    })
}

/**
 * 仅用于测试时，用于删除集合中所有数据
 * @param 
 * @returns 
 */
async function deleteAll() {
    return await IotModel.deleteMany({}, err => {
        if (err)
            console.error(err)
    })
}


/**
 * 
 * @param {写入的json字 Object,必须包含_id} json
 * @returns 
 */
async function updateData(json) {
    return await IotModel.updateOne({ _id: json._id }, json, (err) => {
        if (err) {
            console.error(err)
        }
    })
}
/**
 * 
 * @returns 查找所有数据信息
 */
async function FindAll() {
    return await IotModel.find(err => {
        if (err)
            console.log(err)
    })
}
/**
 * 如果为[]，表明设备不存在
 * @param {*} deviceId 
 * @returns 
 */
async function FindByDeviceId(deviceId) {
    return await IotModel.find({ deviceId: deviceId }, err => {
        if (err)
            console.log(err)
    })
}
async function FindById(_id) {
    return await IotModel.find({ _id: _id }, err => {
        if (err)
            console.log(err)
    })
}

module.exports = {
    creatData: creatData,
    deleteData: deleteData,
    deleteIot: deleteAll,
    updateData: updateData,
    FindAll: FindAll,
    FindByDeviceId: FindByDeviceId,
    FindById: FindById
}