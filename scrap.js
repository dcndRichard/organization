function recursiveBinarySearch(arr, target, start, end) {
  //sort array using a built-in javascript array sorter
  arr.sort((a, b) => a - b);

  //establish a base case.
  if (start > end) return false;

  //declare midpoint index for arr
  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) return true;
  if (arr[mid] > target) {
    return recursiveBinarySearch(arr, target, start, mid - 1);
  } else {
    return recursiveBinarySearch(arr, target, mid + 1, end);
  }
}
let nums = [3, 5, 10, 13, -9, 28, 9, 14, 5, 7, 19];
let target = 5;
let start = 0;
let end = arr.length - 1;
let args = [nums, target, start, end];

let isTargetFound = recursiveBinarySearch(...args);
console.log(isTargetFound);









// console.log(idGenerator(22,10))
// let idGenerator = ((initialNum, max) => {
//   let ids = [];
//   for (let i = initialNum; i < initialNum + max; i++) {
//     ids.push(i);
//   }
//   return ids;
// })(1001, 10);
// console.log(idGenerator);

/* function addMember(fname = "john", lname = "doe") {
  let members = new Array(5);
  for (let i:number = 0; i < 9; i++) {
    //a random id is grabed from the idGenerator, then converted form a array to string to integer.
    members.push({
      id: parseInt(
        idGenerator.splice(randRange(0, idGenerator.length - 1), 1).join("")
      ),
      fname: fname,
      lname: lname
    });
  }
  return members;
} */
// console.log(idGenerator)
// for (let item of members) {
//     item.push("s")
//     // item["id"] = idGenerator.splice(randRange(0, idGenerator.length - 1), 1);
// }
// console.log(members);
// let id = idGenerator.splice(randRange(0,idGenerator.length-1), 1);
// console.log(id)