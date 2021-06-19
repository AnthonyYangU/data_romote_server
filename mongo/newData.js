const { mongoose } = require('./config')

//newData 模型

var NewDataSchema = mongoose.Schema({
    deviceId: {
        type: String,
        index: true,
        unique: true
    },
    locationInfo: {
        type: String,
        required: true
    },
    collectTime: String,
    mcuVoltage: String,
    batteryVoltage: String,
    stress1: String,
    pressure1: String,
    pressure2: String,
    current: String,
    stress2: String,
    status: {
        //设备状态，0表示设备正常，1表示设备内部故障，2表示设备网络故障
        type: String,
        default: '0'
    }
}, {
    versionKey: false,
    //自动创建时间与更新时间生成
    timestamps: true
})

const NewDataModel = mongoose.model('NewData', NewDataSchema);


/**
 * 
 * @param {写入的json Object 或 json Object数组} json
 * @returns undefined
 */
async function creatData(json) {
    return await NewDataModel.create(json, (err) => {
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
    return await NewDataModel.deleteOne({ _id: _id }, err => {
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
    return await NewDataModel.deleteMany({}, err => {
        if (err)
            console.error(err)
    })
}


/**
 * 写入的json Object,必须包含_id
 * @param {} json
 * @returns 
 */
async function updateData(json) {
    return await NewDataModel.updateOne({ _id: json._id }, json, (err) => {
        if (err) {
            console.error(err)
        }
    })
}

async function updateByDeviceId(json) {
    return await NewDataModel.updateOne({ deviceId: json.deviceId }, json, { upsert: true }, (err) => {
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
    return await NewDataModel.find(err => {
        if (err)
            console.log(err)
    })
}

async function FindByDeviceId(deviceId) {
    return await NewDataModel.find({ deviceId: deviceId }, err => {
        if (err)
            console.log(err)
    })
}

async function FindById(_id) {
    return await NewDataModel.find({ _id: _id }, err => {
        if (err)
            console.log(err)
    })
}


module.exports = {
    creatData: creatData,
    deleteData: deleteData,
    deleteAll: deleteAll,
    updateData: updateData,
    updateByDeviceId: updateByDeviceId,
    FindAll: FindAll,
    FindByDeviceId: FindByDeviceId,
    FindById: FindById
}