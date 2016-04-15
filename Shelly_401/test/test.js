const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../server');

describe('http with storage', () => {
  it('should accept GET requests to /notes', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
    expect(err).to.eql(null);
    expect(res).to.have.status(200);
    expect(res.text).to.equal('Lorem ipsum');
      done();
  });
  });

  it('should 404 on bad requests', (done) => {
    request('localhost:3000')
    .get('/badroute')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('404 message');
      done();
    });
  });

it('should accept POST requests', (done) => {
  request('localhost:3000')
  .post('/greeting')
  .send({ 'hello':'world' })
  .end((err, res) => {
    expect(err).to.eql(null);
    expect(res).to.have.status(200);
    expect(res.text).to.eql('world');
    done();
  });
});
});
