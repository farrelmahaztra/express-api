const express = require('express');
const cors = require('cors')
const app = express()
let books = []

// Parse JSON
app.use(express.json());

// Enable CORS
app.use(cors())

// Middleware to validate "auth"
app.use((req, res, next) => {
  const token = req.get("Authorization");

  // Ensuring a token is sent
  if (!token) {
    return res.status(401).json({
      message: "A token is required"
    })
  }

  // Checking the token is correct (don't do it like this lol)
  if (token !== "super duper secret") {
    return res.status(403).json({
      message: "Invalid token"
    })
  }

  next()
})

// Getting our list of books
app.get('/books', function (req, res) {
  res.json({
    books
  });
});

// Adding to our list of books
app.post('/add', (req, res) => {
  const { title, author } = req.body

  // Validating part of the body
  if (!title) {
    return res.status(400).json({
      message: "A title is required"
    });
  }

  // Do stuff with the body here, like adding this to a database.
  books.push({
    title, author
  })

  // Send a success message
  return res.status(200).json({
    message: "Book successfully added"
  })
})

// Deleting a book from our list
app.delete('/delete', (req, res) => {
  const { title } = req.body

  // Validating part of the body
  if (!title) {
    return res.status(400).json({
      message: "A title is required"
    });
  }

  // Do stuff with the body here, like deleting this from a database.
  books = books.filter(book => book.title !== title)

  // Send a success message
  return res.status(200).json({
    message: "Book successfully deleted"
  })
})

app.listen(3000);
console.log('Express started on port 3000');
