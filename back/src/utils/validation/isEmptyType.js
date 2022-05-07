import { typeName } from "./typeName";
const isEmptyObj = (obj) => {
  if (typeName(obj) === "Object" && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};

const isEmptyArray = (arr) => {
  if (typeName(arr) === "Array" && arr.length === 0) {
    return true;
  }

  return false;
};

export { isEmptyArray, isEmptyObj };