const mongoose = require("mongoose");

const DetailsSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    Bas:{
        type:Number,
        required:true
    },
    LTA:{
        type:Number,
        required:true
    },
    HRA:{
        type:Number,
        required:true
    },
    FA:{
        type:Number,
        required:true
    },
    Inv:{
        type:Number,
        required:true
    },
    Rent:{
        type:Number,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Med:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model("Details",DetailsSchema);