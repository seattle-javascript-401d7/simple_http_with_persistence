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

  it('should GET from /rumothoughts a list of json obj', (done) => {
    var thought = { 'thought': 'rala is nice' };
    chai.request('http://localhost:5000')
    .get('/rumothoughts')
    .end((error, response) => {
      expect(response).to.eql(undefined);
      done();
    });
  });

  it('should POST to /rumothoughts with a new thought1.json', (done) => {
    var thoughtsBefore = fs.readdirSync(__dirname + '/../data/');
    var h1Response = '<h1>Rumo is thinking! YAY for thoughts!</h1>';
    var thought = { 'thought': 'rala is nice' };
    chai.request('http://localhost:5000')
    .post('/rumothoughts')
    .send(thought)
    .end((error, response) => {
      var thoughtsAfter = fs.readdirSync(__dirname + '/../data/');
      expect(response).to.have.status(200);
      expect(response.text).to.eql(h1Response);
      expect(thoughtsAfter.length).to.eql(thoughtsBefore.length + 1);
      done();
    });
  });
});
