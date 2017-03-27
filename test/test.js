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
  describe("GET / event by id", () => {

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
});
