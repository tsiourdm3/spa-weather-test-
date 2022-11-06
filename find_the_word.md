/*
Let us define a precedence string as follows:
"F>E" means that in the word, the letter "F" comes before the letter "E".

The objective of this test is to implement the find_the_word function.
When passed a list of precedences, the function will return the word associated to the input.
There are no duplicate letters in the word.

For example:
------------

findTheWord(["G>W","W>F"]) should return GWF
findTheWord(["E>R","R>S","S>O","O>N","P>E"]) should return PERSON

*/

function findTheWord(letters) {
let newArray = [];
for(let i=0; i< letters.length; i++){
newArray.push(letters[i].substring(0,1));
}
let last = letters[letters.length -1].substring(letters.length);
newArray.push(last);

return newArray.join("")
}
