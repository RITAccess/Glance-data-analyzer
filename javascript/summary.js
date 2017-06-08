"use strict"

// Create Data Summary Object
function DataSummary(collection) {

    this.currCollection = collection;
    this.summaryDiv = document.getElementById("colors1");
    this.summaryDiv = document.getElementById("colors");
}

// Populates the div
DataSummary.prototype.dataSummary = function() {
  //this.summaryDiv.innerHTML = "";
  // Writes the max, min, and average of each line in the graph
	var globalmax = this.currCollection.collection[0].trend.max;
	var globalmin = this.currCollection.collection[0].trend.min;
  for (var i = 0; i < this.currCollection.collection.length; i++) {
      var child = 0;
      var line = this.summaryDiv.firstChild;
      while(child<i){
        child++;
        line = line.nextSibling;
      }
	  if (this.currCollection.collection[i].trend.max > globalmax){
		  globalmax = this.currCollection.collection[i].trend.max;
	  }
	  if (this.currCollection.collection[i].trend.min < globalmin){
		globalmin = this.currCollection.collection[i].trend.min;
	  }
      var median = 0;
      var arr =[];
      for(var iter = 0; iter <this.currCollection.collection[i].array.length; iter++){
        arr.push(parseInt(this.currCollection.collection[i].array[iter]));
      }
      arr.sort(function(a,b){return parseInt(a)-parseInt(b)});
      if(arr.length%2 ==0){
	    
            median = (arr[parseInt(arr.length/2)-1] + arr[parseInt(arr.length/2)])/2;
      }
      else{
            median = arr[parseInt(arr.length/2)];
      }
      var info = document.createTextNode(grid.getData()[i+1][0] + ": Max: " + this.currCollection.collection[i].trend.max +
        " Min: " + this.currCollection.collection[i].trend.min +
        " Average: " + this.currCollection.collection[i].trend.avg+
	" Median: " + median +"\n");

      var infoLabel = document.createElement('label');
      infoLabel.setAttribute("style","margin-bottom:3%;");
      infoLabel.appendChild(info);
      line.insertBefore(infoLabel,line.firstChild);
      var br = document.createElement("br");
      line.insertBefore(br,line.firstChild.nextSibling);
      //info.setAttribute("tabIndex", "0");
  }
  var lastEntry = document.createElement("li");
  var med = 0;
  var medArr = [];
  for(var k = 0; k<this.currCollection.collection.length; k++){
	   for(var l = 0; l<this.currCollection.collection[k].array.length; l++){
        medArr.push(parseInt(this.currCollection.collection[k].array[l]));
     }
  }
  medArr.sort(function(a,b){return a-b});
  if(medArr.length%2 ==0){
            var high = medArr[parseInt(medArr.length/2)-1];
            var low = medArr[parseInt(medArr.length/2)];
            median = (high + low)/2;
      }
      else{
            median = medArr[parseInt(medArr.length/2)];
  }   
  // Writes the max, min, and average of the total table data
  var finalSummary =document.createTextNode( "Total Table Summary: Max: " + globalmax +
    " Min: " + globalmin + " Average: " + this.calcCollectionAvg() + " Median: " + median);
    lastEntry.appendChild(finalSummary);
    this.summaryDiv.appendChild(lastEntry);
}

// Calculates the average for the entire set of data
DataSummary.prototype.calcCollectionAvg = function() {
  var collTotal = 0;

  for (var i = 0; i < this.currCollection.collection.length; i++){
    collTotal += this.currCollection.collection[i].trend.sum;
  }

  var totalDataPoints = 0;
  for (var i = 0; i < this.currCollection.collection.length; i++) {
      totalDataPoints += this.currCollection.collection[i].array.length;
  }

  var average = parseFloat(collTotal/totalDataPoints).toFixed(3);
  return average;
 }

// Updates the summary if a change is made to the table
DataSummary.prototype.update = function() {

    this.summaryDiv.lastChild.remove();
    for (var i = 0; i < this.currCollection.collection.length; i++){
      var child = 0;
      var line = this.summaryDiv.firstChild;
      while(child<i){
        child++;
        line = line.nextSibling;
      }
      line.removeChild(line.firstChild);
      line.removeChild(line.firstChild);
    }
    this.dataSummary();
}
