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
*@param: value: String, Null, Number, Array, Object, NaN, Undefined, Boolean.
*@ return: returns a string of what data type the value is: String, Null, Number, Array, Object, NaN, Undefined, Boolean.
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
*@edge Case: What if <number> is negative? 
*@edge Case: What if <number> is greater than <array>.length?
*@return: returns the frist index of an array
*/
function first(array, number) {
  if(!Array.isArray(array) || number < 0){
        return [];
    }else if(typeof number !=='number' || number === 'null'){ 
        return array[0];
    }else if(array.length !== number){
        return array.slice(0, number);
    }else{
        return array; 
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
    if(!Array.isArray(array) || number < 0){ 
        return[]; 
    }else if(typeof number !== 'number' || number === null){
        return array[array.length-1];
    }else if(array.length < number){
        return array;
    }else if(array.length !== number){
        return array.splice(number - 1, array.length -1);
    }
}
module.exports.last = last;
/*contains: designed to find a certian value inside of an array
*@param: array
*@param: value
*return: Retruns a boolean weather an array contains a certian value or not
*/
function contains(array, value){
    for(var i = 0; i < array.length; i++){
      if(array[i] === value){
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
    each(array, function(elements, index, array){
        if(action(elements, index, array) === true){
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
    var results = []; 
    filter(array, function(element, index, array){
       if(test(element, index, array) === false){ 
           results.push(element);
       }
});
return results;
}
module.exports.reject = reject;
/*partition:designed to take one array and return two new arrays, one for truthies, and one for falseys
*@param: array, function
*@return: returns an array into sub arrays
*/
function partition(array, test){
    var result1 = [[], []];
    filter(array, function(element,index,array){
        index = index++;
        if(test(element, index, array)){
            result1[0].push(element);
        }else{
            result1[1].push(element);
        }
    });
    return result1;
}
module.exports.partition = partition;
/*map: Designed to create a new array with the results of calling a provided function on every element in the calling array.
*@param: Collection[Array],{Object}, function
*@return: Returns an array of the results of a condition.
*/
function map(collection, test){
    let result1 = [];
    filter(collection, function(element, index, array){
        result1.push(test(element, index, array));
    });
    return result1; 
}
module.exports.map = map;
/*pluck: takes an array of objects and returns the objects values into a new array
*@param: array
*@param: value
*/
function pluck(array, value){
    var list = [];
    each(array, function(element, index, array){
       list.push(element[value]);
    }); return list;
}
module.exports.pluck = pluck;
/*every: designed to check if all elements in an array pass a test and if they do the function will return true if even one returns false the return will be false.
*@param: collection: [Array], {Object}
*@return: Returns a boolean weather all elements paass test or not.
*/
function every(collection, test){
    var y = true;
    if(test){
        each(collection, function(element, index, array){
          if(test(element, index, array) === false){
              y = false;
          }  
        });
    }else{
        each(collection, function(element, index, array){
            if(!element){
                y = false;
            }
        });
    }
    return y;
}
module.exports.every = every;
/*some: Designed to loop over a collection and run all values through a test and if atleast one passes the test it returns true. If it is false for all elements it returns false.
*@param: collection:[Array], {Object}, Function
*@return: Returns a boolean 
*/
function some(collection, test){
    var y = false;
    if(test){
        each(collection, function(element, index, array){
            if(test(element, index, array)){
                y = true;
            }
        });
    }else{
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
       Object.assign(Object1,...Object2);
    return Object1;
}
module.exports.extend = extend;
/*reduce: Condenses the elements of the array down to a single number using the value that was previously returned as the seed for the next round.
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

