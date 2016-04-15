const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');
var slothbearServer = require(__dirname + '/../server');

describe('slothbear server', () => {
  var oldNumFiles = 0;
  beforeEach((done) => {
    oldNumFiles = fs.readdirSync(__dirname + '/../data').length;
    done();
  });

  after((done) => {
    slothbearServer.close(() => {
      done();
    });
  });

  it('should receive a post request to /notes and write a file', (done) => {
    var object = { 'name': 'slothbear' };
    request('localhost:3000')
      .post('/notes')
      .send(object)
      .end((err, res) => {
        var newNumFiles = fs.readdirSync(__dirname + '/../data').length;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(newNumFiles).to.eql(oldNumFiles + 1);
        done();
      });
  });

  it('should receive a get request to /notes and return the number of files', (done) => {
    request('localhost:3000')
      .get('/notes')
      .end((err, res) => {
        var files = fs.readdirSync(__dirname + '/../data');
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('files stored: ' + files.join(', '));
        done();
      });
  });

  it('should return the correstponding file from when requested from /notes');

  it('should 404 on bad requests');

});
