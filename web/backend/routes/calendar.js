var express = require('express');
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();
var database = require("../lib/database");
var moment = require("moment");
var momentTimezone=require("moment-timezone");

router.get('/',async function (req,res){
    try{
        const user = await database.findOneListing("users",{id:req.user.id});
        let calendarList=[];
        if(user.calendar_list){
            for(cal_id of user.calendar_list){
                let cal=await database.findOneListing("calendars",{_id:cal_id});
                if(cal){
                    calendarList.push(cal);

                }
            }
        }
        if(user.pet_list){
            for(pet_id of user.pet_list){
                console.log("hi");
                let pet=await database.findOneListing("pets",{_id:pet_id});
                for(cal_id of pet.calendar_list){
                    let cal=await database.findOneListing("calendars",{_id:cal_id});
                    if(cal){
                        calendarList.push(cal);
                    }
                }
    
            }
        }
        console.log(calendarList);
        res.json(calendarList);
    }catch(e){
        console.error(e);
        res.json({success:false});
    }
});

router.post('/',async function (req,res){
    try{
        const insertedId=await database.createListing("calendars",req.body);
        await database.upsertListing("calendars",{_id:insertedId},{id:insertedId});
        await database.pushElementInListing("users",
            {id:req.user.id},{calendar_list:insertedId});
        res.json({success:true});
    }catch(e){
        res.json({success:false});
    }
    
});

router.put('/:id',async function (req,res){
    try{
        const id=req.params.id;
        await database.updateListing("calendars",
            {id:new ObjectId(id)},req.body);
        console.log(id);
        res.json({success:true});    
    }catch(e){
        console.error(e);
        res.json({success:false});
    }
});

router.delete('/:id',async function (req,res){ // id!!!=ObjectId
    try{
        const id=req.params.id;
        await database.deleteListing("calendars",{id:new ObjectId(id)});
        await database.pullElementInListing("users",
            {id:req.user.id},
            {calendar_list:new ObjectId(id)}
            );
        res.json({success:true});
    }catch(e){
        res.json({success:false});
    }

});

module.exports=router;