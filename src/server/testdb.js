var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var db = mongoose.connect('mongodb://localhost/testsystem')

mongoose.set('debug', true)

db.connection.on('error', function (error) {
    console.log('数据库链接失败:' + error)
})
db.connection.on('open', function () {
    console.log('数据库链接成功')
})

var Schema = mongoose.Schema
var users = new Schema({
    id: String,
    password: String,
    date: Date
})

var user = mongoose.model('users',users)
// user.find({},function(err,doc){
//     console.log(doc)
// })

// var updateUser = mongoose.model('users')
// updateUser.update({ id: 'testtest' }, { id: 'test' }, function () {
//     console.log('update done')
// })

// var p1 = new user({
//     id:'test1',
//     password:'456456'
// })
// p1.save()
// user.update({id:'test1'},{id:'updatetest',password:'123123'},function(err){
//     console.log(err)
// })
user.remove({ id:'test1'},function(err,doc){

})