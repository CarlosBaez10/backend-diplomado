const fs = require("fs");
const path = require("path");
const CustomError = require("./errors");

class JsonErrorReader {
  static readError(code) {
    try {
      const jsonFilePath = path.resolve("./src/data/errors.json");
      const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
      const data = JSON.parse(jsonData);
      if (data.hasOwnProperty(code)) {
        return data[code];
      } else {
        throw CustomError.notFound("AC1103");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = JsonErrorReader;
