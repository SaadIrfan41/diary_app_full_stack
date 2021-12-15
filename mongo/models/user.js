import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    diaries: [{ type: ObjectId, ref: 'Diary' }],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    emailVerified: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

let Dataset = mongoose.models.users || mongoose.model('users', userSchema)
export default Dataset
