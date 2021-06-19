const { Bytes2HexString, HexString2Data, Hexstring2btye } = require('./utils/hexUtil')
// const { md5Check, md5Gene } = require('./utils/md5Ana')
const { checkOnePackage, transComplete, headTrans, trans, headMessageTrans } = require('./utils/dataTrans')
// const {}
let headData = "5a5b0001"
let tileData = "6162"

let headArray = Hexstring2btye("00170015002200300030")

let headString = Bytes2HexString(headArray)


//测试数据生成
// let testDataArray = []
// let testData = ""
// for (let i = 0; i < 5; i++) {

//     if (i == 0) {
//         // testData = headData + headString + dataPackage(100) + md5Gene(headString + dataPackage(100)) + tileData

//     } else {
//         testData = headData + dataPackage(101) + md5Gene(dataPackage(101)) + tileData
//     }

//     testDataArray.push(testData)
// }

function dataPackage(num) {
    let dataPackageArray = [11, 12, 12, 14, 24, 21, 22, 12, 14, 15]
    let hexString = Bytes2HexString(dataPackageArray)
    let result = ""
    for (let i = 0; i < num; i++) {
        result = result + hexString
    }
    return result
}

let test0 = '5a5b00010001003b000e001f08d6025d022002220fff04610265021402170fff04430260020b020d0fff042d025f020102020fff0404026b01fd01fd0fff0479025e01fc01fd0fff0434026501fd01fd0fff03df025c01fc01fd0fff03f2025401fc01fc0fff041e025001fc01fd0fff0409025701fd01fd0fff03d1024601fd01fd0fff0394024a01fc01fd0fff03ad026401fd01fc0fff045e026601fc01fd0fff0492027701fc01fc0fff0490025601fc01fc0fff0401025801fd01fc0fff03de025f01fc01fc0fff03e9026401fd01fc0fff0450025f01fc01fc0fff043a025d01fc01fd0fff042c025d01fd01fc0fff0421026b01fd01fc0ff7047e028401fd01fc0fff04f7026d01fc01fd0fff045d025901fc01fc03700419026201fd01fd0770046f025c01fc01fc003003f0026601fd01fc00300443025401fd01fc002f03fd025e01fc01fd003103d7025701fc01fd002b03c3026c01fc01fd0028046d026a01fc01fd0029046e026b01fe01fc00270451025a01fc01fb00280406026001fc01fc0029042b027301fc01fd002b0479025801fd01fc002d040a025c01fc01fc00310439025601fc01fd00350418026d01fc01fd003904ba026001fc01fc003d041c025c01fc01fc004003f0024f01fc01fc00400408025f01fd01fb003e047f026f01fc01fc003b04ad026e01fd01fc003904a0026601fc01fc00360449026401fc01fd0035045a027401fc01fc0033046e024d01fc01fc003003b9025501fc01fc002f03cb025301fc01fc002e03c0025601fc01fc002c03ea027001fc01fc002c0450024b01fc01fc002b03eb026101fc01fd002a0415024e01fc01fc002803ec024b01fc01fc002703cb026401fc01fc00260413025101fc01fc002603de026c01fd01fc00270432026601fd01fc002a047a025f01fc01fc002c048d026301fd01fd0033041c026d01fd01fc00330483026a01fc01fd0039046d025901fc01fd003f03cc026201fc01fc004303cb025901fc01fc004603cd026801fc01fc0046048b028701fc01fc004504d8027201fc01fc00430494025f01fd01fc004003f7026f01fd01fc003d047f025901fc01fc00390414026a01fc01fc00370460027301fc01fc003304a9026101fc01fd0031041a025b01fc01fd002f03e6025f01fc01fc002d0452026701fc01fc002c04a0026701fc01fc002c044e025801fc01fd002b03d3025601fc01fc00290423026001fd01fc0028041a024e01fc01fc0026040d027601fc01fc002704b0026801fc01fd003204b7026001fd01fc00370456027601fd01fc003d04bf025b01fd01fd00430441025d01fd01fc00480439026e01fc01fc004d04cd027201fd01fc005504ac025601fd01fd0057041a026501fc01fd005d04436162'
let test1 = '5a5b0001026101fc01fc005b03eb000200170021001f08d60282023d02450fff058202860236023e0fff04d7027c022e02370fff04c002700225022f0fff04b50270021a02260fff049602710210021b0fff04e90281020502100fff04fc029001fe02060fff051e027201fd01fd0fff0485027c01fd01fc0fff04bd026a01fc01fd0fff046f027001fc01fc0fff048c026201fc01fc0fff0422025f01fc01fd0fff0423026201fc01fc0fff042c026901fc01fc0fff0458025c01fc01fc0ec503d3026001fc01fd004603f6025d01fc01fd00350401026f01fc01fc003504c2027901fd01fc003704e1025e01fc01fc0039045e025f01fd01fd081a0450028501fc01fd0fff0527028b01fc01fd0fff052d026601fd01fc0fff0465028701fd01fc0fff054e028401fc01fc0fff050a026901fd01fc0fff0489026b01fd01fc0fff048e028801fc01fc0ee8051b026301fc01fc0081043c026601fc01fc0fff044b026e01fc01fc0fff044b025701fc01fd0fff041f025f01fd01fb0fff0460026401fc01fc0fff0459026301fd01fd01ab046a026901fc01fd0040044b028d01fd01fc0039050d027501fd01fc0037050a027901fc01fc003304f3027c01fc01fc003204bb027901fd01fb003104ff028201fc01fc003004ec028b01fc01fc002f051b027301fd01fc002e04b4026c01fc01fd002d04c3027d01fd01fc002c04ff028301fc01fc002a0507027401fe01fc002a04ca028001fc01fd002704eb026801fd01fd002604ae026901fc01fc00270498027401fd01fc002804a7027801fd01fd002a051a028501fd01fc002e0511028401fc01fc003304ff029101fc01fc0038055f028501fc01fc003c054e028101fd01fc004304dc027101fc01fd004204cb026e01fc01fd004404c3027701fd01fc00420492028001fc01fd00400506026b01fd01fc003e04a4027001fd01fc003b04a4026801fd01fd00380491025501fc01fd00350452027301fd01fc003304eb027401fd01fd003104a8027501fc01fc002f04d9029601fd01fc002e0544027c01fc01fc002d04fb029a01fd01fd002c055a027c01fc01fc002c04ef027101fc01fc002a04d5026d01fc01fc002804a3026c01fc01fc0027047f028401fc01fc002704f6028a01fd01fd0028050f026e01fd01fc002b04ac026b01fc01fc002f04a4026401fc01fc00330471026b01fc01fc0039049b027701fd01fc003f04db028b01fd01fc00420517027501fc01fc00440469025e01fc01fc00420459025c01fc01fc00410419026a01fc01fc003e0483026201fc01fc003b0483026901fc01fc0038047e027901fc01fc003504a1027f01fd01fd003204cc027201fc01fc003004d0026a01fc01fc002e0461026b01fc01fc002d04736162'
let test2 = '5a5b0001028001fd01fc002c0502026e01fc01fc002c047b000200180009001f08d6026002030202002b04a4026b01fe01fd00290446026101fb01fc0028043c028401fc01fb0027052f028d01fb01fb00280554027001fb01fc002b047d026101fb01fb00310476026701fb01fa00370475027201fc01fb003d0480027501fb01fb004004bc027c01fb01fb004204ac026501fb01fb00400442027b01fb01fb003c0518027a01fb01fa003904b6027701fb01fb003604a9026d01fc01fb00320491026801fa01fb0036047a027101fb01fb002e047e025f01fb01fa002d043f026501fb01fb002d047c026901fb01fb002b0465027401fa01fb002e0480026601fb01fb00280462026c01fb01fa0028045a026001fc01fb00280464026e01fb01fb002e047c026a01fb01fb0032047f029501fb01fb0038053a028301fb01fb003f04b9026c01fb01fb0041046f026301fb01fb0043044a026901fb01fb0042049d027501fc01fb003e04a6028201fb01fa003c04a0025a01fc01fb0039040b026601fc01fb0036041a026601fd01f900320431025d01fb01fa002f042c026101fb01fb002d0447025e01fb01fc002c043c026c01fb01fb002c046a025c01fa01fa0029041e026a01fa01fb0028044b026201fc01f90029043a025f01f901fc002e041a026b01fb01fa002f0495026d01fb01fa0035049a027201fa01fb00390497026b01fb01fb003f0483026a01fb01fa00420473025b01fc01fa00410436026b01fb01fb003e046c026c01fb01fb003b045f026901fb01fb0038049c028a01fb01fa00360526025801fc01f9003203f3026201fc01fa002d03fd026e01fa01fb002e049f026301fa01fb002c044d026d01fb01fb002a04aa026001fb01fb00290467027401fd01f9002a04e6027401fa01fb002704bd026801fa01fb002a0465026301fd01fa002f049e028301fb01fc003404f7026b01fa01fc003b048e027201fa01fb004104d9026f01fb01fb0043049d025e01fb01f900440482025e01fb01fc003e0428025c01fa01fb003b0447026701fb01fb0038041f026101fc01fb00340444026d01fb01fb0032044d025c01fb01fb00300416026001fb01fa002f0453025d01fb01fa002e045a025501fb01fa002d041d027401fb01fc002804ba025d01fb01fa002a042d025c01fc01fb002a0437025a01fb01fa002c0431026001fc01fa0031040b025301fb01fa00380409026601fb01fa003e0483026601fb01fa0041045a025801fb01fb00440437025001f901fd004203e8025e01fc01fb003d0401026801fb01fb003b046a027901fb01fc003704d4026001fb01fb00330403026401fb01fa0031046e026301fc01fa00300463026b01fc01fa002e045a026701fb01fb002d047b6162'
let test4 = '5a5b0001025301fc01fa002c0429027401fa01fb002a0498028a01fb01fb0027050f6162'
let time0 = HexString2Data(test0.substring(8, 28))
let time1 = HexString2Data(test1.substring(8, 28))
let time2 = HexString2Data(test2.substring(8, 28))

console.log(test0.substring(8, 28))
console.log(time0)
console.log(time1)
console.log(time2)
let headMessage = headMessageTrans(test0)
headTrans(test0, headMessage)

//1006字节 101行 10字节每行数据


// console.log(test.length)
// console.log("origin data length is", (headString + dataPackage(100)).length)

// console.log(checkOnePackage(testDataArray[0]))

// console.log(transComplete(testDataArray))

// module.exports = testDataArray