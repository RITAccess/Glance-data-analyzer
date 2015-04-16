function ArrayCollection(array){
  this.collection = [];

  this.min = Number.MAX_VALUE;
  this.max = Number.MIN_VALUE;

  //array is an array of arrays
  for(var i = 0; i < array.length; i++){
    this.collection.push(new ArrayInfo(array[i]));
  }
  this.calcMinMax();
}

ArrayCollection.prototype.addCollection = function(nCollection) {
  this.collection = nCollection;

  this.min = Number.MAX_VALUE;
  this.max = Number.MIN_VALUE;

  this.calcMinMax();
}

ArrayCollection.prototype.calcMinMax = function() {
  for(var i = 0; i < this.collection.length; i++) {
    this.min = ((this.collection[i].trend.min < this.min) ? this.collection[i].trend.min : this.min);
    this.max = ((this.collection[i].trend.max > this.max) ? this.collection[i].trend.max : this.max);
  }
    //console.log("Min",this.min,"Max",this.max);
}

ArrayCollection.prototype.addLine = function(newInfo) {
  this.collection.push(new ArrayInfo(newInfo));
  this.calcMinMax();
}

ArrayCollection.prototype.changeLine = function(line, index, change) {
  this.collection[line][index] = change;
  this.collection[line].trend = this.collection[line].calcTrends();
  this.calcMinMax();
}
