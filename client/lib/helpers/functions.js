/**
 *
 * @param array
 * @param elementIndex
 * @param updator
 * @returns {[*,*,*]}
 *
 * This is a generic function used to
 * update an obj in an array
 * without mutation.
 *
 * Ex:-
 * let array = [{a:1}, {a:2}, {a:3}]
 * updateSingleObjectInArray(array, 1, obj=>{obj.a=5000})
 * // [{a:1}, {a:5000}, {a:3}]
 *
 * This creates a new array with a new object
 * at the specified index consisting of updated
 * fields as specified by the updator function
 *
 * This method can also be used to push to an array
 * immutably.
 *
 * Ex:-
 * let array = [{a:1}, {a:2}, {a:3}]
 * let newElement = {a: 600}
 * updatedArray = updateSingleObjectInArray(array, array.length,
 *                           obj=>Object.assign(obj, newElement))
 * // [{a:1}, {a:2}, {a:3}, {a: 600}]
 * This method takes advantage of the fact that
 *   -  array[array.length] evaluates to undefined
 *   -  Object.assign({}, undefined) evaluates to {}
 *   -  Object.assign(obj, {a: 'something'}) mutates the
 *      first argument obj, and updates its fields
 */
export const updateSingleObjectInArray = (array, elementIndex, updator) => {
  const objectToUpdateClone = {...array[elementIndex]};
  updator(objectToUpdateClone);
  return [
    ...array.slice(0, elementIndex),
    objectToUpdateClone,
    ...array.slice(elementIndex + 1)
  ];
};

export const random = (lowerLimit, upperLimit) => (   // upper limit is inclusive here
  ((Math.random() * (upperLimit - lowerLimit + 1)) | 0) + lowerLimit
);

export const generateRandomHexadecimalStringOfLength = stringLength => random(
  parseInt('1' + '0'.repeat(stringLength - 1), 16),
  parseInt('f'.repeat(stringLength), 16)
).toString(16);

export const clip = (str, length) => str.length < length ? str : str.substring(0, length - 3) + '...';

/* https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript  */
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
