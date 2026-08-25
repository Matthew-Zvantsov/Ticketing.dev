import mongoose from "mongoose";
import { Password } from "../utils/password-util";

// Атрибуты, которые нужны для создания юзера
interface UserAttrs {
  email: string;
  password: string;
}

// Что представляет собой документ User (что хранится в БД)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Тип самой модели, расширяющий стандартный Model + статики
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret){
        const { password, _id, ...rest } = ret;
        return {
          id: _id.toString(),
          ...rest
        };
      },
      versionKey: false
    }
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function() {
  if (this.isModified('password')){
    const hashed = await Password.toHash(this.password);
    this.set('password' , hashed);
  }
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

const newUser = User.build({ email: "test@test.com", password: "123" });

export { User };