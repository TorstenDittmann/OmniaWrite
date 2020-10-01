const fs = require("fs");
const path = require("path");

const getFileContent = function (filename) {
  const dataBuffer = fs.readFileSync(path.join(pathLangs, filename));
  const data = dataBuffer.toString();
  return JSON.parse(data);
}
const parseKeys = function (obj) {
  const isObject = val =>
    typeof val === 'object' && !Array.isArray(val);

  const addDelimiter = (a, b) =>
    a ? `${a}.${b}` : b;

  const paths = (obj = {}, head = '') => {
    return Object.entries(obj)
      .reduce((product, [key, value]) => {
        let fullPath = addDelimiter(head, key)
        return isObject(value) ?
          product.concat(paths(value, fullPath)) :
          product.concat(fullPath)
      }, []);
  }

  return paths(obj);
}


const enFile = "en.json"
const pathLangs = path.join(__dirname, '../src/lang/');


try {
  const enData = getFileContent(enFile);
  console.log(parseKeys(enData))
} catch (e) {
  console.log(`Could not find ${enFile} location`);
}