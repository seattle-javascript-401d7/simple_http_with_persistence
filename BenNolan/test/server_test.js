const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require(__dirname + '/../lib/server');

describe('The server', () => {
  after((done) => {
    server.close(() => {
      done();
    });
  });
  it('Should 404 on bad request', (done) => {
    request('localhost:3000')
    .get('/badroute')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res.status).to.eql(404);
      expect(res.text).to.eql('<h1>Error 404!</h1>');
      done();
    });
  });

  it('Should accept GET requests from /notes', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('<h1>Notes</h1>');
      done();
    });
  });

  it('Should accept POST requests from /notes', (done) => {
    request('localhost:3000')
    .post('/notes')
    .send({ 'note': 'notes' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('note notes');
      done();
    });
  });
});
