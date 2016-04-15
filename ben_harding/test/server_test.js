const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');
var slothbear = require(__dirname + '/../server');

var server = slothbear.server(5000, __dirname + '/data');

describe('slothbear server', () => {
  var oldNumFiles = 0;
  before((done) => {
    oldNumFiles = fs.readdirSync(__dirname + '/data').length;
    done();
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });

  it('should receive a post request to /notes and write a file', (done) => {
    var object = { 'name': 'slothbear' };
    request('localhost:5000')
      .post('/notes')
      .send(object)
      .end((err, res) => {
        var newNumFiles = fs.readdirSync(__dirname + '/data').length;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(newNumFiles).to.eql(oldNumFiles + 1);
        done();
      });
  });

  it('should receive a get request to /notes and return the number of files', (done) => {
    request('localhost:5000')
      .get('/notes')
      .end((err, res) => {
        var files = fs.readdirSync(__dirname + '/data');
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('files stored: ' + files.join(', '));
        done();
      });
  });

  it('should return the corresponding file from when requested from /notes', (done) => {
    var fileNumber = 0;
    request('localhost:5000')
      .get('/notes/' + fileNumber)
      .end((err, res) => {
        var fileData = fs.readFileSync(__dirname + '/data/' + fileNumber + '.json');
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(fileData.toString());
        done();
      });
  });


  it('should 404 on bad requests', (done) => {
    request('localhost:5000')
      .get('/badroute')
      .end((err, res) => { // eslint-disable-line handle-callback-err
        expect(res).to.have.status(404);
        expect(res.text).to.eql('404: delicious ants not found');
        done();
      });
  });
});
