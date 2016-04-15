const fs = require("fs");
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

  it("should accept a post request to /notes and save a JSON file", (done) => {
    var json = '{"Maverick": "Pete Mitchell"}';

    request("localhost:3000")
      .post("/notes")
      .send(json)
      .end((err, res) => {
        var fileContent = fs.readFileSync(__dirname + "/../data/" + res.text, "utf8");

        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(fileContent).to.eql(json);
        done();
      });
  });

  it("should respond to /notes with a list of all json files", (done) => {
    request("localhost:3000")
      .get("/notes")
      .end((err, res) => {
        var fileList = fs.readdirSync(__dirname + "/../data").join("\n");

        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(fileList);
        process.stdout.write(fileList);
        done();
      });
  });
});
