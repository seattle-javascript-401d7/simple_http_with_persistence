const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../server');

describe('vanilla server test', () => {
  it('should accept GET requests to /thisroute', (done) => {
    request('localhost:3000')
    .get('/thisroute')
    .end((err, res) => {
    expect(err).to.eql(null);
    expect(res).to.have.status(200);
    expect(res.text).to.eql("something I'll put in later");
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
