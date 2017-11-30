var express = require('express');
var router = express.Router();
var db = require('../database/db')

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
  console.log(req.body)

  res.json({
    status: 0000,
    data: { msg:'登陆成功' }
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
    ownerName:testData.ownerName,
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
