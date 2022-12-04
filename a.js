var readline = require('readline');
var fs = require('fs');

var myInterface = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

const rucksacks = [];
const occuredTwice = [];
let length = 0;
let sumOfPriorities = 0;

const calcPriority = (char) => {
  if (char <= 'z' && char >= 'a') {
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  }
}


myInterface.on('line', function (line) {
  rucksacks.push([{}, {}]);
  const halfLen = line.length / 2;

  for (let i = 0; i < halfLen * 2; i++) {
    const ch = line[i]
    if (ch in rucksacks[length][(i < (halfLen)) ? 0 : 1]) {
      rucksacks[length][(i < (halfLen)) ? 0 : 1][ch]++;
    } else {
      rucksacks[length][(i < (halfLen)) ? 0 : 1][ch] = 1;
    }
  }
  length++;
}).on('close', () => {
  length = 0;
  for (const pair of rucksacks) {
    occuredTwice.push({});
    for (const compartment of pair) {
      for (const ch in compartment) {
        if (ch in occuredTwice[length]) {
          occuredTwice[length][ch]++;
        } else {
          occuredTwice[length][ch] = 1;
        }
      }
    }
    for (const ch in occuredTwice[length]) {
      if (occuredTwice[length][ch] === 2) {
        sumOfPriorities += calcPriority(ch);
      }
    }
    length++;
  }
  console.log(sumOfPriorities);
});
