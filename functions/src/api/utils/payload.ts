import {firestore} from "../../firebase";

interface ObjectWithValues {
  [key: string]: any;
}

export const compact = (obj: ObjectWithValues): ObjectWithValues => {
  const newObj: ObjectWithValues = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = compact(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};

export const checkDuplicatedKey = async (collection: string, key: string) => {
  const existingRecord = await firestore
      .collection(collection)
      .doc(key)
      .get()
      .then((doc) => {
        return doc.data();
      });

  if (existingRecord !== undefined) {
    return key;
  }
  return undefined;
};

export const compactArray = (
    arr: Array<string | undefined | null>
) => {
  return arr.filter((el) => {
    return el !== null && el !== undefined
  })
};

type LineBeacon = {
  hardwareId: string;
  passcode: string;
};

export const checkDuplicatedHardwareIds = async (lineBeacon: LineBeacon[]) => {
  const results = lineBeacon.map((el) =>
    checkDuplicatedKey("LineBeacon", el.hardwareId)
  );
  return Promise.all(results);
};
