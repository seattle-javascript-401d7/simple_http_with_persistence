const chai = require('chai'); // eslint-disable-line keyword-spacing
const fs = require('fs');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request;
require(__dirname + '/../server.js');


describe('the HTTP server', () => {
  var listBefore;
  var listAfter;
  var fileLengthBefore;

  before(() => {
    listBefore = fs.readdirSync(__dirname + '/../data/');
    fileLengthBefore = listBefore.length + 1;
  });

it('should accept a GET request to /name', (done) => {
  request('localhost:3000')
  .get('/notes')
  .end((err, response) => {
    if (fileLengthBefore > 1) {
      expect(err).to.eql(null);
      expect(response.status).to.eql(200);
      expect(response.text.split(',').length).to.eql(listBefore.length);
    }
    expect(err).to.eql(null);
    expect(response.status).to.eql(200);
    done();
  });
});
it('should allow POST requests to /name', (done) => {
  listAfter = fs.readdirSync(__dirname + '/../data/');
  listAfter = listAfter.length;
  request('localhost:3000')
  .post('/notes')
  .send("{ 'msg': 'Everytime I send this a new file is created' }")
  .end((err, response) => {
    expect(err).to.eql(null);
    expect(response.status).to.eql(200);
    done();
  });
  });
it('should have the correct content', (done) => {
  listAfter = fs.readdirSync(__dirname + '/../data/');
  listAfter = listAfter.length;
  if (fileLengthBefore === 0) {
    expect(fileLengthBefore).to.eql(-1);
    done();
  }
  var newfileContent = fs.readFileSync(__dirname + '/../data/' + listAfter + '.json');
  var jsonBuf = new Buffer("{ 'msg': 'Everytime I send this a new file is created' }");
  expect(fileLengthBefore).to.eql(listAfter);
  expect(newfileContent).to.eql(jsonBuf);
  done();
});
});
