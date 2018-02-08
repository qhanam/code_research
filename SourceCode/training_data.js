const fs = require("fs");
const rimraf = require('rimraf');

const DataDir = "./TrainingData/";
const TokensCorrectDir = "./TokensCorrect/";
const TokensBuggyDir = "./TokensBuggy/";

if(!fs.existsSync(TokensCorrectDir) || !fs.existsSync(TokensBuggyDir)){
        console.log("Please make sure you have Tokens.")
        process.exit(1);
}

if(fs.existsSync(DataDir)){
  rimraf.sync(DataDir);
}

fs.mkdirSync(DataDir);
fs.openSync(DataDir + 'examples.correct', 'w');
fs.openSync(DataDir + 'examples.buggy', 'w');

var correct_examples = [];
var correct_files = fs.readdirSync(TokensCorrectDir);
correct_files.forEach(file => {
    let name = file.slice(0, -8);
    correct_examples.push(name);
});

var buggy_examples = [];
var buggy_files = fs.readdirSync(TokensBuggyDir);
buggy_files.forEach(file => {
    let name = file.slice(0, -8);
    buggy_examples.push(name);
});

//TODO write to single buggy file, write to single correct file examples are kept in order
correct_files.forEach(function(file){
  var tokenCorrect = JSON.parse(fs.readFileSync(TokensCorrectDir + file, "utf-8"));
  var tokens = '';
  for(var i = 0; i < tokenCorrect.length; i++)
  {
    if(!tokenCorrect[i].value){
      tokens += tokenCorrect[i].type.label;
    }
    else
    {
      tokens += tokenCorrect[i].value;
    }
  }  

  console.log("-----------\n"); 
  console.log(tokens);  
 
  fs.appendFileSync(DataDir + 'examples.correct', tokens + "\n");
});

buggy_files.forEach(function(file){
  var tokenBuggy = JSON.parse(fs.readFileSync(TokensBuggyDir + file, "utf-8"));
  
  var tokens = '';
  for(var i = 0; i < tokenBuggy.length; i++)
  {
    if(!tokenBuggy[i].value){
      tokens += tokenBuggy[i].type.label;
    }
    else
    {
      tokens += tokenBuggy[i].value;
    }
  }  

  fs.appendFileSync(DataDir + 'examples.buggy', tokens + "\n");
});