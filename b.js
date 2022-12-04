var readline = require('readline');
var fs = require('fs');

var myInterface = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

const rucksacks = [];
const occuredInGroups = [];
let length = 0;
let group = 0;
let sumOfPriorities = 0;

const calcPriority = (char) => {
  if (char <= 'z' && char >= 'a') {
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  }
}


myInterface.on('line', function (line) {
  rucksacks.push({});
  const len = line.length;

  for (let i = 0; i < len; i++) {
    const ch = line[i]
    if (ch in rucksacks[length]) {
      rucksacks[length][ch]++;
    } else {
      rucksacks[length][ch] = 1;
    }
  }
  length++;
}).on('close', () => {
  group = 0;
  for (let i = 0; i < length; i++) {
    const rucksack = rucksacks[i];
    if (i % 3 === 0) {
      occuredInGroups.push({});
      group++;
    }
    for (const ch in rucksack) {
      if ((ch) in occuredInGroups[group - 1]) {
        occuredInGroups[group - 1][ch]++;
      } else {
        occuredInGroups[group - 1][ch] = 1;
      }
    }
  }
  occuredInGroups.forEach(element => {
    for (const key in element) {
      if (element[key] !== 3) {
        delete element[key];
      }
    }
  });

  console.log(occuredInGroups)

  occuredInGroups.forEach(group => {
    for (const key in group) {
      sumOfPriorities += calcPriority(key);
    }
  })

  console.log(sumOfPriorities)

});
