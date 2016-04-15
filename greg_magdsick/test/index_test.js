const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const server = require(__dirname + '/../index.js');

describe('HTTP server test', () => {
  it('should accept POST requests to /notes', () => {
    var time = new Date().getTime();
    request('localhost:7000')
      .post('/notes')
      .send({ 'type': 'test', 'testnumber': '' + time + '' })
      .end((err, res) => {
        expect(1).to.eql(2);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.contain('Data logged to: /data/');
      });
  });
  it('should accept GET requests to /notes', () => {
    request('localhost:7000')
      .get('/notes')
      .end((err, res) => {
        expect(1).to.eql(2);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.contain('The files in the log are: ');
      });
  });
});
