const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const {BlogPosts} = require('./module');


BlogPosts.create('types of trees','sycammore,elm,etc.','Bilbo baggins', 'Dec 16');

app.get('/blog-posts', (req, res) => {
	res.send(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (req, res) => {
	BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).send('status 201');
});

app.delete('/blog-posts/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	res.status(202).send('status 202');
});

app.put('/blog-posts/:id', jsonParser, (req, res) => {
	const newPost = {
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	}
	BlogPosts.update(newPost);
	res.status(202).send('status 202')
});











app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
