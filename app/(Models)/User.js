import mongoose, { Schema, mongo } from "mongoose";    

mongoose.connect(process.env.URI);
mongoose.Promise=global.Promise
console.log(process.env);

const userSchema= new Schema({
    name:String,
    email: String,
    password: String,
},
{
timestamps:true

}

)

const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User