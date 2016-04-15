const fs = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require(__dirname + "/../server");

describe("server", () => {
  var testServer;

  before((done) => {
    testServer = server(8888, __dirname + "/data");
    done();
  });

  after((done) => {
    testServer.close(() => {
      done();
    });
  });

  it("should respond to / with a Top Gun quote", (done) => {
    request("localhost:8888")
      .get("/")
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql("Tower, this is Ghostrider, requesting a flyby.");
        done();
      });
  });

  it("should respond with 404 on bad routes", (done) => {
    request("localhost:8888")
      .get("/badroute")
      .end((err, res) => {
        expect(err).to.eql(err);
        expect(res).to.have.status(404);
        expect(res.text).to.eql("Negative Ghostrider, the pattern is full.");
        done();
      });
  });

  it("should accept a post request to /notes and save a JSON file", (done) => {
    var topGun = { "Maverick": "Pete Mitchell",
                   "Goose": "Nick Bradshaw" };

    request("localhost:8888")
      .post("/notes")
      .send(topGun)
      .end((err, res) => {
        var fileContent = fs.readFileSync(__dirname + "/data/" + res.text, "utf8");
        var parsed = JSON.parse(fileContent);

        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(parsed.Maverick).to.eql("Pete Mitchell");
        expect(parsed.Goose).to.eql("Nick Bradshaw");
        done();
      });
  });

  it("should respond to /notes with a list of all json files", (done) => {
    request("localhost:8888")
      .get("/notes")
      .end((err, res) => {
        var fileList = fs.readdirSync(__dirname + "/data").join("\n");

        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(fileList);
        done();
      });
  });
});
