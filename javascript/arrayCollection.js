"use strict"; // strict mode syntax

// Takes an array of arrays and constructs an ArrayCollection with multiple ArrayInfo objects
function ArrayCollection(array){
  this.collection = [];

  //array is an array of arrays
  for(var i = 1; i < array.length; i++){
    this.collection.push(new ArrayInfo(array[i]));
  }
  this.calcMinMax();
}

// Set the collection equal to another collection
ArrayCollection.prototype.setCollection = function(nCollection) {
  this.collection = nCollection;
  this.calcMinMax();
}

// calculates the mim and max values for a collection and sets them in this.min and this.max
ArrayCollection.prototype.calcMinMax = function() {
  this.min = Number.MAX_VALUE;
  this.max = Number.MIN_VALUE;

  for(var i = 0; i < this.collection.length; i++) {
    this.min = ((this.collection[i].trend.min < this.min) ? this.collection[i].trend.min : this.min);
    this.max = ((this.collection[i].trend.max > this.max) ? this.collection[i].trend.max : this.max);
  }
}

// adds a line into the collection
ArrayCollection.prototype.addLine = function(newInfo) {
  this.collection.push(new ArrayInfo(newInfo));
  this.calcMinMax();
}

// updates a single line in the arrayCollection
ArrayCollection.prototype.changeLine = function(line, index, change) {
    this.collection[line].array[index] = change;
    this.collection[line].trend = this.collection[line].calcTrends();
    this.calcMinMax();
  
}
