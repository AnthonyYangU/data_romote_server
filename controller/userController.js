// const deviceInfo = require('../mongo/deviceInfo')

const { creatData, FindAll, deleteData, deleteAll, updateData, FindById, FindByName, FindOneByName } = require('../mongo/user')

module.exports = {
    register: async (ctx, next) => {
        let userInfo = {};
        userInfo.name = ctx.request.body.userName;
        userInfo.pwd = ctx.request.body.userPwd;
        creatData(userInfo);
        ctx.response.body = {
            status: 0,
        }
    },
    userfind: async (ctx, next) => {
        let userName = ctx.request.query.userName;

        console.log(userName)
        ctx.response.body = {
            status: ((await FindByName(userName)).length == 0 ? 0 : 1)
        }
        // let userName = {userName:ctx.request.body}
    },
    login: async (ctx, next) => {
        // console.log(ctx.request.body)
        let userInfo = {
            name: '',
            pwd: ''
        };
        userInfo.name = ctx.request.body.userName;
        userInfo.pwd = ctx.request.body.userPwd;
        // console.log('userInfo', userInfo)
        ctx.response.body = {
            status: ((await FindOneByName(userInfo.name)).pwd == userInfo.pwd ? 0 : 1)
        }
    },
}