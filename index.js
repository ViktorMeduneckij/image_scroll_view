const express = require('express');
const path = require('path');
const app = express();

require('./routes/photos.js')(app);

if (process.env.NODE_ENV === "production") {
  console.log('This is production env.');
  app.use(express.static("client/build"));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

else {
  app.use(express.static(path.join(__dirname, '/client/public')));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App is alive on port ${PORT}`)
})

