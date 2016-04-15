const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../server')

describe('Server Tests!', () => {
  it('should accept GET requests to /notes without error', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should make a POST request to /notes', (done) => {
    request('localhost:3000')
    .post('/notes')
    .send({ "name": "maverick"})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('thanks for submitting!');
      done();
    });
  });

});
