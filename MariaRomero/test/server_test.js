const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../lib/server');

describe('the server', () => {
  it('should accept GET requests to /notes', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
  it('should accept POST requests to /notes', (done) => {
    request('localhost:3000')
    .post('/notes')
    .send({ 'test': 'maria' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('maria');
      done();
    });
  });
  it('should 404 on bad requests', (done) => {
    request('localhost:3000')
    .get('/badRoute')
    .end( (err, res) => {
      expect(res.status).to.eql(404);
      expect(res.text).to.eql('error 404: not found');
      done();
    });
  });
});
