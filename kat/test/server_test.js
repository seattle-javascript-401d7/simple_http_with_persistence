const chai = require('chai');
const fs = require('fs');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request;
require(__dirname + '/../server.js');


describe('the HTTP server', () => {
  var listBefore;
  var listAfter;
  before(() => {
    var listBefore = fs.readdirSync(__dirname + '/../data/');
    listBefore = listBefore.length + 1;
  });

it('should accept a GET request to /name', (done) => {
  console.log('listBefore: ' + listBefore);
  request('localhost:3000')
  .get('/notes')
  .end((err, response) => {
    expect(err).to.eql(null);
    expect(response.status).to.eql(200);
    // expect(response.text).to.eql('lastfile add to string');
    done();
  });
});
it('should allow POST requests to /name', (done) => {
  console.log('listBefore: ' + listBefore);
  request('localhost:3000')
  .post('/notes')
  .send({ 'msg': 'Everytime I send this a new file is created' })
  .end((err, response) => {
    listAfter = fs.readdirSync(__dirname + '/../data/');
    listAfter = listAfter.length;
    expect(err).to.eql(null);
    expect(response.status).to.eql(200);
    expect(listBefore).to.eql(listAfter);
    done();
  });
  });
});
