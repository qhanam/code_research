/**
 * abstract.js
 * A tool for building the sequence sets for NMT.
 */

const fs = require("fs");
const VocabFactory = require("./utilities/vocab-factory.js");
const AbstractionFactory = require("./utilities/abstraction-factory.js");

/* Read the sequence pairs from JSON. */
let jsonFile = process.argv[2];
let sequenceOut = process.argv[3];
let vocabOut = process.argv[4];
if(!fs.existsSync(jsonFile) || !sequenceOut || !vocabOut) {
  console.log("Usage: node abstract.js [input-sequences.js] [output-sequences.js] [output-vocab.js]");
  process.exit(1);
}
let data = JSON.parse(fs.readFileSync(jsonFile)).data;

/* Build the vocabulary. */
let vocab = VocabFactory.build(data);

/* Build the abstracted sequence set. */
AbstractionFactory.buildAbstractSequenceSet(data, vocab.getTopN(5));

