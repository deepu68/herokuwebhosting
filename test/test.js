const chai = require("chai");
const chaihttp = require("chai-http");
const item = require("./items.json");
const server = require("../index");

chai.use(chaihttp);
chai.should();

describe("input1", function () {
  it("Get", function (done) {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Post", function (done) {
    chai
      .request(server)
      .post("/")
      .send(item.details.input1.a)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Post", function (done) {
    chai
      .request(server)
      .post("/")
      .send(item.details.input1.b)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Post", function (done) {
    chai
      .request(server)
      .post("/")
      .send(item.details.input1.c)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Calculate tax", function (done) {
    chai
      .request(server)
      .get("/calculate")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  after(function (done) {
    chai
      .request(server)
      .get("/newReceipt")
      .end(() => {
        done();
      });
  });
});

describe("input2", function () {
  it("Post", function (done) {
    chai
      .request(server)
      .post("/")
      .send(item.details.input2.a)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Post", function (done) {
    chai
      .request(server)
      .post("/")
      .send(item.details.input2.b)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Calculate tax", function (done) {
    chai
      .request(server)
      .get("/calculate")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  after(function (done) {
    chai
      .request(server)
      .get("/newReceipt")
      .end(() => {
        done();
      });
  });
});
