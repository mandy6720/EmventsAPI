let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app.js')
let should = chai.should()

chai.use(chaiHttp)

//Test the /GET Routes
describe("This is CRUD of Events", () => {
  describe("GET / all events", () => {

    it("returns status code 200", (done) => {
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
});
