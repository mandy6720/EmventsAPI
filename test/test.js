let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

//Test the /GET Routes
describe("This is CRUD of Events", () => {
  describe("GET / all events", () => {

    it("returns all events", (done) => {
      chai.request(server)
        .get('/events')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(3)
          done()
        })
    });

  });

  // Test /GET by id
  describe("GET /events/:id", () => {

    it("returns one event", (done) => {
      chai.request(server)
        .get('/events/1')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(1)
          done()
        })
    });

  });

  // Test /POST
  describe("POST to /events", () => {

    it("posts a new event", (done) => {
      let newEvent = {
        id: 7,
        title: 'test event',
        description: 'test',
        date: '03262017'
      };
      chai.request(server)
        .post('/events')
        .send(newEvent)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object');
          res.body.message.should.be.eql("Added");
          done()
        })
    });

  });

  //Test Update Event
  describe("PUT to /events/:id", () => {

    it("update a existing event", (done) => {
      let newEvent = {
        id: 1,
        title: 'test event',
        description: 'test',
        date: '03262017'
      };
      chai.request(server)
        .put('/events/1')
        .send(newEvent)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object');
          res.body.message.should.be.eql("Updated!");
          res.body.data.date.should.be.eql("03262017");
          done()
        })
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

});
