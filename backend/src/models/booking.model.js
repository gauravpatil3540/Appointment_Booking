import mongoose, {Schema} from "mongoose";

const bookingSchema = new Schema(
    {
        firstName : {
            type : String,
            required: true, 
            lowercase: true,
            trim: true 
        },
        lastName : {
            type : String,
            required: true, 
            lowercase: true,
            trim: true 
        },
        email : {
            type : String,
            required: true, 
            lowercase: true,
            trim: true 
        },
        mobile : {
            type : Number,
            required: true, 
            trim: true 
        },
        fee : {
            type: Number
        },
        slot : {
            type : String
        },
        date : {
            type : String
        }
    }, 
    {timestamps: true}
)

export const Booking = mongoose.model("Booking", bookingSchema)