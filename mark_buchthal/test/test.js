
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');
require(__dirname + '/../server');
var numFiles, stringFile;

describe('server', () => {
  beforeEach(() => {
    numFiles = fs.readdirSync(__dirname + '/../db').length;
    stringFile = fs.readdirSync(__dirname + '/../db').toString();
  });

  it('should POST data to /quotes', (done) => {
    request('localhost:3000')
    .post('/quotes')
    .send({
      'quote': 'Computers are useless.  They can only give you answers.',
      'person': 'Pablo Picasso'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(numFiles + 1).to.eql(fs.readdirSync(__dirname + '/../db').length);
      done();
    });
  });

  it('should accept GET request to /quotes', (done) => {
    request('localhost:3000')
    .get('/quotes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(stringFile).to.eql(res.text);
      done();
    });
  });

  it('should 404', (done) => {
    request('localhost:3000')
    .get('/nothing')
    .end((err, res) => {
      expect(err).to.eql(err);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('404 error');
      done();
    });
  });
});
