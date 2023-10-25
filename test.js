const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./app");
const userObjs = require("./userDB");
const productObjs = require("./productDB");

const expect = chai.expect;
chai.use(chaiHttp);

describe("User and Product API", () => {
  it("should retrieve the product summary for a valid user", (done) => {
    chai
      .request(app)
      .get("/get-user-product-summary/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("user_id", 1);
        expect(res.body).to.have.property("name", "User1");
        expect(res.body).to.have.property("email", "user1@example.com");
        expect(res.body).to.have.property("product_summary").to.be.an("array");

        done();
      });
  });

  it("should return 404 for an invalid user", (done) => {
    chai
      .request(app)
      .get("/get-user-product-summary/999")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("message", "User not found");
        done();
      });
  });
});
