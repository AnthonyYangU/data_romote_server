const net = require('net');
const TCP_PORT = "9000"
const TIMEOUT = 1000;//tcp客户端超过6秒没发数据判为超时并断开连接
const { transComplete } = require('./utils/dataTrans')

// const translate = require('./trans.js');
// const { createData } = require('./mongodb.js');
// var tcpClient = null;//tcp客户端

const tcpServer = net.createServer((socket) => {

    socket.receivedDataArray = []
    //connect
    let addr = socket.address().address + ':' + socket.address().port;

    console.log(addr, " connect.");

    socket.addr = addr;

    socket.on("data", data => {
        //生产环境中实际使用的
        let rd = data.toString('Hex');

        let env = process.env.NODE_ENV || 'production';
        console.log('env:', env)

        //用于测试
        if (env == 'develop') {
            rd = data.toString()
            let rdArray = rd.split('\r\n')
            rdArray.pop()
            console.log(rdArray)
            for (let i = 0; i < rdArray.length; i++) {
                socket.receivedDataArray.push(rdArray[i]);
            }
        } else {
            //用于生产环境
            console.log('received data:', rd)
            socket.receivedDataArray.push(rd)
        }
    });

    // close
    socket.on('close', () => {
        socket.write("received");
        console.log(addr, "close");
    });

    socket.on('error', (err) => {
        console.log("error", err);
    });

    socket.setTimeout(TIMEOUT);
    // 超过一定时间 没接收到数据，就主动断开连接。
    socket.on('timeout', () => {
        console.log(socket.addr, "received: ", socket.receivedDataArray)
        transComplete(socket.receivedDataArray)
        console.log(socket.addr, 'socket timeout');
        socket.end();
    });
});

tcpServer.on("error", (err) => {
    console.log(err);
});

tcpServer.listen({ port: TCP_PORT, host: '0.0.0.0' }, () => {
    console.log('tcp server running on', tcpServer.address())
});

function description() {
    console.log("")
}
module.exports = {
    tcpServer,
    description
}
