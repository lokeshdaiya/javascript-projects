(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var eng_words = require('an-array-of-english-words');
var letterArray = [];
var minLet = 3;

function toggleBlockDisplay(HTMLElement) {
  var style = HTMLElement.style.display;
  if (style === "none") {
    HTMLElement.style.display = "block";
  } else {
    HTMLElement.style.display = "none";
  }
}

function done() {
  letterArray = document.getElementById('letters').value.toLowerCase().split('');
  toggleBlockDisplay(document.getElementById('giveLetters'));
  document.getElementById('letterArray').textContent = letterArray.join(", ");
  minLet = document.getElementById('minLetters').value || minLet;
  console.log(minLet);
  var x = verify();
  console.log(x);
}

function reset() {
  document.getElementById('giveLetters').style.display = 'block';
  document.getElementById('letters').value = '';
  document.getElementById('letterArray').textContent = "";
  document.getElementById('subsetArray').textContent = "";
  letterArray = [];
  minLet = 3;
}

function findSubsets(a) {
  var subsets = [];
  // base case
  if (a.length === 0) {
    subsets = [[]];
    return subsets;
  }
  // recursive case
  var last = a.pop();
  var presubs = findSubsets(a);
  for (var i = 0; i < presubs.length; i++) {
    subsets.push(presubs[i].slice());
  }
  for (i = 0; i < presubs.length; i++) {
    presubs[i].push(last);
    subsets.push(presubs[i]);
  }
  return subsets;
}

function trimSubsets() {
  var subs = findSubsets(letterArray);
  subs = subs.filter(array => array.length >= minLet);
  return subs;
}

function permute(array) {
  // BASE CASE
  if (array.length === 1) {
    return [array];
  }
  // RECURSIVE CASE
  var permutations = [];
  var lastElement = array.pop();
  var previous = permute(array);
  for (var i = 0; i < previous.length; i++) {
    for (var j = 0; j <= previous[i].length; j++) {
      previous[i].splice(j, 0, lastElement);
      permutations.push(previous[i].slice());
      previous[i].splice(j, 1);
    }
  }
  return permutations;
}

function permuteSubsets() {
  var subsets = trimSubsets();
  var perms = [];
  for (var i = 1; i < subsets.length; i++) {
    perms.push(permute(subsets[i]));
  }
  perms = perms.flat(1);
  for (i = 0; i < perms.length; i++) {
    perms[i] = perms[i].join('');
  }
  return perms;
}

function verify() {
  var finals = permuteSubsets();
  console.log(finals);
  finals = finals.filter(word => eng_words.indexOf(word) >= 0);
  return finals;
}

},{"an-array-of-english-words":2}],2:[function(require,module,exports){
},{}]},{},[1]);