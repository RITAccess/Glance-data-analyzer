"use strict"

// Create Data Summary Object
function DataSummary(collection) {

    this.currCollection = collection;
    this.summaryDiv = document.getElementById("colors");
}

// Populates the div
DataSummary.prototype.dataSummary = function() {

  // Writes the max, min, and average of each line in the graph
  for (var i = 0; i < this.currCollection.collection.length; i++) {
      var child = 0;
      var line = this.summaryDiv.firstChild;
      while(child<i){
        child++;
        line = line.nextSibling;
      }
      var info = document.createTextNode("Line " + (i + 1) + ": Max: " + this.currCollection.collection[i].trend.max +
        " Min: " + this.currCollection.collection[i].trend.min +
        " Average: " + this.currCollection.collection[i].trend.avg+"\n");
      line.insertBefore(info,line.firstChild);
      var br = document.createElement("br");
      line.insertBefore(br,line.firstChild.nextSibling);
      //info.setAttribute("tabIndex", "0");
  }
  // Writes the max, min, and average of the total table data
  var finalSummary =document.createTextNode( "Total Data Summary: Max: " + this.currCollection.max +
    " Min: " + this.currCollection.min + " Average: " + this.calcCollectionAvg());
    this.summaryDiv.appendChild(finalSummary);
    //finalSummary.setAttribute("tabIndex", "0");
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

  var average = Math.round(100 * collTotal/totalDataPoints)/100;
  return average;
 }

// Updates the summary if a change is made to the table
DataSummary.prototype.update = function() {

    this.summaryDiv.innerHTML = "";
    this.dataSummary();
}
