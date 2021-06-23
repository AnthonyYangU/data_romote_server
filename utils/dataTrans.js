// const { md5Check, md5Gene } = require('./md5Ana')
const { HexString2Data, Hexstring2btye } = require('./hexUtil')
const { getFormatDate, getBeforeDate, getFullFormatDate } = require('./dateUtil')
const deviceInfo = require('../mongo/deviceInfo')
const NewData = require('../mongo/newData')
const iotData = require('../mongo/iotData')
// function checkOnePackage(str) {
//     let headId = str.substring(0, 4)
//     let deviceId = str.substring(4, 8)
//     console.log("headId is", headId)
//     console.log("deviceId is", deviceId)
//     let dataPackage = str.substring(8, 101 * 20 + 8);
//     // console.log("dataPackage is", dataPackage)
//     let md5Data = str.substring(2028, 2060)
//     console.log("md5Data is", md5Data)
//     return md5Check(dataPackage, md5Data)
// }

//解析包数据
function trans(dataPackage, headMessage) {
    // console.log(dataPackage)
    //所有数据的集合
    let dataArray = []

    for (let index = 0; index < dataPackage.length; index++) {
        if (index % 20 === 0) {
            let data = dataPackage.substring(index, index + 20)
            //2字节转化为10进制数
            let rowDataArray = HexString2Data(data)

            let rowData = {
                // receiveTime: '',
                deviceId: '',
                locationInfo: '',
                collectTime: "",
                mcuVoltage: "",
                batteryVoltage: "",
                stress1: "",
                pressure1: "",
                pressure2: "",
                current: "",
                stress2: ""
            }

            rowData.deviceId = headMessage.deviceId
            rowData.locationInfo = headMessage.locationInfo
            rowData.collectTime = headMessage.time
            rowData.mcuVoltage = headMessage.mcuVoltage
            rowData.batteryVoltage = headMessage.batteryVoltage
            rowData.stress1 = rowDataArray[0]
            rowData.pressure1 = rowDataArray[1]
            rowData.pressure2 = rowDataArray[2]
            rowData.current = rowDataArray[3]
            rowData.stress2 = rowDataArray[4]
            dataArray.push(rowData)
        }
    }
    dataArray.pop()
    return dataArray;
}

//解析单个csv文件的数据,str数组长度应为5
function transComplete(str) {

    //获取时间戳、mcu电压与电池电压
    let dateString = getFormatDate()
    let headMessage = {
        deviceId: '',
        locationInfo: '',
        time: "",
        mcuVoltage: "",
        batteryVoltage: ""
    }
    //获取头数据
    let headDataArray = HexString2Data(str.substring(8, 28));
    headMessage.deviceId = str.substring(4, 8)

    deviceInfo.FindByDeviceId(headMessage.deviceId).then(data => {
        headMessage.locationInfo = data[0].locationInfo
        headMessage.time = dateString + " " + headDataArray[0] + ":" + headDataArray[1] + ":" + headDataArray[2]
        headMessage.mcuVoltage = headDataArray[3] / 10
        headMessage.batteryVoltage = parseFloat((headDataArray[4] / 2048 * headMessage.mcuVoltage).toFixed(2))
        console.log("package head data", headMessage)
        //所有数据的集合
        // let CompleteDataArray = []

        let dataPackage = ""


        dataPackage = str.substring(28, str.length - 4)

        let CompleteDataArray = trans(dataPackage, headMessage)



        // for (let index = 0; index < strArray.length; index++) {
        //     if (index == 0) {
        //         dataPackage = strArray[index].substring(8 + 20, 2028);
        //     } else {
        //         dataPackage = strArray[index].substring(8, 2028)
        //     }
        //     // console.log('index', index)

        //     let analyseDataArray = trans(dataPackage, headMessage)

        //     CompleteDataArray.push(...analyseDataArray)
        // }

        // console.log('CompleteDataArray', CompleteDataArray)

        let newData = CompleteDataArray[CompleteDataArray.length - 1]
        //写入数据库之中
        NewData.updateByDeviceId(newData)
        console.log("data:", CompleteDataArray)
        iotData.creatData(CompleteDataArray)
        console.log('newData:', newData)
    })
}

//解析包含头消息的包数据
function headMessageTrans(headString) {
    //获取时间戳、mcu电压与电池电压
    let dateString = getBeforeDate()
    let headMessage = {
        // receiveTime: '',
        time: "",
        mcuVoltage: "",
        batteryVoltage: ""
    }
    //获取头数据
    let headDataArray = HexString2Data(headString.substring(8, 28));
    // console.log(headDataArray)
    let hour = headDataArray[0], minute = headDataArray[1], second = headDataArray[2]

    if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    headMessage.time = dateString + " " + hour + ":" + minute + ":" + second

    headMessage.mcuVoltage = headDataArray[3]
    headMessage.batteryVoltage = headDataArray[4]
    // headMessage.receiveTime = getFullFormatDate()
    console.log("package head data", headMessage)

    return headMessage
}

function headTrans(bodyString, headMessage) {
    //解析包含头数据的包数据
    let dataArray = trans(bodyString.substring(28, bodyString.length - 4), headMessage)
    console.log(dataArray)
    return dataArray
}
function bodyTrans(bodyString, headMessage) {
    //解析不包含头数据的包数据
    let dataArray = trans(headString.substring(20, bodyString.length - 4), headMessage)
    console.log(dataArray)
    return dataArray

}



module.exports = {
    // checkOnePackage,
    transComplete,
    headMessageTrans,
    headTrans,
    bodyTrans,
    trans
}
