const { mongoose } = require('./config')

//user 模型

var deviceSchema = mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    locationInfo: {
        type: String,
        required: true
    },
    correctionK: {
        type: String,
    },
    correctionB: {
        type: String,
    },
    status: {
        //已经启动 或者 未启动 
        type: String,
        default: 'not'
    }
}, {
    versionKey: false,
    //自动创建时间与更新时间生成
    timestamps: true
})

const deviceInfo = mongoose.model('deviceInfo', deviceSchema);


/**
 * 
 * @param {写入的json Object 或 json Object数组} json
 * @returns undefined
 */
async function creatData(json) {
    return await deviceInfo.create(json, (err) => {
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
    return await deviceInfo.deleteOne({ _id: _id }, err => {
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
    return await deviceInfo.deleteMany({}, err => {
        if (err)
            console.error(err)
    })
}


/**
 * 写入的json Object,必须包含_id,禁止修改deviceId
 * @param {} json
 * @returns 
 */
async function updateData(json) {
    return await deviceInfo.updateOne({ _id: json._id }, json, { upsert: true }, (err) => {
        if (err) {
            console.error(err)
        }
    })
}
async function updateByDeviceId(json) {
    return await deviceInfo.updateOne({ deviceId: json.deviceId }, json, { upsert: true }, (err) => {
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
    return await deviceInfo.find(err => {
        if (err)
            console.log(err)
    })
}

async function FindByDeviceId(deviceId) {
    return await deviceInfo.find({ deviceId: deviceId }, err => {
        if (err)
            console.log(err)
    })
}

async function FindById(_id) {
    return await deviceInfo.find({ _id: _id }, err => {
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