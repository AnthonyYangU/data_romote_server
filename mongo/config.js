var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Iot', {
    user: 'IotUser',
    pass: 'IotUser123',
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库连接成功')
})

module.exports = { mongoose }