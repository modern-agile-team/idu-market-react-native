import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmpty = function (value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export const setItemToAsync = (user, item) => {
  if (isEmpty(user)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(user, item, (error) => {
      if (error) {
        reject(error);
      }

      resolve(true);
    });
  });
};

export const getItemFromAsync = (user) => {
  if (isEmpty(user)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(user, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result === null) {
        resolve(null);
      }

      resolve(JSON.stringify(result));
    });
  });
};
