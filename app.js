const express = require('express');
const app = express();

let events = [
  {id:1, title:"Tittle 1", description:"description 1", date:"04012017"},
  {id:2, title:"Tittle 2", description:"description 2", date:"04012017"},
  {id:3, title:"Tittle 3", description:"description 3", date:"04012017"}
]

app.get('/events', (req, res) => {
  res.json(events)
});

app.post('/', (req, res) => {
  res.send('Got a POST request')
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
