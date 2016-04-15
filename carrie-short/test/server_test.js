const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require(__dirname + '/../server');

describe('the http server', () => {
  after((done) => {
    server.close(() => {
      done();
    });
  });
  it('should accept get requests to /notes and respond with list of notes');
  it('should accept json post requests to /notes and save the body of the json object in a file');
  it('should 404 on bad requests');
});
