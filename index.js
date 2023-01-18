const express = require('express');
const app = express()
const books = []

// Parse JSON
app.use(express.json());

// Getting our list of books
app.get('/books', function(req, res){
  res.json({
    books
  });
});

// Adding to our list of books
app.post('/add', (req, res) => {
  const token = req.get("Authorization");
  const { title, author } = req.body 

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

app.listen(3000);
console.log('Express started on port 3000');
