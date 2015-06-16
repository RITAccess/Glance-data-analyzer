"use strict"; // strict mode syntax
//This object stores some basic information about an array
function ArrayInfo(nArray) {
  this.array = nArray;
  this.sorted = false;
  this.trend = this.calcTrends();
}

//Figures out if the array is sorted
ArrayInfo.prototype.isSorted = function() {
  var trendUp = this.array[0] < this.array[this.array.length-1];
  for(var i = 0; i < this.array.length-1; i++) {
    if(trendUp ? this.array[i] > this.array[i+1] : this.array[i] < this.array[i+1]) {
      return false;
    }
  }
  return true;
}

//Calculates some of the trends of the data
ArrayInfo.prototype.calcTrends = function() {
  var tmpTrend = {};
  tmpTrend.min = Math.min.apply(Math, this.array);
  tmpTrend.max = Math.max.apply(Math, this.array);
  tmpTrend.sum = 0;
  for(var i = 0; i < this.array.length; i++) {
    tmpTrend.sum += parseFloat(this.array[i]);
  }

  tmpTrend.avg = parseFloat(tmpTrend.sum/this.array.length).toFixed(3);

  this.sorted = this.isSorted();

  return tmpTrend;
}
