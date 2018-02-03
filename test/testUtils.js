const utils = require('../app/utils');
const expect = require("chai").expect;

describe("Utils", function() {
  describe("Date Helpers", function() {
      it("Formats date strings to the dd.MM.yyyy date format", function() {
          // full date
          let dateString = "Thu Jan 18 2018 10:00:00 GMT+0000 (GMT)"
          let dateFormat = utils.formatDate(dateString)
          expect(dateFormat).to.equal("18.1.2018");

          // milliseconds since 1970
          dateString = 1516665600000
          dateFormat = utils.formatDate(dateString)
          expect(dateFormat).to.equal("23.1.2018");

          // test input handling
          let regex = new RegExp(utils.errors.invalidInput.formatDate.message);
          expect(() => utils.formatDate("abcd")).to.throw(regex);
      });
  });
});
