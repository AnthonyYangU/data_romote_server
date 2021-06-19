const { creatData, FindAll, FindByDeviceId, deleteData, deleteAll, updateData, FindById } = require('../mongo/iotData')

let createTestData = {
    // _id: '60cb5f3f3354071d50c1e5f5',
    deviceId: '0001',
    collectTime: '2021-06-08 01:59:14',
    mcuVoltage: 31,
    batteryVoltage: 2262,
    stress1: 613,
    pressure1: 508,
    pressure2: 509,
    current: 93,
    stress2: 1091
}

let updateTestDataString = JSON.stringify(createTestData)
let updateTestData = JSON.parse(updateTestDataString)
updateTestData._id = '60ccb20619671842b46e57e4'
updateTestData.deviceId = '0002'

//完成增删改查功能测试
FindByDeviceId('0001').then(data => {
    console.log(data)
})

FindAll().then(data => {
    console.log(data)
})

FindById('60ccb20619671842b46e57e4').then(data => {
    console.log(data)
})

// creatData(createTestData).then(data => {
//     console.log(data)
// })

// updateData(updateTestData).then(data => {
//     console.log(data)
// })

// deleteData('60cc7578c03f343dec0a7519').then(data => {
//     console.log(data)
// })

// deleteAll().then(data => {
//     console.log(data)
// })
