const { expect } = require("chai");
const formatDate = require("../../../src/utils/dateHelper");

describe("Date Helper", () => {
  it("should format a date correctly", () => {
    const date = new Date("2023-01-01T00:00:00Z");
    const formattedDate = formatDate(date);

    expect(formattedDate).to.equal("2023-01-01");
  });

  // Add more tests for edge cases
});
