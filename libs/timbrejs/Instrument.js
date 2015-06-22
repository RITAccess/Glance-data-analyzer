
require(["libs/timbrejs/soundfont.js"]);
//Make an instrument object with a given instrument number
function Instrument(number){
	this.number = number;
	this.bpm = 120;	//Default tempo
	this.makeSoundFont(number);
	this.infoCollection = new ArrayCollection([]);
	this.playing = false;
}

//Create a T soundfont object based on number
Instrument.prototype.makeSoundFont = function(number){
	T.soundfont.setInstrument(number);
}

//Change instrument number of this instrument
Instrument.prototype.changeInstrument = function(number){
	this.number = number;
	this.makeSoundFont(this.number);
}

//Play a single note
Instrument.prototype.playSingleNote= function(number){
	this.playing = true;
	T.soundfont.play(number);
	this.playing = false;
}

//Play an entire set of notes
Instrument.prototype.playDataSet = function(line,startIndex,endIndex){
	this.playing = true;
	var i = startIndex;
  var j = line;
  var self = this;
	timbre.bpm = this.bpm;
	var t = T("interval", {interval:"L4",timeout:"55sec"},function(){
		if(i>=endIndex || self.infoCollection.collection[j].array[i+1] === undefined){
			self.playing = false;
			self.updateIcon();
      t.stop();
		}
		//console.log(self.infoCollection.collection[j].array[i]);
		T.soundfont.play(15 + parseInt(self.infoCollection.collection[j].array[i]),false);
		i++;
	}).on("ended",function(){
		this.stop();
	}).start();
  self.playing = false;
}

//Using an arrayCollection object you can add a group of lines to the audio object
Instrument.prototype.setCollection = function(collection) {
  console.log("coll");
  var dropdownString ="";
  this.infoCollection.setCollection(collection);
  for(var i = 0; i < collection.length; i++) {
    dropdownString += "<option value="+(i + 1)+">"+(i + 1)+"</option>"
  }
  this.isLoading = true;
  for(var i = 0; i < collection.length; i++){
    for(var j = 0; j < this.infoCollection.collection[i].array.length; j++){
        T.soundfont.preload([15 + parseInt(this.infoCollection.collection[i].array[j])]);
        //console.log(parseInt(this.infoCollection.collection[i].array[j]));
    }
  }
  this.isLoading = false;
  this.isDirty = true;
  document.getElementById("audioSpan").style.display = "";
  document.getElementById("lineDropdown").innerHTML = dropdownString;
}

//A change was made to a line in the table
Instrument.prototype.changeLine = function(line, index, newValue) {
  if(line != -1) {
    this.infoCollection.changeLine(line,index,newValue);
    //this.isDirty = true;
    T.soundfont.preload([newValue]);
  }
}

//Toggle playing either on or off
Instrument.prototype.playToggle = function(line, startIndex, endIndex) {
  if(!this.playing) {
    if(this.isLoading){
      while(this.isLoading){
        if(!this.isLoading)
          break;
      }
    }
    //this.playLine(line, startIndex, endIndex);
    //console.log(loader);
    var self = this;
    self.playDataSet(line,startIndex,endIndex);
  }
}

// Updates the play / stop icon.
Instrument.prototype.updateIcon = function() {
  var iList = document.getElementById("icon").classList;
  if(this.playing) {
    iList.remove("fa-play");
    iList.add("fa-stop");
  }
  else {
    iList.remove("fa-stop");
    iList.add("fa-play");
  }
}