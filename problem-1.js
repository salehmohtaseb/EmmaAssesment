// function to return all common character in all elements in an array

function getCommonChars(arr) {
    if(arr.length == 0) {
        return []
    }
    let tempArray = arr.map(function(item) {
        return [...new Set(item.split(''))].join('');
      }).sort(function(a, b) {
        return a.length - b.length
      })
    
      let firstElm = tempArray[0].split('');
      let restElem = tempArray.splice(1);
      let countObject = {}
    
      for (let i = 0; i < firstElm.length; i++) {
        let z = findIfIncludes(restElem, firstElm[i]);
        if (z.length === restElem.length) {
          countObject[firstElm[i]] = 1;
        } else {
          countObject[firstElm[i]] = 0
        }
      }
    
      function findIfIncludes(arr, char) {
        return arr.filter(item => item.includes(char))
      }
      var commons = []
      for (let keys in countObject) {
        if (countObject[keys] > 0) {
          commons.push(keys)
        }
      }
      return commons;
}

console.log(getCommonChars([
    "hello world",
    "this is a test",
    "this is an example",
]))
