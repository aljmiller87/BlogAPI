const express = require('express');
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
const app = express();
const {BlogPosts} = require('./module');
const routes = require('./routes')
app.use('/blog-posts', routes)


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});


// let server;

// function runServer() {
//   const port = process.env.PORT || 8080;
//   return new Promise((resolve, reject) => {
//     server = app.listen(port, () => {
//       console.log(`Your app is listening on port ${port}`);
//       resolve(server);
//     }).on('error', err => {
//       reject(err)
//     });
//   });
// }

// // like `runServer`, this function also needs to return a promise.
// // `server.close` does not return a promise on its own, so we manually
// // create one.
// function closeServer() {
//   return new Promise((resolve, reject) => {
//     console.log('Closing server');
//     server.close(err => {
//       if (err) {
//         reject(err);
//         // so we don't also call `resolve()`
//         return;
//       }
//       resolve();
//     });
//   });
// }