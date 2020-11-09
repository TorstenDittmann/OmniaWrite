const fs = require("fs");
const path = require("path");

const getFileContent = function (filename) {
  const dataBuffer = fs.readFileSync(path.join(pathLangs, filename));
  const data = dataBuffer.toString();
  return JSON.parse(data);
};
const parseKeys = function (obj) {
  const isObject = val => typeof val === "object" && !Array.isArray(val);

  const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

  const paths = (obj = {}, head = "") => {
    return Object.entries(obj).reduce((product, [key, value]) => {
      let fullPath = addDelimiter(head, key);
      return isObject(value) ?
        product.concat(paths(value, fullPath)) :
        product.concat(fullPath);
    }, []);
  };

  return paths(obj);
};

const enFile = "en.json";
const pathLangs = path.join(__dirname, "../src/lang/");

var fileList = [];
var enKeys = [];
try {
  fileList = fs.readdirSync(pathLangs);

  fileList.splice(fileList.indexOf(enFile), 1);
} catch (e) {
  console.log(`Could not find ${pathLangs} location`);
}

// get content from en.js and parse keys
try {
  const enData = getFileContent(enFile);
  enKeys = parseKeys(enData);
} catch (e) {
  console.log(`Could not find ${enFile} location`);
}
var missKey = [];
fileList.forEach(fileLang => {
  const lang = fileLang.split(".").slice(0, -1).join(".");
  const langData = getFileContent(fileLang);
  const langKeys = parseKeys(langData);

  missKey[lang] = enKeys.filter(key => !langKeys.includes(key));
});

const totalKeys = enKeys.length;

missKey = Object.entries(missKey);

missKey.forEach(x => {
  const nKeys = x[1].length;
  const perc = (((totalKeys - nKeys) * 100) / totalKeys).toFixed(0);
  if (perc < 100) {
    console.log(x[0] + ": \x1b[31m%s\x1b[0m", perc + "%");
  } else {
    console.log(x[0] + ": \x1b[32m%s\x1b[0m", perc + "%");
  }
  if (nKeys > 0) {
    console.log("Missing the following keys:");
    console.group();
    x[1].forEach(key => {
      console.log(`- ${key}`);
    });
    console.groupEnd();
  }
});
