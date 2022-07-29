const db = require("./models");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("./server");

const userController = require("./controllers/user.controller");
chai.use(chaiHttp);

const user = db.user;

describe("server ", () => {
  it("should get server", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        let serverMsg = res.body.message;
        expect(serverMsg).to.be.eql(
          "Welcome to Algeria School Manager Online Server."
        );
        done();
      });
  });
});

// before((done) => {
//   let users = [
//     "Mohamed amine",
//     "Tareb",
//     "tareb.mamine@gmail.com",
//     "0552679950",
//     "123456",
//   ];
//   done();
// });
// after((done) => {
//   let users = [
//     "Mohamed amine",
//     "Tareb",
//     "tareb.mamine@gmail.com",
//     "0552679950",
//     "123456",
//   ];
//   done();
// });

describe("user.controller", () => {
  it("should create a user", (done) => {
    const users = {
      firstName: "Mohamed amine",
      lastName: "Tareb",
      username: "cyx",
      email: "tareb.mamine@gmail.com",
      phone: "0552679950",
      password: "123456",
    };

    userController.create(users);
    chai
      .request(server)
      .post("/api/users")
      .end((err, res) => {
        res.should.have.status(200);
        //res.body.should.be.a("object");
        let serverMsg = res.body;
        console.log("lol", serverMsg);
        expect(serverMsg).to.be.eql("User created");
        done();
      });
  });

  //   it("should get error when user is not created correctly", (done) => {});
  //   it("should get user by id", (done) => {});
  //   it("should return error when user is not found when searched by id", (done) => {});
  //   it("should get user by keyword", (done) => {});
  //   it("should return error when user is not found when searched by keyword", (done) => {});
  //   it("should update user & return updated user in json", (done) => {});
  //   it("should return error when user is not updated", (done) => {});
  //   it("should delete user by id", (done) => {});
  //   it("should return error when user is not found when deleting", (done) => {});
  //   it("should delete all user", (done) => {});
  //   it("should return error when all user are not deleteed", (done) => {});
});
