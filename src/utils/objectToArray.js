export default function objectToArray(objectAsMap) {
  return  Object.keys(objectAsMap).reduce((arr, key) => {
    arr.push(objectAsMap[key])
    return arr
  }, [])
}