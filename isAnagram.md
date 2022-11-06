// Create a function called isAnagram, which given two strings, returns true if they are anagrams of one another.
// For example: `Listen` is an anagram of `Silent`

function isAnagram(first, second) {

// Sanitizing
first = first.toLowerCase().replace(/[\W_]+/g, "");
second = second.toLowerCase().replace(/[\W_]+/g, "");

// sorting
const firstSorted = first.split("").sort().join("");
const secondSorted = second.split("").sort().join("");

return firstSorted === secondSorted;
}


isAnagram("mike", "ikme");
