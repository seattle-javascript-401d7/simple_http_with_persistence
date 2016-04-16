const request = require('superagent');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

describe('data store ', () => {
  it('should respond to GET requests', (done) => {
    request
      .get('localhost:3030/awesomeUrl')
      .end(function(err, res) {
        expect(res).to.exist;
        expect(res.status).to.eql(200);
      });
    done();
  });
  it('should also take a POST request', (done) => {
  request
    .post('localhost:3030/awesomeUrl')
    .set('Content-Type', 'application/json')
    .send('{"there": "can be only one"}')
    .end(function(err, res) {
      expect(res).to.exist;
      expect(res.status).to.eql(200);
    });
  done();
  })
});
