function ArrayCollection(array){
  this.collection = [];
  //array is an array of arrays
  for(var i = 0; i < array.length; i++){
    this.collection.push(new ArrayInfo(array[i]));
  }
}
