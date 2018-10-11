export function isObjectEmpty(obj) {
  if(Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  } else {
    return false;
  }
}

export function isArrayEmpty(array) {
  return array.length <= 0;
}

// Based on this article https://bit.ly/2tHkeo7
export function arrayToObject(array, keyField) {
  return array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {});
}