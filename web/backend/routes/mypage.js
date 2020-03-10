var express = require('express');
var router = express.Router();
var database = require("../lib/database");

router.post("/",async function(req,res){
    try{
        const user = await database.findOneListing("users",{id:req.user.id})
        if(user.pw==req.body.pw){
            res.json({success:true});
        }else{
            res.json({success:false});
        }
    }catch(e){
        console.error(e);
        res.json({success:false});
    }
});

router.get("/",async function(req,res){
    try{
        const user=await database.findOneListing("users",{id:req.user.id});
        res.json(user);
    }catch(e){
        console.error(e);
        res.json({success:false});
    }
});

router.post("/modify",async function(req,res){
    try{
        await database.upsertListing("users",{id:req.user.id},req.body);
        res.json({success:true});
    }catch(e){
        console.error(e);
        res.json({success:false});
    }
});

module.exports=router;