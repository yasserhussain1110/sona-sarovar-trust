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
  let objectToUpdateClone = {...array[elementIndex]};
  updator(objectToUpdateClone);
  return [
    ...array.slice(0, elementIndex),
    objectToUpdateClone,
    ...array.slice(elementIndex + 1)
  ];
};