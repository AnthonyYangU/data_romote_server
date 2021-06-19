const { creatData, FindAll, FindByName, deleteData, deleteAll, updateData, FindById, FindOneByName } = require('../mongo/user')

let createTestData = {
    name: 'anthony',
    pwd: 'q95519000a',
}

let updateTestDataString = JSON.stringify(createTestData)
let updateTestData = JSON.parse(updateTestDataString)
updateTestData._id = '60ccb89b23d4040c444df4e6'
updateTestData.name = 'tony'

//完成增删改查功能测试
// FindByDeviceId('0001').then(data => {
//     console.log(data)
// })

// FindAll().then(data => {
//     console.log(data)
// })

FindOneByName('tonyt').then(data => {
    console.log(data)
    // console.log(null.createTestData)
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
