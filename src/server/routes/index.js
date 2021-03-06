var express = require('express');
var router = express.Router();
var db = require('../database/db')
var methods = require('../public/methods')
var mongoose = require('mongoose')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/api',function(req,res,next){
  res.json({ 
    status: 0000, 
    data: { name: 'aaa', passwd: '123123'}
  })
})
router.post('/login', function (req, res, next) {
  if(req.cookies.userId){
    return  res.json({
      status:'0002',
      msg:'您已经登录,请勿重复登录'
    })
  }
  // var sess = req.session
  // var user = methods.findUser(req.body.loginId,req.body.loginPwd)
  
  // if(user){
  //   req.session.regenerate(function(err){
  //     if(err){
  //       return res.json({status:9999,msg:'登录失败'})
  //     }

  //     req.session.loginUser = user.name
  //     res.json({status:0000,msg:'登录成功'})
  //   })
  // }else{
  //   res.json({status:0001,msg:'账号或密码错误'})
  // }
  var user = db.users
  var userId = req.body.loginId
  var userPwd = req.body.loginPwd
  user.find({id:userId,password:userPwd},function(err,doc){
    if(err){
      console.log(err)
      res.json({
        status:'9999',
        msg:'异常错误'
      })
    }else if(doc.length==0){
      res.json({
        status:'0001',
        msg:'账号或密码错误'
      })
    }else{
      res.cookie('userId', userId, { maxAge:  1000 * 60 * 60 })
      res.cookie('userType',doc[0].userType,{maxAge:1000*60 *60})
      res.json({
        status:'0000',
        msg:'登录成功',
        userId:userId
      })
    }

    res.send()
  })
})

router.post('/register',function(req,res,next){
  var user = db.users
  var userId = req.body.registerId
  var userPwd = req.body.registerPwd
  user.find({id:userId},function(err,doc){
    if(err){
      console.log(err)
      res.json({
        status: '0001',
        msg: '异常错误',
      })

    }else if(doc.length != 0){
      console.log(doc)
      res.json({
        status:'0001',
        msg:'用户名已存在',
      })
      
    }else{
      user.create({
        id:userId,
        password:userPwd,
        date:Date.now()
      },function(err,doc){
        if(err){
          console.log(err)
        }else{
          res.json({
            msg:'用户名创建成功',
            status:'0000'
          })
        }
      })
    }
  })
})

router.post('/logout',function(req,res,next){
  res.clearCookie("userId","", { expires:new Date(0)})
  res.clearCookie("userType","", { expires: new Date(0)})
  return res.json({
    msg:'清除成功'
  })
})
router.post('/api/getUserList',function(req,res,next){
  var users = db.users
  users.find({userType:{$in:['1','2']}},{id:1,userType:1},function(err,doc){
    if(err){
      return res.json({
        msg:'系统异常',
        status:'9999'
      })
    }else{
      return res.json({
        status:'0000',
        msg:'查询成功',
        data:doc
      })
    }
  })
})
router.post('/api/setUserList',function(req,res,next){
  var users = db.users
  var usersList = JSON.parse(req.body.data)
  var promiseList = new Array()
  for (let i = 0; i < usersList.length; i++) {
    var p = new Promise(function (resolve, reject) {
      users.update({ "_id": mongoose.mongo.ObjectId(usersList[i]._id) },{userType:usersList[i].userType}, function (error, document) {
        if (error) {
          console.log(error)
        } else {
          // console.log(document)
          resolve()
        }
      })
    })
    promiseList.push(p)
  }
  Promise.all(promiseList).then(function () {
    return res.json({
      status: '0000',
      msg: '操作成功',
    })
  })
})
router.post('/api/updateTest',function(req,res,next){
  var testDetail = JSON.parse(req.body.data)
  db.testList.update({ "_id": mongoose.mongo.ObjectId(testDetail.testId)},{
    ownerName:testDetail.ownerName,
    testDate:testDetail.testDate,
    chooseTest:testDetail.chooseTest,
    blankTest:testDetail.blankTest,
    oxTest:testDetail.oxTest,
    qaTest:testDetail.qaTest
  },function(err,doc){
    if(err){
      return res.json({
        status:'9999',
        msg:'系统异常'
      })
    }else if(doc){
      return res.json({
        status:'0000',
        msg:'修改成功'
      })
    }
  })

})

router.post('/api/getJudgeList',function(req,res,next){
  var testId = req.body.testId
  var testList = new Array()
  var usersAnswer = db.usersAnswer
  usersAnswer.find({'for':testId},{ownerName:1,answerDate:1,isJudge:1,_id:1},function(err,doc){
    if(err){
      return res.json({
        status:'9999',
        msg:'系统异常'
      })
    }else if(doc){
      return res.json({
        status:'0000',
        msg:'操作成功',
        data:doc
      })
    }
  })
})
router.post('/api/judgeTest',function(req,res,next){
  var judgeData = JSON.parse(req.body.data)
  var grades = db.grade
  var usersAnswer = db.usersAnswer
  // grades.find({ 'for': mongoose.mongo.ObjectId(judgeData.answerId)},{isJudge:1},function(e,d){
  //   if(e){
  //     return res.json({
  //       status: '9999',
  //       msg: '系统错误'
  //     })
  //   }else{
  //     if(d.length>0 && d[0].isJudge){
  //       return res.json({
  //         status:'0001',
  //         msg:''
  //       })
  //     }
  //   }
  // })
  grades.update({'for':mongoose.mongo.ObjectId(judgeData.answerId)},{
    qaTest:judgeData.qaTest,
    isJudge:true
  },function(err,doc){
    if(err){
      return res.json({
        status:'9999',
        msg:'系统错误'
      })
    }else{
      usersAnswer.update({'_id':mongoose.mongo.ObjectId(judgeData.answerId)},{isJudge:true},function(error,doc){
        if(doc){
          return res.json({
            status: '0000',
            msg: '操作成功'
          })
        }
      })
    }
  })
})

router.post('/api/getjudgeDetail',function(req,res,next){
  var testId = req.body.testId
  var usersAnswer = db.usersAnswer
  var testList = db.testList
  var grades = db.grade
  usersAnswer.find({ '_id': mongoose.mongo.ObjectId(testId) }, function (err, doc) {
    if(err){
      return res.json({
        status: '9999',
        msg: '系统异常'
      })
    }else if(doc){
      testList.find({ '_id': mongoose.mongo.ObjectId(doc[0].for)},function(error,document){
        if(error){
          return res.json({
            status: '9999',
            msg: '系统异常'
          })
        }else if(document){
          var getData = document
          for (let i = 0; i < getData.length;i++){
            getData[i].answerId = doc[i]._id
            if(getData[i].chooseTest.length>0){
              for (let j = 0; j < getData[i].chooseTest.length; j++) {
                getData[i].chooseTest[j].studentAnswer = doc[i].chooseTest[j]
                if (doc[i].chooseTest[j] ==getData[i].chooseTest[j].chooseTestAnswer){
                  getData[i].chooseTest[j].isTrue = '1'
                }else{
                  getData[i].chooseTest[j].isTrue = '0'
                }

              }
            }
            if(getData[i].blankTest.length>0){
              for (let j = 0; j < getData[i].blankTest.length; j++) {
                getData[i].blankTest[j].studentAnswer = doc[i].blankTest[j]
                if (doc[i].blankTest[j] == getData[i].blankTest[j].blankTestAnswer) {
                  getData[i].blankTest[j].isTrue = '1'
                } else {
                  getData[i].blankTest[j].isTrue = '0'
                }
              }
            }
            if(getData[i].oxTest.length>0){
              for (let j = 0; j < getData[i].oxTest.length; j++) {
                getData[i].oxTest[j].studentAnswer = doc[i].oxTest[j]
                if (doc[i].oxTest[j] == getData[i].oxTest[j].oxTestAnswer) {
                  getData[i].oxTest[j].isTrue = '1'
                } else {
                  getData[i].oxTest[j].isTrue = '0'
                }
              }
            }
            if(getData[i].qaTest.length>0){
              for (let j = 0; j < getData[i].qaTest.length; j++) {
                getData[i].qaTest[j].studentAnswer = doc[i].qaTest[j]
              }
            }

            grades.find({'for':doc[i]._id},function(e,d){
              if(e){
                return res.json({
                  status: '9999',
                  msg: '系统异常'
                })
              }else if(d.length>0){
                return res.json({
                  status: '0001',
                  msg: '已存在',
                  data: getData
                })
              }else{
                var grade = new db.grade({
                  for: doc[i]._id,
                  chooseTest: getData[i].chooseTest,
                  blankTest: getData[i].blankTest,
                  oxTest: getData[i].oxTest,
                  qaTest: getData[i].qaTest,
                  answerDate: doc[i].answerDate,
                  isJudge:false
                })
                grade.save()

                return res.json({
                  status: '0000',
                  msg: '操作成功',
                  data: getData
                })
              }
            })
          }
        }
      })
    }
  })
})

router.post('/api/getMyTest',function(req,res,next){
  if(req.body.userId){
    var ownerName = req.body.userId
    var usersAnswer = db.usersAnswer
    var testList = db.testList
    var grade = db.grade
    var myTestList = new Array()
    usersAnswer.find({ ownerName: ownerName }, function (err, doc) {
      if (err) {
        return res.json({
          status: '9999',
          msg: '系统异常'
        })
      } else {
        var promiseList = new Array()
        for (let i = 0; i < doc.length; i++) {
          var p = new Promise(function (resolve, reject) {
            testList.find({ "_id": mongoose.mongo.ObjectId(doc[i].for) }, function (error, document) {
              if (error) {
                console.log(error)
              } else {
                // console.log(document)
                grade.find({"for":doc[i]._id},function(e,d){
                  var obj = {}
                  if(d.length!=0){
                    obj = d[0]
                  }

                  myTestList.push({
                    testQuestion: document[0],
                    testAnswer: doc[i],
                    grade:d[0]
                  })
                  resolve()
                })  
              }
            })
          })
          promiseList.push(p)
        }
        Promise.all(promiseList).then(function () {
          return res.json({
            status: '0000',
            msg: '操作成功',
            data: myTestList
          })
        })
      }
    })
  }else{
    return res.json({
      status: '1111',
      msg: '未登录'
    })
  }
})

router.post('/api/upLoadAnswer',function(req,res,next){
  var answer = JSON.parse(req.body.data)
  var userId = answer.userId
  console.log(answer)
  var userAnswer = new db.usersAnswer({
    chooseTest: answer.userChooseTestAnswer,
    blankTest: answer.userBlankTestAnswer,
    oxTest: answer.userOxTestAnswer,
    qaTest: answer.userQaTestAnswer,
    ownerName: answer.ownerName,
    answerDate: Date.now(),
    for:answer.for
  })

  userAnswer.save(function(err,doc){
    if(err){
      return res.json({
        status:'9999',
        msg:'系统异常'
      })
    }else{
      console.log(doc)
      return res.json({
        status:'0000',
        msg:'提交成功'
      })
    }
  })
})


router.post('/api/getTestList',function(req,res,next){
  var testList = db.testList
  testList.find({},{ownerName:1,testDate:1},function(err,result){
    if(err){
      console.log(err)
    }else{
      res.json({
        status:'0000',
        data: result,
        msg:'查询成功'
      })
    }
  })

})
router.post('/api/getTestDetail', function (req, res, next) {
  var testList = db.testList
  var testId = req.body.testId
  testList.find({_id:testId}, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.json({
        status: '0000',
        data: result,
        msg: '查询成功'
      })
    }
  })

})
router.post('/api/uploadTest',function(req,res,next){
  var users = db.users
  var testData = JSON.parse(req.body.data)
  var userId = testData.userId
  var chooseTest = new Array()
  var blankTest = new Array()
  var oxTest = new Array()
  var qaTest = new Array()
  console.log(testData)
  if (testData.chooseTest.chooseTestQuestion.length > 0 && testData.chooseTest.chooseTestAnswer.length > 0){
    for (let i = 0; i < testData.chooseTest.chooseTestQuestion.length; i++) {
      var chooseTestNew = new db.chooseTest({
        chooseTestQuestion: testData.chooseTest.chooseTestQuestion[i],
        chooseTestOption:testData.chooseTest.chooseTestOption[i],
        chooseTestAnswer: testData.chooseTest.chooseTestAnswer[i]
      })
      chooseTest.push({
        chooseTestQuestion: testData.chooseTest.chooseTestQuestion[i],
        chooseTestOption: testData.chooseTest.chooseTestOption[i],
        chooseTestAnswer: testData.chooseTest.chooseTestAnswer[i]
      })
      console.log(chooseTest)
      chooseTestNew.save()
    }
  }
  if (testData.oxTest.oxTestQuestion.length > 0 && testData.oxTest.oxTestAnswer.length > 0){
    for (let i = 0; i < testData.oxTest.oxTestQuestion.length;i++){
        var oxTestNew = new db.oxTest({
        oxTestQuestion: testData.oxTest.oxTestQuestion[i],
        oxTestAnswer: testData.oxTest.oxTestAnswer[i]
      })
      oxTest.push({
        oxTestQuestion: testData.oxTest.oxTestQuestion[i],
        oxTestAnswer: testData.oxTest.oxTestAnswer[i]
      })
      oxTestNew.save()
    }
  }
  if (testData.blankTest.blankTestQuestion.length > 0 && testData.blankTest.blankTestAnswer.length > 0) {
    for (let i = 0; i < testData.blankTest.blankTestQuestion.length; i++) {
      var blankTestNew = new db.blankTest({
        blankTestQuestion: testData.blankTest.blankTestQuestion[i],
        blankTestAnswer: testData.blankTest.blankTestAnswer[i]
      })
      blankTest.push({
        blankTestQuestion: testData.blankTest.blankTestQuestion[i],
        blankTestAnswer: testData.blankTest.blankTestAnswer[i]
      })
      blankTestNew.save()
    }
  }
  if (testData.qaTest.qaTestQuestion.length > 0 && testData.qaTest.qaTestAnswer.length > 0) {
    for (let i = 0; i < testData.qaTest.qaTestQuestion.length; i++) {
      var qaTestNew = new db.qaTest({
        qaTestQuestion: testData.qaTest.qaTestQuestion[i],
        qaTestAnswer: testData.qaTest.qaTestAnswer[i]
      })
      qaTest.push({
        qaTestQuestion: testData.qaTest.qaTestQuestion[i],
        qaTestAnswer: testData.qaTest.qaTestAnswer[i]
      })
      qaTestNew.save()
    }
  }

  var testItem = new db.testList({
    chooseTest:chooseTest,
    blankTest:blankTest,
    oxTest:oxTest,
    qaTest:qaTest,
    ownerName: userId,
    testDate:testData.testDate
  })
  testItem.save()


  res.json({
    status: 0000,
    data: {
      chooseTestNum:chooseTest.length,
      blankTestNum:blankTest.length,
      oxTestNum:oxTest.length,
      qaTestNum:qaTest.length
    },
    msg: '上传成功'
  })

  // testUser.save(function(err,res){
  //   console.log('fail:'+err)
  //   console.log('res:'+res)
  // })

})



module.exports = router;
