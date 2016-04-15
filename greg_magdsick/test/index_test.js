const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
var server = require(__dirname + '/../index.js');

describe('HTTP server test', () => {
  after(() => {
    server.close();
  });
  it('should accept POST requests to /notes', (done) => {
    var time = new Date().getTime();
    request('localhost:7000')
      .post('/notes')
      .send({ 'type': 'test', 'testnumber': '' + time + '' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.contain('Data logged to: /data/');
        fs.readdir(__dirname + '/../data', (err, files) => {
          if (err) return process.stderr.write(err);
          var file = fs.readFileSync(__dirname + '/../data/' + files[files.length - 1], 'utf8');
          expect(file).to.contain(time);
          done();
        });
      });
  });
  it('should accept GET requests to /notes', (done) => {
    request('localhost:7000')
      .get('/notes')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.contain('The files in the log are: ');
        done();
      });
  });
});
