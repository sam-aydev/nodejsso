const Author = require("../models/Author");
const Book = require("../models/Book");

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "errpr",
    });
  }
};

const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);

    res.status(200).json({
      success: true,
      data: author,
    });
  } catch (error) {
    res.json({
      message: "errpr",
    });
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    console.log(req.params.id)
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) {
      return res.status(400).send({
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).send({
      message: "errpr",
    });
  }
};

module.exports = {
  createBook,
  createAuthor,
  getBookWithAuthor
};
