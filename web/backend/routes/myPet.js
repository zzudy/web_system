var express = require('express');
var router = express.Router();
var database = require("../lib/database");

router.get('/', async function (req, res, next) {
    try {
        const user = await database.findOneListing("users", { id: req.user.id });
        let petList = [];
        if(user.pet_list){
            for(const _id of user.pet_list){
                const pet = await database.findOneListing("pets", { _id: _id });
                petList.push(pet);
            }
            
        }
        console.log("mypet.out",petList);
        res.json(petList);
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

router.post('/addpet', async function (req, res) {
    try {
        const insertedId = await database.createListing("pets", req.body);
        await database.pushElementInListing("users",
            { id: req.user.id }, { pet_list: insertedId });
        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

router.post("/booking",async function(req,res){
    try {
        //안씀
        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
})
module.exports = router;
