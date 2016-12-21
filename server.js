const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {BlogModel} = require('./module');

const app = express();
app.use(bodyParser.json());

//GET
app.get('/blog-posts', (req, res) => {
  BlogModel
    .find()
    .exec()
    .then(blogposts => {
      res.json(blogposts.map(blogpost => blogpost.apiRepr()));
    })
    .catch(
      err => {
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
      });
});

app.get('/blog-posts/:id',(req,res) => {
   BlogModel
      .findById(req.params.id)
      .exec()
      .then(blogpost =>  res.json(blogpost.apiRepr()))
      .catch(err => {
        res.status(500).json({message: 'Internal server error'})
      });   

});

app.post('/blog-posts',(req,res) => {
  const requiredFields =['title','content','author'];
  requiredFields.forEach(field => {
   
   if(!(field in req.body && req.body[field])){
      return res.status(400).json({message: `must specify value for ${field}`})
   }

  });
 BlogModel
    .create({
     title: req.body.title,
     content: req.body.content,
     author: req.body.author,
     })
    .then(
      blogpost => res.status(201).json(blogpost.apiRepr()))
     .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
     });
});



app.put('/blog-posts/:id', (req, res) => {
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
  const toUpdate = {};
  const updateableFields = ['title', 'content', 'author', 'created'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  BlogModel
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(blogpost => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

app.delete('/blog-posts/:id', (req, res) => {
  BlogModel
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(blogpost => res.status(204).end())
    .catch(err => res.status(500).json({messag: 'Not found'}));
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};



/* BELOW CODE IS BEFORE USING MONGO/MONGOOSE
const express = require('express');
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
const app = express();
const {BlogPosts} = require('./module');
const routes = require('./routes')
app.use('/blog-posts', routes)





let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });

module.exports = {app, runServer, closeServer};
*/