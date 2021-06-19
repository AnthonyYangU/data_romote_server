const { mongoose } = require('./config')

//user 模型

var UserSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    pwd: String
}, {
    versionKey: false,
    //自动创建时间与更新时间生成
    timestamps: true
})

const userModel = mongoose.model('myUser', UserSchema);


/**
 * 
 * @param {写入的json Object 或 json Object数组} json
 * @returns undefined
 */
async function creatData(json) {
    return await userModel.create(json, (err) => {
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
    return await userModel.deleteOne({ _id: _id }, err => {
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
    return await userModel.deleteMany({}, err => {
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
    return await userModel.updateOne({ _id: json._id }, json, (err) => {
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
    return await userModel.find(err => {
        if (err)
            console.log(err)
    })
}

async function FindByName(name) {
    return await userModel.find({ name: name }, err => {
        if (err)
            console.log(err)
    })
}
async function FindOneByName(name) {
    return await userModel.findOne({ name: name }, err => {
        if (err)
            console.log(err)
    })
}


async function FindById(_id) {
    return await userModel.find({ _id: _id }, err => {
        if (err)
            console.log(err)
    })
}

module.exports = {
    creatData: creatData,
    deleteData: deleteData,
    deleteAll: deleteAll,
    updateData: updateData,
    FindAll: FindAll,
    FindByName: FindByName,
    FindById: FindById,
    FindOneByName: FindOneByName
}