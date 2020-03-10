var express = require('express');
var router = express.Router();
var database = require("../lib/database");
var moment=require("moment");
var momentTimezone=require("moment-timezone");

router.get('/', async function (req, res) {
    try {
        const names=await database.findMultipleListings("boardName");
        names.forEach(name=>{
            delete name._id;
        });
        res.json(names);
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

router.get("/:idx/remove/:t_idx",async function (req,res){
    const params=req.params;
    try{
        const text=await database.findOneListing("board"+params.idx,{idx:Number.parseInt(params.t_idx)});
        await database.deleteListing("board"+params.idx,{idx:Number.parseInt(params.t_idx)});
        let users=await database.findMultipleListings("board"+params.idx);
        for(user of users){
            await database.pullElementInListing("users",{
                id:req.user.id
            },{
                texts:text._id
            });
        }
        res.json({success:true});
    }catch(e){
        console.error(e);
        res.json({success:false});
    }
})

router.get('/:idx/text/:t_idx',async function(req,res){
    try{
        let text=await database.findOneListing("board"+req.params.idx,{
            idx:Number.parseInt(req.params.t_idx)
        });
        text.removable=false;
        await database.upsertListing("board"+req.params.idx,{
            idx:Number.parseInt(req.params.t_idx)
        },{
            view:++text.view
        })
        const user = await database.findOneListing("users",{id:req.user.id});
        if(user){
            for(t_id of user.texts){
                if(text._id.toString()==t_id.toString()){
                    text.removable=true;
                }
            }
        }
        console.log(text);
        res.json(text);   
    }catch(e){
        res.json({success:false});
    }
});

router.post('/:idx/register', async function (req, res) {
    try {
        let data=req.body;
        let idx=Number.parseInt(req.params.idx);
        let temp=await database.findOneListing("boardName",{idx:idx});
        let number=temp.number;
        await database.upsertListing("boardName",{idx:idx},{number:number+1});
        data.idx=number;
        data.writer=req.user.nickname;
        data.view=0;
        data.like=0;
        data.time=moment(Date.now()).tz("Asia/Seoul").locale("ko").format("lll");
        const insertedId=await database.createListing("board"+idx,data);
        console.log(data);
        console.log(data.img);
        await database.pushElementInListing(
            "users",{id:req.user.id},{texts:insertedId}
        );
        
        res.json({ success:true });
    } catch (e) {
        console.error(e);
        res.json({ success: false });
    }
});

router.get("/:idx/:p_id",async function(req,res){
    try{
        const p_id=req.params.p_id;
        let boards=await database.findMultipleListings("board"+req.params.idx);
        boards=boards.reverse();
        data={
            text:boards.slice((p_id-1)*10,p_id*10),
            text_length:boards.length
        };
        console.log(data);
        res.json(data);
    }catch(e){
        console.error(e);
        res.json({success:false});
    }

});

router.get('/:idx', async function (req, res) {
    try {
        const board = await database.findOneListing("board", { idx: req.user.idx });
        res.json(board);
    } catch (e) {
        res.json({ success: false });
    }
});



module.exports = router;
