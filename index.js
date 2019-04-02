const express = require('express')
const app = express();

require('./routes/photos.js')(app);

app.listen(3000, () => {
  console.log('Node server is alive on 3000.')
});

