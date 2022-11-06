// Given the following array `[[1,2,3,4,5], [1,2,3,4,5]]`
// write a function called arrayOps, which will produce the following outcome:
// `[0,2,6,12,20,5,12,21,32,45]`


let arr= [[1,2,3,4,5], [1,2,3,4,5]];

function arrayOps(arr) {

  let newArray = [];
  if(arr.length !== 0){
    arr.forEach(element => {
     console.log(element);
     for(let i = 0; i < element.length; i++) { 
      if(newArray.length < 5){
        newArrayEl = element[i] * element[i] - element[i];
        newArray.push(newArrayEl);
      }else{
        newArrayel = newArray.length * element[i];
        newArray.push(newArrayel);
      }
  }
  console.log(newArray)
  })
}

arrayOps(arr);

//the result in the console will be [0,2,6,12,20,5,12,21,32,45]
