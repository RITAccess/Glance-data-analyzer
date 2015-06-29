
require(["libs/timbrejs/soundfont.js"]);
//Make an instrument object with a given instrument number
function Instrument(number){
	this.number = number;
	this.bpm = 120;	//Default tempo
  this.subdiv = "L4";
	this.makeSoundFont(number);
	this.infoCollection = new ArrayCollection([]);
	this.playing = false;
  this.isLoading = false;
  this.pnotes = null;
}

//Create a T soundfont object based on number
Instrument.prototype.makeSoundFont = function(number){
	T.soundfont.setInstrument(number);
}

//Change instrument number of this instrument
Instrument.prototype.changeInstrument = function(number){
	if(this.number === number)
    return;
  this.number = number;
	this.makeSoundFont(this.number-1);
  this.setCollection(this.infoCollection.collection);
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
	var t = T("interval", {interval:this.subdiv,timeout:"55sec"},function(){
		if(i>=endIndex || self.infoCollection.collection[j].array[i+1] === undefined){
			self.playing = false;
			self.updateIcon();
      t.stop();
		}
    var key =  parseInt(self.infoCollection.collection[j].array[i]);
		T.soundfont.play(self.pnotes[key],false);
		i++;
	}).on("ended",function(){
		this.stop();
	}).start();
  self.playing = false;
}

//Using an arrayCollection object you can add a group of lines to the audio object
Instrument.prototype.setCollection = function(collection) {
  var dropdownString ="";
  this.infoCollection.setCollection(collection);
  for(var i = 0; i < collection.length; i++) {
    dropdownString += "<option value="+(i + 1)+">"+(i + 1)+"</option>"
  }
  /*[DO NOT MOVE]: This section preloads all of the notes in the current collection
  * in order to make playback even and uniform (if you're getting a sound that resembles
  * an individual sitting on a piano, then you probably moved this)
  */
  this.notes = this.buildNotes();
  document.getElementById("audioSpan").style.display = "";
  document.getElementById("lineDropdown").innerHTML = dropdownString;
}

//A change was made to a line in the table
Instrument.prototype.changeLine = function(line, index, newValue) {
  if(line != -1) {
    this.infoCollection.changeLine(line,index,newValue);
    T.soundfont.preload([newValue]);
  }
}

//Toggle playing either on or off
Instrument.prototype.playToggle = function(line, startIndex, endIndex) {
  if(!this.playing) {
      this.looping = true;
      while(this.looping){
        if(!this.isLoading){
           var q = function(){
              player.looping = false;
           }
          setTimeout(q(), 1000);
        }
    }
    var self = this;
    setTimeout(function() {self.playDataSet(line,startIndex,endIndex);}, 1000);
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

Instrument.prototype.setBpm = function(bpm){
  this.subdiv = "L4";
  if(bpm > 280){
    while(bpm>280){
      this.subdiv = "L" + parseInt(this.subdiv.substr(1))*2;
      bpm /= 2;
    }
  }
  this.bpm = bpm;
}

Instrument.prototype.buildNotes= function(){
  var newNotes = {};
  for(var i = 0; i < this.infoCollection.collection.length; i++){
    for(var j = 0; j < this.infoCollection.collection[i].array.length; j++){
        var key =(parseInt(this.infoCollection.collection[i].array[j]));
        newNotes[key] = key+30;
    }
  }
  var toSort = [];
  for(var key in newNotes){
    toSort.push(parseInt(newNotes[key]));
  }
  toSort.sort(function(a,b){
    if(a<b)
      return -1;
    else if(a>b)
      return 1;
    else
      return 0;
  });
  if(toSort[toSort.length-1]>100){
    var mult = 100/toSort[toSort.length-1];
    for(var i = 0; i<toSort.length; i++){
      toSort[i] = parseInt(mult*toSort[i]);
    }
  }
  T.soundfont.preload(toSort);
  var i = 0;
  this.pnotes = new Object();
  for(var key in newNotes){
    newNotes[key] = toSort[i];
    i++;
    var a = [];
    a.push(newNotes[key]);
    this.pnotes[key] = newNotes[key];
  }
}

Instrument.prototype.getKeyByValue = function( value ) {
    for( var prop in this.notes ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[prop] === value )
                 return prop;
        }
    }
}
