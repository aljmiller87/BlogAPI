const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

const {BlogPosts} = require('../module');
const routes = require('../routes');

// this lets us use *should* style syntax in our tests
// so we can do things like `(1 + 1).should.equal(2);`
// http://chaijs.com/api/bdd/
const should = chai.should();

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('blog routes', function() {
before(function() {
    return runServer();
});
after(function() {
    return closeServer();
});
	it('should list items on GET', function() {
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			res.should.be.json;
			res.body.should.be.a('array');
			res.should.have.status(200);
			res.body.length.should.be.at.least(1);
			const neededKeys = ['id', 'title', 'content', 'author', 'publishDate'];
      		res.body.forEach(function(item) {
       			item.should.be.a('object');
        		item.should.include.keys(neededKeys);
      		})
		})
	})

	it('should post a new item on POST', function () {
 	    const itemToPost = {
    		"title": "this is the 3rd post",
    		"content": "nothing really to see here.",
    		"author": "Gandalf",
    		"publishDate": "Dec 19"
    	};
 	    return chai.request(app)
	    .post('/blog-posts')
	    .send(itemToPost)
	    .then(function (res) {
	      res.should.have.status(201);
	      res.body.should.not.be.null;
 	    })
  });

	it('should update items on PUT', function() {
	    const updateBlog = {
			"title": "this is the 3rd post",
			"content": "nothing really to see here.",
			"author": "Gandalf",
			"publishDate": "Dec 19"
		};
    	return chai.request(app)
    	.get('/blog-posts')
    	.then(function(res) {
     		 updateBlog.id = res.body[0].id;
     		 return chai.request(app)
        	.put(`/blog-posts/${updateBlog.id}`)
        	.send(updateBlog);
    	})
    	.then(function(res){
      		res.should.have.status(200);
    	})
	});
	it('should delete items on DELETE', function() {
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res) {
      return chai.request(app)
      .delete(`/blog-posts/${res.body[0].id}`);
    })
    .then(function(res) {
      res.should.have.status(204);
    })
  });

})