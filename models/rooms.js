import mongoose from "mongoose";
import Category from "./category";

id:{
    const roomSchema = new mongoose.Schema({
        roomId :{
            type :Number,
            required : true,
            unique : true
        },
        category :{
            type :String,
            required : true,
        },
        maxGusts : {
            type :Number,
            required : true,
            default : 3
        },
        avaliable : {
            type :Boolean,
            default : true,
        },
        photoes : [
            {
                type :String,
            }
        ],
        specialdescription : {
            type :String,
            default : ""
        },
        notes : {
            type :String,
            default : ""
        },
    });
}
const  Rooms = mongoose.Schema("Rooms", roomSchema)
export default Rooms;