var mongoose =require('mongoose')
mongoose.Promise = global.Promise
var db = mongoose.connect('mongodb://localhost/testsystem')

mongoose.set('debug',true)

db.connection.on('error',function (error) {
    console.log('数据库链接失败:'+error)
})
db.connection.on('open',function () {
    console.log('数据库链接成功')
})



var users = mongoose.model('users',{
    id:String,
    password:String,
    date:Date
})
var chooseTest = mongoose.model('chooseTest', {
    chooseTestQuestion: String,
    chooseTestOption: Array,
    chooseTestAnswer: String,
    date: Date

})
var blankTest = mongoose.model('blankTest', {
    blankTestQuestion: String,
    blankAnswer: String,
    date: Date

})
var oxTest = mongoose.model('oxTest', {
    oxTestQuestion: String,
    oxTestAnswer: String,
    date: Date

})
var qaTest = mongoose.model('qaTest', {
    qaTestQuestion: String,
    qaTestAnswer: String,
    date: Date

})
var testList = mongoose.model('testList',{
    chooseTest:Array,
    blankTest:Array,
    oxTest:Array,
    qaTest:Array,
    ownerName:String,
    testDate:Array
})

var usersAnswer = mongoose.model('usersAnswer',{
    chooseTest:Array,
    blankTest: Array,
    oxTest: Array,
    qaTest: Array,
    ownerName: String,
    answerDate:Date,
    for:String
})

var grade = mongoose.model('grade',{
    for: ObjectID,
    chooseTest:Array,
    blankTest:Array,
    oxTest:Array,
    qaTest:Array,
    answerDate:Array,
    totalGrade:String,
})
// usersAnswer.aggregate([{
//     $lookup: {
//         from: 'testLists',
//         localField: 'for',
//         foreignField: '_id',
//         as: 'inventoryDoc'
//     }
// }])

exports.users = users
exports.chooseTest = chooseTest
exports.blankTest = blankTest
exports.oxTest = oxTest
exports.qaTest = qaTest
exports.testList = testList
exports.usersAnswer = usersAnswer
