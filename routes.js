// const express = require('express');
// const app = express();
// const {BlogPosts} = require('./module');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

// BlogPosts.create('types of trees','sycammore,elm,etc.','Bilbo baggins', 'Dec 16');


// router.get('/', (req, res) => {
// 	res.send(BlogPosts.get());
// });

// router.post('/', jsonParser, (req, res) => {
// 	const requiredFields = ['title', 'content', 'author'];
//  	for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
// 	BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
// 	res.status(201).send('status 201');
// });

// router.delete('/:id', (req, res) => {
// 	BlogPosts.delete(req.params.id);
// 	res.status(204).send('status 202');
// });

// router.put('/:id', jsonParser, (req, res) => {
// 	const requiredFields = [
//   	'id', 'title', 'content', 'author', 'publishDate'];
// 	for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   	}
//   	if (req.params.id !== req.body.id) {
//     	const message = (
//       		`Request path id (${req.params.id}) and request body id `
//       		`(${req.body.id}) must match`);
//     	console.error(message);
//     	return res.status(400).send(message);
//   	}
//   	const newPost = {
// 		id: req.params.id,
// 		title: req.body.title,
// 		content: req.body.content,
// 		author: req.body.author,
// 		publishDate: req.body.publishDate
// 	}
// 	BlogPosts.update(newPost);
// 	res.status(200).send('status 202')
// });

// module.exports = router;