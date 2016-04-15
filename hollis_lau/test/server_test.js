const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require(__dirname + "/../server");

describe("server", () => {
  after((done) => {
    server.close(() => {
      done();
    });
  });

  it("should respond to / with a Top Gun quote", (done) => {
    request("localhost:3000")
      .get("/")
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql("Tower, this is Ghostrider, requesting a flyby.");
        done();
      });
  });

  it("should respond with 404 on bad routes", (done) => {
    request("localhost:3000")
      .get("/badroute")
      .end((err, res) => {
        expect(err).to.eql(err);
        expect(res).to.have.status(404);
        expect(res.text).to.eql("Negative Ghostrider, the pattern is full.");
        done();
      });
  });
});
