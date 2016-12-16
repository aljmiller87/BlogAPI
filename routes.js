const express = require('express');
const app = express();
const {BlogPosts} = require('./module');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

BlogPosts.create('types of trees','sycammore,elm,etc.','Bilbo baggins', 'Dec 16');


router.get('/', (req, res) => {
	res.send(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).send('status 201');
});

router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	res.status(202).send('status 202');
});

router.put('/:id', jsonParser, (req, res) => {
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

module.exports = router;