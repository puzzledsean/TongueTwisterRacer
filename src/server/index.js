const express = require("express");
const router = express.Router();
const path = require('path')

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/*", (req, res) => {
  console.log('hello!!!')
});

// router.get('*', function (request, response){
//     response.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
//   })

module.exports = router;
