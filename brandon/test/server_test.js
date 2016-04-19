const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require(__dirname + '/../server');
const fs = require('fs');
const dir = __dirname + '/../notes';

describe('The HTTP server response', () => {
  after((done) => {
    server.close();
    done();
  });
  it('should accept GET requests to /notes', (done) => {
    var fileList = fs.readdirSync(dir);
    request('localhost:3000')
      .get('/notes')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(fileList.toString());
        done();
      });
  });

  it('should recieve POST request as JSON', (done) => {
    var nextFile = fs.readdirSync(__dirname + '/../notes').length + 1;
    request('localhost:3000')
    .post('/notes')
      .send({
        'hello': 'this is json'
      })
      .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('file created');
        fs.readFile(__dirname + '/../notes/note_' + nextFile + '.json', (err, data) => {
          if (err) throw err;
          var parsed = JSON.parse(data);
          expect(parsed).to.eql({ 'hello': 'this is json' });
      done();
    });
  });
});

  it('should throw a 404 error on failure', (done) => {
    request('localhost:3000')
    .get('/badroute')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res.status).to.eql(404);
      expect(res.text).to.eql('this be a 404, yo');
      done();
    });
  });
});
