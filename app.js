const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/', (req, res) => {
  res.send('Got a POST request')
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
