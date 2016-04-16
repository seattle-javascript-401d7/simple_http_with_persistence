const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require(__dirname + '/../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('http server with persistence wtv that means', () => {

  after((done) => {
    server.close(() => {
      done();
    });
  });

  it('should POST to /rumothoughts with a new thought1.json', (done) => {
    var thoughtsBefore = fs.readdirSync(__dirname + '/../data/');
    var h1Response = '<h1>Rumo is thinking! YAY for thoughts!</h1>';
    var thought = '{"thought":"rala is nice"}';
    chai.request('http://localhost:5000')
    .post('/rumothoughts')
    .send(thought)
    .end((error, response) => {
      var thoughtsAfter = fs.readdirSync(__dirname + '/../data/');
      expect(error).to.eql(null);
      expect(response).to.have.status(200);
      expect(response.text).to.eql(h1Response);
      expect(thoughtsAfter.length).to.eql(thoughtsBefore.length + 1);
      done();
    });
  });

  it('should GET from /rumothoughts a list of json obj', (done) => {
    var thoughtsBefore = fs.readdirSync(__dirname + '/../data/');
    var folder = thoughtsBefore;
    var allThoughts = {};
    for (var i = 0; i < folder.length; i++) {
      var rawThought = fs.readFileSync(__dirname + '/../data/' + folder[i]);
      var regularThought = JSON.parse(rawThought);
      allThoughts['thought' + i] = regularThought.thought;
    }
    var jsonThoughts = JSON.stringify(allThoughts);
    fs.writeFileSync(__dirname + '/../master/allThoughts.json', jsonThoughts);
    allThoughts = fs.readFileSync(__dirname + '/../master/allThoughts.json');
    var thoughts = JSON.parse(allThoughts);
    thoughts = JSON.stringify(thoughts);
    chai.request('http://localhost:5000')
    .get('/rumothoughts')
    .end((error, response) => {
      expect(error).to.eql(null);
      expect(response.status).to.eql(200);
      expect(response.text).to.eql(thoughts);
      done();
    });
  });
});
