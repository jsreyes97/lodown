'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;
/*identity: identifies the value of the given value 
*@param value: any data type.
*@return: Returns the value
*/
function identity(value){
        return value;
}
module.exports.identity = identity;
/*typeOf: designed to identify the data type of a given value
*@param: value: any data type 
*@ return: returns the type of data type given 
*/
function typeOf(value){
    if(Array.isArray(value)){
        return 'array';
    }else if(value === null){
        return 'null';
    }else{
        return typeof value;
    }
}
module.exports.typeOf = typeOf;
/*indexOf:designed to find the index of an element inside of an array
*@param: array 
*@param: value
*@return: Returns the index of an element in an array
*/
function indexOf(arr, value){
    //if value is given return index 
    for(let i =0; i < arr.length;i++){
       if(value === arr[i]){
           return i;
       } 
    }
     return -1;
}
module.exports.indexOf = indexOf;
/*first: designed to print the first element of an array
*@param: array
*@param: number
*@Edge Case: What if <number> is negative?
*@edge Case: What if <number> is greater than <array>.length?
*@return: returns the frist index of an array
*/
function first(array, number) {
  if(!Array.isArray(array) || number < 0){
        return [];// returning a literal array if it's not array, or number not in array
    }else if(typeof number !=='number' || number === 'null'){ // checks if number is not a number or null, returns first element in array
        return array[0];// returns the first element number is not a number/not given
    }else if(array.length !== number){// checks if length of array does not equal number
        return array.slice(0, number);// selects part of the array from index zero to number if array length does not equal number
    }else{
        return array; //returns array if otherwise
    }
}
module.exports.first = first;
/*last: designed to print the last inex of an array
*@param: array
*@param: number
*@Edge Case: What if <number> is negative?
*@Edge Case: What if <number> is greater than <array>.length?
*@return: returns the last index of an array
*/
function last(array, number){
    if(!Array.isArray(array) || number < 0){ //checks if it's not an array
        return[]; // returns empty array literal if the given collection is not an array
    }else if(typeof number !== 'number' || number === null){//checks if number is a 'number' or not given
        return array[array.length-1];//returns the last element of the array if number is not a 'number' or not given
    }else if(array.length < number){
        return array;//returns the given array if the length of the array is less than the number given
    }else if(array.length !== number){
        return array.splice(number - 1, array.length -1);//removing elements from the array and returning them in a new array 
    }
}
module.exports.last = last;
/*contains: designed to find a certian value inside of an array
*@param: array
*@param: value
*return: Retruns a boolean weather an array contains a certian value or not
*/
function contains(array, value){
    //looping over the given array
    for(var i = 0; i < array.length; i++){
      if(array[i] === value){
          // returns true if the given array contains the given value
          return true; 
}
      }
      return false;//returns false otherwise
    }
module.exports.contains = contains;
/*unique: returns an array containing one of each of the elements from the array that was passed in. No duplicates.
*@param: array
*/
function unique(array){
    var result = [];
    for(var i = 0; i < array.length;i++){
        if(indexOf(result, array[i]) === -1){
            result.push(array[i]);
        }
    }
    return result;
}
module.exports.unique = unique;
/*filter:designed to create a new array with all elements that pass the test implemented by the provided function.
*@param: array
*@param: function
*@return: returns a new array with all elements that pass the condition.
*/
function filter(array, action){
    var filterArray = [];
    //use each to access every element, index, and the entire array
    each(array, function(elements, index, array){
    // if you pass elements inside the function and returns true 
        if(action(elements, index, array) === true){
    // push into the filterArray
            filterArray.push(elements);
            
        }
    });
    return filterArray;
    
}
 module.exports.filter = filter;
 /*reject: takes an array of the elements that returned false when passed through the function
 *@param: array , function
 *@return: Returns falsey values into a new array
 */
 function reject(array, test){
    //declares a resulting array
    var results = []; 
    filter(array, function(element, index, array){
        // test function to see elements that failed test
       if(test(element, index, array) === false){ 
       // pushing elements that failed into the new array
           results.push(element);
       }
});
return results;
}
module.exports.reject = reject;
/*partition:designed to take one array and return two seperate arrays, one for truthies, and one for falseys
*@param: array, function
*@return: returns an array into sub arrays
*/
function partition(array, test){
    //declares  new array containing arrays as elements to collect all elements that passed/failed the test 
    var result1 = [[], []];
    //using _.filter to loop over the given array to create a new array of elements that pass the test
    filter(array, function(element,index,array){
        index = index++;
        //checking elements in the array that pass the test
        if(test(element, index, array)){
            //pushing elements for which the test resulted true to first array in result1 
            result1[0].push(element);
        }else{
            //pushhing elements for which the test resulted false to the secon array in result1
            result1[1].push(element);
        }
    });
    //returning result1
    return result1;
}
module.exports.partition = partition;
/*map: Designed to creates a new array with the results of calling a provided function on every element in the calling array.
*@param: Collection[Array],{Object}, function
*@return: Returns an array of the results of a condition.
*/
function map(collection, test){
    //declaring a vaiable result1 
    let result1 = [];
    //using _.filter to loop over the given collection  
    filter(collection, function(element, index, array){
        //pushing the elements for which the test resulted true to the array result1
        result1.push(test(element, index, array));
    });
    // return result1
    return result1; 
}
module.exports.map = map;
/*pluck: takes an array of objects and returns their values into an array
*@param: array
*@param: value
*/
function pluck(array, value){
    //declare a variable list
    var list = [];
    //using _.each to loop over the given array
    each(array, function(element, index, array){
        //accessing the value of each object element, and pushing each to the list array declared 
       list.push(element[value]);
       //returning list
    }); return list;
}
module.exports.pluck = pluck;
/*every: designed to check if all elements in an array pass a test and add them to an array
*@param: collection: [Array], {Object}
*@return: Returns a boolean weather all elements paass test or not.
*/
function every(collection, test){
    //declaring a variable
    var y = true;
    if(test){
        //using _.each to loop over the given collection 
        each(collection, function(element, index, array){
            //testing elements in the array that don't pass test
          if(test(element, index, array) === false){
              y = false;
          }  
        });
    }else{
        //using _.each to loop over the collection
        each(collection, function(element, index, array){
            //checking if no element pass the test
            if(!element){
                y = false;
            }
        });
    }
    return y;
}
module.exports.every = every;
/*some: Deesigned to loop over a collection and cmake an array of falsey values
*@param: collection:[Array], {Object}, Function
*@return: Returns a boolean 
*/
function some(collection, test){
    //declaring a variable y 
    var y = false;
    if(test){
        //using _.each to loop over the given collection
        each(collection, function(element, index, array){
            //checking if elements pass test
            if(test(element, index, array)){
                y = true;
            }
        });
    }else{
        //using_.each to loop over the collection
        each(collection,function(element, index, array){
            if(Boolean(element)){
                y = true;
            }
        });
    }
    return y;
}
module.exports.some = some;
/*extend: takes multiple object and takes the first object and adds all other objects to that object 
*@param: Object
*@return: returns a clone of the first object
*/
function extend(Object1,...Object2){

//using Object.assign() to copy properties from object2 to object1
       Object.assign(Object1,...Object2);
//returning object1
    return Object1;
}
module.exports.extend = extend;
/*reduce: turns an array into a single value 
*@param: Array, Function, Seed
*return: Returns the value of an array
*/
function reduce(array, test, seed) {
for(let i = 0; i < array.length; i++){
   if(seed === undefined){
       seed = array[i];
   } else {
       seed = test(seed, array[i], i, array);
   }
}
return seed;
}
module.exports.reduce = reduce;

