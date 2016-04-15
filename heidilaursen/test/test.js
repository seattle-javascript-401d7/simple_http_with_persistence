const chai = require('chai');
const expect = require('chai-http').expect;
const expect

describe('the http server', () => '/lib/server');
  it('should accept GET requests to /time and respond with current time', (done) => {
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.eql('' + new Date());
      done();
    });
  });

  it('should accept GET request to /greeting/name and greet name' (done) => {
    request('localhost:3000')
    .get('/greet/name')
    .end(err, res) => {
      exect(err).to.eql(null);
      expect(res.txt).to.eql('hello' + name);
      done();
    }
  })
});
