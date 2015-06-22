"use strict"

// Create Data Summary Object
function DataSummary(collection) {

    this.currCollection = collection;
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
      var info = document.createTextNode("Row " + (i + 1) + ": Max: " + this.currCollection.collection[i].trend.max +
        " Min: " + this.currCollection.collection[i].trend.min +
        " Average: " + this.currCollection.collection[i].trend.avg+"\n");
      var infoLabel = document.createElement('label');
      infoLabel.appendChild(info);
      line.insertBefore(infoLabel,line.firstChild);
      var br = document.createElement("br");
      line.insertBefore(br,line.firstChild.nextSibling);
      //info.setAttribute("tabIndex", "0");
  }
  var lastEntry = document.createElement("li");

  // Writes the max, min, and average of the total table data
  var finalSummary =document.createTextNode( "Total Table Summary: Max: " + globalmax +
    " Min: " + globalmin + " Average: " + this.calcCollectionAvg());
    lastEntry.appendChild(finalSummary);
    this.summaryDiv.appendChild(lastEntry);
    overlay.updateSize(chart)
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
