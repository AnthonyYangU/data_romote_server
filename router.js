const router = require('koa-router')();
const DeviceController = require('./controller/deviceController')
const NewDataController = require('./controller/newDataController')
const IotDataController = require('./controller/iotDataController')
const userController = require('./controller/userController')

// const multer = require('koa-multer')
// const uuidV1 = require('uuid/v1')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const fileFormat = (file.originalname).split('.')
//       cb(null, uuidV1()+'.'+fileFormat[fileFormat.length-1])
//     }
//   })

// var upload = multer({ storage: storage })
// const bodyParser = require('koa-body')();
// const bodyParser = require('koa-bodyparser');
module.exports = (app) => {
    // app.use(bodyParser());
    // router.get('/api',Controller.api);
    router.post('/api/register', userController.register);
    router.get('/api/userfind', userController.userfind);
    router.post('/api/login', userController.login);
    // router.get('/api/delete',Controller.delete);
    // // router.post('/api/upload',upload.single('file'),Controller.upload);
    // router.get('/api/detail',Controller.detail);
    // router.post('/api/dm',Controller.dm);

    router.get('/api/findAllNewData', NewDataController.findAllNewData);

    router.post('/api/equipRegister', DeviceController.equipRegister);
    router.get('/api/findEquip', DeviceController.findEquip);
    router.post('/api/findEquipById', DeviceController.findEquipById);
    router.post('/api/findEquipByDevice', DeviceController.findEquipByDeviceId);
    router.post('/api/deleteEquip', DeviceController.deleteEquip)

    router.post('/api/findDataByDeviceId', IotDataController.findDataByDeviceId)

    app.use(router.routes()).use(router.allowedMethods());
};


