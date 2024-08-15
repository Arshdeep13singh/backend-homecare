const express = require('express');
const Provider = require('./providerModel');
const router = express.Router();
const PrviderJson=require("../provider.json")
const connectDB=require("../db/connect")
require("dotenv").config();

const pastedata=async ()=>{
  try{
    await connectDB(process.env.MONGODB_URL)
    await Provider.create(PrviderJson)
  }catch(error){
    console.log("error");
  }
}
// pastedata();

router.get('/search', async (req, res) => {
    const { name, zip_code } = req.query;

    // Build query based on available query parameters
    const query = {};
    if (name) query.name = name;
    if (zip_code) query.zip_code = zip_code;
    console.log(name,zip_code)
    console.log("gdfgddfg")
    try {
        const providers = await Provider.find({
            $or: [
                { name: { $regex: new RegExp(name, "i") } },  // Case-insensitive search
                { zip_code: zip_code }
            ]
        });
        res.send({ providers });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;