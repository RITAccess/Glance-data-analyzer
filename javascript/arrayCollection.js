function ArrayCollection(array){
  this.collection = [];

  this.min = Number.MAX_VALUE;
  this.max = Number.MIN_VALUE;

  //array is an array of arrays
  for(var i = 0; i < array.length; i++){
    this.collection.push(new ArrayInfo(array[i]));
    this.min = ((this.collection[i].trend.min < this.min) ? this.collection[i].trend.min : this.min);
  }
}
