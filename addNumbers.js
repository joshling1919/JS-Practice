const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Number?",(res) => {
      console.log(sum += parseInt(res));
      numsLeft--;
      addNumbers(sum,numsLeft,completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));


function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}\n`,(res) => {
    callback((res === "1" ? true : false));
  });
}

// askIfGreaterThan(1, 2, res => console.log(res));

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i+1], isGreaterThan => {
      // console.log("index = " + i);
      if (isGreaterThan) {
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
        madeAnySwaps = true;
      }
      i++;
      innerBubbleSortLoop(arr,i,madeAnySwaps,outerBubbleSortLoop);
    });
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

// innerBubbleSortLoop([3,2,1],0,false,() => console.log("in outer"));

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps){
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}
absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
