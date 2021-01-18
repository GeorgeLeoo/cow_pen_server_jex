module.exports = (Schema) => {
  return {
    name: String,
    level: Number,
    levelOneId: String,
    levelTwoId: String,
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    isDelete: {
      type: Number,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  }
}
