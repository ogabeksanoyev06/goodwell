import get from "lodash/get";
import truncate from "lodash/truncate";

const isEnableLang = (lang) => {
  switch (lang) {
    case "uz":
      return true;
    case "ru":
      return true;
    case "en":
      return true;
    default:
      return false;
  }
};
const isEnableCurrency = (currency) => {
  switch (currency) {
    case "uzs":
      return true;
    case "usd":
      return true;
    default:
      return false;
  }
};

const generateNewPath = (langCode, item, key = "slug") => {
  let newPath = "";

  const pathname = window.location.pathname;
  const splitPath = pathname.split("/");

  let _l = get(item, "translations", []).find((i) => i.lang === langCode);
  let hasL = isEnableLang(splitPath[1]);

  if (item) {
    if (_l) {
      let beingArr = ["", langCode];
      let arr = [];
      if (hasL) {
        arr = [...beingArr, splitPath[2], _l[key]];
      } else {
        arr = [...beingArr, splitPath[1], _l[key]];
      }
      newPath = arr.join("/");
    } else {
      let beingArr = ["", langCode];
      newPath = beingArr.join("/");
    }
  }

  if (!item) {
    if (isEnableLang(splitPath[1])) {
      splitPath[1] = langCode;

      newPath = splitPath.join("/");
    } else {
      let beingArr = ["", langCode];
      let arr = [...beingArr, ...splitPath.slice(1)];

      newPath = arr.join("/");
    }
  }

  return newPath;
};

const cutStringText = (word, length, last) => {
  if (typeof word === "string") {
    return truncate(word, {
      length: length,
      omission: last ? last : "...",
    });
  } else {
    return null;
  }
};

const formatDate = (date, format) => {
  let dt = new Date(date);
  let month = ("00" + (dt.getMonth() + 1)).slice(-2);
  let day = ("00" + dt.getDate()).slice(-2);
  let year = dt.getFullYear();
  let hours = ("00" + dt.getHours()).slice(-2);
  let minutes = ("00" + dt.getMinutes()).slice(-2);
  let seconds = ("00" + dt.getSeconds()).slice(-2);

  switch (format) {
    case "DD-MM-YYYY":
      return day + "-" + month + "-" + year;
    case "DD.MM.YYYY / HH:mm:ss":
      return day + "." + month + "." + year + " / " + hours + ":" + minutes + ":" + seconds;
    case "DD.MM.YYYY / HH:mm":
      return day + "." + month + "." + year + ", " + hours + ":" + minutes;
    default:
      return day + "." + month + "." + year;
  }
};

const stringToCode = (element) => {
  const content = element.textContent;

  function toNode(iframeString) {
    const isYoutube = iframeString.includes("youtube.com");
    const div = document.createElement("div");
    div.className = isYoutube ? "--youtube" : "";
    div.innerHTML = iframeString;
    return div;
  }
  const parent = element.parentNode;
  const childOembed = parent.querySelector("code");
  childOembed.replaceWith(toNode(content));
};

const convertToReadable = (number) => {
  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }
  let newValue;
  if (isFloat(Number(number))) {
    newValue = number.toString().split(".");
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    newValue = newValue.join(".");
  } else {
    newValue = String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return newValue;
};

const getFileThumb = (str, format = "low") => {
  // format small | normal | low
  if (str) {
    const a = str.split(".");
    if(a[a.length - 1] === 'svg'){
      return str
    }else {
      return a.slice(0, -1).join(".") + "_" + format + "." + a[a.length - 1];
    }
  } else return "";
};

function convertFileSize(_size) {
  let size = Number(_size);
  if (size < 1024) {
    return size.toFixed(2) + " B";
  } else if (size < 1024 * 1024) {
    let sizeInKB = size / 1024;
    return sizeInKB.toFixed(2) + " KB";
  } else {
    let sizeInMB = size / (1024 * 1024);
    return sizeInMB.toFixed(2) + " MB";
  }
}

const randomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};


const parseNumberOfHouse = (input) => {
  if (!input) return [0, 0];

  let string = String(input);

  return string.split("/").map((item) => (item[0] === "0" ? item[1] : item));
};

function gen4() {
  return Math.random()
      .toString(16)
      .slice(-4);
}

export default {
  parseNumberOfHouse,
  getFileThumb,
  isEnableLang,
  isEnableCurrency,
  generateNewPath,
  cutStringText,
  formatDate,
  stringToCode,
  convertToReadable,
  randomColor,
  convertFileSize,
  gen4
};
