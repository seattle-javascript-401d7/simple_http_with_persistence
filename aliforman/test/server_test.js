const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require(__dirname + '/../server');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');
var jsonString = '{"greet": "Assimilari hominibus parare."}';
var greetList;

describe('test GET & POST request', () => {
  before(() => {
    fs.readdir('/data/', (err, data) => {
      greetList = data.length;
      if (err) return 'Error';
      console.log(greetList);
    });
  });
  it('should have GET request from single resource', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should check POST request and return JSON file', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send(jsonString)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"greet": "Assimilari hominibus parare."}');
      console.log(jsonString);
      done();
    });
  });
  it('Check if .json files are same as current list ', (done) => {
    after(() => {
      fs.readdir('/data/', (err, data) => {
        if (err) return 'Error';
        expect(data.length).to.eql(greetList);
      });
    });
    done();
  });

  after(() => {
    server.close();
  });
});
