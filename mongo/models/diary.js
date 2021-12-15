import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema
const { Schema } = mongoose

mongoose.Promise = global.Promise

const DiarySchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: 'users',
    },
    entries: [{ type: ObjectId, ref: 'Entries' }],
    privacy: {
      type: String,
      // enum: ['public', 'private'],
      required: true,
    },
  },
  { timestamps: true }
)

let Dataset = mongoose.models.Diary || mongoose.model('Diary', DiarySchema)
export default Dataset
