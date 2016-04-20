const chai = require('chai');
const fs = require('fs');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const startServer = require(__dirname + '/../index');
const dir = __dirname + '/../notes';

describe('The server', () => {
  after((done) => {
    startServer.close(() => {
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
    var files = fs.readdirSync(dir);
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql(files.toString());
      done();
    });
  });

  it('Should accept POST requests from /notes', (done) => {
    var nextFile = fs.readdirSync(__dirname + '/../notes').length + 1;
    request('localhost:3000')
    .post('/notes')
    .send({ 'Hello': 'from json' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.include('file created');
      fs.readFile(__dirname + '/../notes/' + nextFile + '.json', (err, data) => {
        if (err) throw err;
        var parsed = JSON.parse(data);
        expect(parsed).to.eql({ 'Hello': 'from json' });
        done();
      });
    });
  });
});
