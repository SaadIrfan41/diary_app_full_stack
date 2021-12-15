import Diary from '../../models/diary'
import Users from '../../models/user'
import Entries from '../../models/entry'

module.exports = {
  Query: {
    // Diaries
    getDiaries: async () => {
      try {
        const diaries = await Diary.find({})
          .sort({ createdAt: -1 })
          .populate('author', '-password')
          .populate('entries')
          .exec()

        return diaries
      } catch (err) {
        console.log(err)
      }
    },
    getDiary: async (_, { id }) => {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Invalid User ID')
      }
      const diary = await Diary.findById(id)
        .populate('author', '-password')
        .populate('entries')
        .exec()

      if (!diary) {
        throw new Error('Diary not found')
      }

      return diary
    },
  },

  Mutation: {
    // Diaries
    newDiary: async (_, { tittle, privacy, author }) => {
      if (!author.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Invalid User ID')
      }

      const user = await Users.findById(author).exec()
      if (!user) {
        throw new Error('User Does Not Exist')
      }

      try {
        const diary = new Diary({ tittle, privacy, author })
        await user.diaries.push(diary._id)
        await user.save()
        const result = await diary.save()
        return result
      } catch (err) {
        console.log(err)
      }
    },

    deleteDiary: async (_, { id }) => {
      const diary = await Diary.findById(id)
      if (!diary) {
        throw new Error('Diary Does Not Exist')
      }
      await Entries.deleteMany({ diaryid: id })
      await Diary.findOneAndDelete({ _id: id })
      return 'Diary Deleted'
    },
  },
}
