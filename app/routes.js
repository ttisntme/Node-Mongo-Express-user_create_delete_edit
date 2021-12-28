const User = require("./model/user")

module.exports = function(app){

    // app.get('/', function (req, res) {
    //     res.send('hello world')
    // })
    var regExEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/;
    var regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;

    app.get('/user/getAll', function(req, res){
        User.find(function(err, users){  // see all in document users
            if(err)
                res.send(err)
            console.log(users)
            res.json(users)
        })
    })

    app.post("/user/create", async function(req, res){
        console.log(req.body)
        if(!req.body.email.match(regExEmail)) {
            console.log("########## Invalid Input Email ##########")
            res.json({message: "Email is invalid!"})
        }else if(await User.findOne({"email": req.body.email})) {
            console.log("########## Already Existed Email ##########")
            res.json({message: "Email has existed!"})
        }else if(!req.body.password.match(regPassword)) {
            console.log("########## Invalid Input Password ##########")
            res.json({message: "Password is invalid!"})
        }else {
            var newUser = new User(req.body)
            newUser.save(function(err, resuts){
                if(err) console.log("err ", err)
                console.log("Saved ", resuts)
                res.json({message: "User Created.", resuts})    
            })
        }
    })

    app.post("/user/edit", async function(req, res){
        console.log(req.body)
        var flag1 = 1;
        var flag2 = 1;
        var thisUser = await User.findOne({"email": req.body.email})
        if(thisUser == null) {
            console.log("########## None exist User ##########")
            res.json({message: "None exist User!"})
        } else{
            res.thisUser = thisUser
            if(req.body.newEmail != "") {
                if(req.body.newEmail.match(regExEmail)) {
                    res.thisUser.email = req.body.newEmail;
                }else {
                    console.log("########## Invalid Input new Email ##########")
                    res.json({message: "New Email is invalid!"})
                    flag1=0;
                }
            }
            if(req.body.password != "") {
                if(req.body.password.match(regPassword)) {
                    res.thisUser.password = req.body.password;
                }else {
                    console.log("########## Invalid Input new Password ##########")
                    res.json({message: "New Password is invalid!"})
                    flag2=0;
                }
            } 
            if(flag1 && flag2) {
                res.thisUser.save(function(err, resuts){
                    if(err) console.log("err ", err)
                    console.log("Saved ", resuts)
                    res.json(resuts)    
                })
            }
            
        }
    })

    app.delete("/user/delete", async function(req, res){
        console.log(req.body)
        var thisUser = await User.findOne({"email": req.body.email})
        res.thisUser = thisUser
        if(thisUser == null) {
            console.log("########## None exist User ##########")
            res.json({message: "None exist User!"})
        }else if(req.body.password != res.thisUser.password) {
            console.log("########## Wrong Password ##########")
            res.json({message: "Wrong Password!"})
        }else {
            res.thisUser.remove(function(err, resuts){
                if(err) console.log("err ", err)
                console.log("Removed ", resuts)
                res.json({message: "User Removed.", resuts})    
            })
        }
    })


    // app.get('/', function(req, res){

    //     res.sendfile("./public/views/index.html")
    // })

    

}