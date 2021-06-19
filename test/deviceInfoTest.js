const { creatData, FindAll, FindByDeviceId, deleteData, deleteAll, updateData, FindById } = require('../mongo/deviceInfo')

let createTestData = {
    deviceId: '0001',
    locationInfo: '天津西站地铁',
}

let updateTestDataString = JSON.stringify(createTestData)
let updateTestData = JSON.parse(updateTestDataString)
updateTestData._id = '60ccb76c5645c04e90075d4b'
updateTestData.locationInfo = '天津南站地铁'

//完成增删改查功能测试
FindByDeviceId('0001').then(data => {
    console.log(data)
})

// FindAll().then(data => {
//     console.log(data)
// })

// creatData(createTestData).then(data => {
//     console.log(data)
// })

// updateData(updateTestData).then(data => {
//     console.log(data)
// })
// FindById('60ccb76c5645c04e90075d4b').then(data => {
//     console.log(data)
// })

// deleteData('60cc7578c03f343dec0a7519').then(data => {
//     console.log(data)
// })

// deleteAll().then(data => {
//     console.log(data)
// })
