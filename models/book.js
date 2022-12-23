const { Schema, SchemaTypes, model } = require("mongoose");
const SCHEMA = require("../consts/schemas");

const book = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: SCHEMA.USERS,
    },
  },
  { versionKey: false, timestamps: true }
);

const Book = model(SCHEMA.BOOKS, book);

module.exports = Book;
