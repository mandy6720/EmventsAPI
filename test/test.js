process.env.NODE_ENV = 'test'

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

let mongoose = require("mongoose");
let Event = require('../models/event');


chai.use(chaiHttp);

//Test the /GET Routes
describe("This is CRUD of Events", () => {
  beforeEach((done) => {
      Event.remove({}, (err) => {
         done();
      });
  });

  describe("GET / all events", () => {

    it("returns all events", (done) => {
      chai.request(server)
        .get('/events')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    });

  });

  // Test /GET by id
  describe("GET /events/:id", () => {

    it("returns one event", (done) => {
      let event = new Event({ title: "Test Event 1", description: "123", date: new Date()});
      event.save((err, event) => {
          chai.request(server)
          .get('/events/' + event.id)
          .send(event)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('description');
              res.body.should.have.property('date');
              res.body.should.have.property('_id').eql(event.id);
            done();
          });
      });
    });

  });

  // Test /GET by title
  describe("GET /events/search", () => {

    it("returns matching events", (done) => {
      let event1 = new Event({ title: "Test Event 1", description: "123", date: new Date()});
      let event2 = new Event({ title: "Test Event 2", description: "456", date: new Date()});
      event1.save((err, event) => {
          chai.request(server)
          .get('/events/' + event.id)
          .send(event)
          .end((err, res) => {
            event2.save((err, event) => {
              chai.request(server)
              .get('/events/search?title=1')
              .send(event)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
              });
            });
          });
      });
    });

  });

  // Test /POST
  describe("POST to /events", () => {

    it("posts a new event", (done) => {
      let newEvent = {
        title: 'test event',
        description: 'test',
        date: new Date()
      };
      chai.request(server)
        .post('/events')
        .send(newEvent)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Created!');
            res.body.event.should.have.property('title');
            res.body.event.should.have.property('description');
            res.body.event.should.have.property('date');
          done();
        });
    });

  });

  //Test Update Event
  describe("PUT to /events/:id", () => {

    it("update a existing event", (done) => {
      let newEvent = new Event({
        title: 'test event',
        description: 'test',
        date: new Date()
      })
      let newTitle = "test event updated"
      let newDescription = "new description"
      newEvent.save((err, event) => {
        chai.request(server)
        .put('/events/' + event.id)
        .send({title: newTitle, description: newDescription, date: event.date})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Updated!');
            res.body.event.should.have.property('title').eql(newTitle);
            res.body.event.should.have.property('description').eql(newDescription);
          done();
        });
      });
    });
  });

  //Test Fail Update Event
  describe("PUT to /events/:id with unexisting id", () => {

    it("update a unexisting event", (done) => {
      let newEvent = {
        id: 100,
        title: 'test event',
        description: 'test',
        date: '03262017'
      };
      chai.request(server)
        .put('/events/7')
        .send(newEvent)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    });
  });

  //Test DELETE an Event
  describe("DELETE /events/:id", () => {
    it("update a existing event", (done) => {
      let newEvent = new Event({
        title: 'test event',
        description: 'test',
        date: new Date()
      })
      newEvent.save((err, event) => {
        chai.request(server)
        .delete('/events/' + event.id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Deleted');
          done();
        });
      });
    });
  });

  //Test DELETE an Event (FAIL)
  describe("DELETE /events/:id fails when id does not exist", () => {

    it("delete an existing event", (done) => {
      chai.request(server)
        .delete('/events/26')
        .end((err, res) => {
          res.should.have.status(404);
          done()
        })
    });
  });

});
