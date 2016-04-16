const request = require('superagent');
const chai = require('chai');
const expect = chai.expect;

describe('data store ', () => {
  it('should respond to GET requests', (done) => {
    request
      .get('localhost:3030/awesomeUrl')
      .end((err, res) => {
        expect(err).to.eql('undefined');
        // because linter doesn't like .to.exist
        expect(res).to.not.eql('undefined' || 'null');
        expect(res.status).to.eql(200);
      });
    done();
  });
  it('should also take a POST request', (done) => {
    request
      .post('localhost:3030/awesomeUrl')
      .set('Content-Type', 'application/json')
      .send('{"there": "can be only one"}')
      .end((err, res) => {
        expect(err).to.eql('undefined');
        expect(res).to.not.eql('undefined' || 'null');
        expect(res.status).to.eql(200);
      });
    done();
  });
});
