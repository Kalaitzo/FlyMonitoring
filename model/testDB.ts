// import {model, Schema} from "npm:mongoose@^6.7";
//
// const testSchema = new Schema({
//     name:{type: String, unique: true},
//     description: String,
//     createdAt: {type: Date, default: Date.now()},
//     updatedAt: {type: Date, default: Date.now()}
// });
//
// testSchema.path("name").required(true, "Dinosaur name cannot be blank");
// testSchema.path("description").required(true, "Dinosaur description cannot be blank")
//
// testSchema.methods = {
//     updateDescription: async function(description: string){
//         this.description = description;
//         return await this.save();
//     }
// }
//
// export default model("Test", testSchema, 'Test')
//
// interface UserSchema {
//     _id: ObjectId;
//     username: string;
//     password: string;
// }
//
// export default UserSchema

