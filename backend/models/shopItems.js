const mongoose = require("mongoose")

const {Schema} = mongoose

const itemSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    clothingType: {
        type: String,
        require: true

    },
    clothingCategory:{
       type: String,
       require:true
    },
    size: [{type:String}],

    
    price:{
        type: Number,
        require:true
    },
    tag:{
        type:String,
        default:"others"
       
        // validate(value){
        //     if(value != "men" || value != "women" || value != "kids"  || value != "others"){
        //         throw new Error("invalid value")
        //     }
        // }
    },
    brand:{
        type:String

    },
    src:{
        type:String,
        default:null
    },
    overallRating:{
        type:Number,
        default:0
    
    }
})


const shopItem = mongoose.model("shopItems", itemSchema)
module.exports = shopItem