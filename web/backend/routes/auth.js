var express = require('express');
var router = express.Router();
var database = require("../lib/database");
var path=require('path');

module.exports = function (passport) {
    router.post('/sign_up_user', async function (req, res) {
        let user=req.body;
        user.status="user";
        try {
            await database.createListing("users", user);
            res.json({ success: true });
        } catch (e) {
            res.json({ success: false });
        }
    });

    router.post('/sign_up_doctor', async function (req, res) {
        let user=req.body;
        user.status="doctor";
        try {
            await database.createListing("doctors", user);
            res.json({ success: true });
        } catch (e) {
            res.json({ success: false });
        }
    });
    router.get("/login/success", function (req, res) {
        console.log("Login Success");
        res.json({ success: true });
    });

    router.get('/login/fail', function (req, res) {
        console.log("Login Fail");
        res.json({ success: false });
    });


    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/login/success',
            failureRedirect: '/login/fail'
        }));

    router.get('/logout', function (req, res) {
        req.logout();
        req.session.save(function () {
            res.json({ success: true });
        });
    });
    // router.get('/',function(req,res){
    //     res.sendFile(path.join(__dirname,"../public/index.html"));
    // })

    router.get("/info", function (req, res) {
        user=req.user;
        res.json(user);
    });
    
    router.post("/forgot_pw",async function(req,res){
        try{
            const data=req.body;
            const user = await database.findOneListing("users",{
                id:data.id,
                email:data.email
            });
            if(user){
                res.json({success:true});
            }
        }catch(e){
            console.error(e);
            res.json({success:false});
        }
        
    });

    router.post("/update_pw",async function(req,res){
        try{
            const data=req.body;
            await database.updateListing("users",{id:data.id},{
                pw:data.pw
            })
            res.json({success:true});
        }catch(e){
            console.error(e);
            res.json({success:false});
        }
    });

    return router;
}