var methods = {
    findUser:function (userName,userPass,dbModel) {
        dbModel.find({id:userName,passWord:userPass},function(err,doc){
            if(err){
                console.log(err)
            }else if(doc){
                return doc
            }
        })
    }
}

module.exports = methods