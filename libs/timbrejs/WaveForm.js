"use strict";
//Create a Waveform Object
function WaveForm(type){
	this.type = type;
	this.len = 44100;
	this.buffer = null;
	this.pitch = 50;
	this.bpm = 120;
	this.t_object = null;
	this.makeBuffer();
	this.makeTObject();
	this.infoCollection = new ArrayCollection([]);
	this.playing = false;
}

//Make a timbre object of this waveform
WaveForm.prototype.makeTObject = function() {
	this.t_object = T("buffer", {buffer:this.buffer, pitch:this.pitch, loop:true});
};

//Make the Wave Buffer based of waveform type
WaveForm.prototype.makeBuffer = function(){
	this.buffer = new Float32Array(this.len);
	if(this.type === "sine"){
		for (var i = 0; i < this.len; i++) {
	  		this.buffer[i] = Math.sin(Math.PI * 8/this.len * i);
		}
	}
	else if(this.type === "square"){
		for (var i = 0; i < this.len; i++) {
	  		var sign = Math.sin(Math.PI * 8/this.len * i);
	  		sign = sign && sign / Math.abs(sign);
	  		this.buffer[i]= sign;
		}
	}
	else if(this.type === "triangle"){
		var totalSamples = 0;
		for(var i = 0; i< this.len && totalSamples<this.len; i++){
			var samples = this.len/8;
			var step = 3/samples;
			var tempSample = -1;
			var samplesWritten = 0;
			while(samplesWritten<samples){
				if(samplesWritten<samples/2)
					tempSample+= step;
				else
				tempSample-= step;
				this.buffer[totalSamples] = tempSample;
				samplesWritten ++;
				totalSamples ++;
			}
		}
	}
	else {
		var totalSamples = 0;
		for(var i = 0; i< this.len && totalSamples<this.len; i++){
			var samples = this.len/8;
			var step = 2/samples;
			var tempSample = -1;
			var samplesWritten = 0;
			while(samplesWritten<samples){
				tempSample+= step;
				this.buffer[totalSamples] = tempSample;
				samplesWritten ++;
				totalSamples ++;
			}
		}
	}
};

//Set Pitch of the WaveForm
WaveForm.prototype.setPitch = function(pitch){
	this.t_object.pitch=(pitch);
};

//Start playing WaveForm
WaveForm.prototype.start = function(){
	this.t_object.play();
	this.playing = true;
	this.updateIcon();
};

//Stop playing WaveForm
WaveForm.prototype.stop = function(){
	this.t_object.pause();
	if(this.t)
	this.t.stop();
	this.playing = false;
	this.updateIcon();
};

//Change Waveform Pitch
WaveForm.prototype.changePitch = function(pitch){
	this.pitch = pitch;
	this.t_object.pitch = pitch;
};

//Play series of notes
WaveForm.prototype.playSeries = function(line,startIndex,endIndex){
	this.playing = true;
	this.updateIcon();
	var j = line;
	var i = startIndex;
	timbre.bpm = this.bpm;
	var self = this;
	this.t = T("interval", {interval:"L4",timeout:"55sec"},function(){
		if(i>endIndex){
			this.stop();
			self.playing = false;
			self.updateIcon();
			self.stop();
			return;
		}
		if(!self.playing){
			self.start();
		}
		self.changePitch(30 + parseInt(self.infoCollection.collection[j].array[i]));
		if(i === 0){
			self.start();
		}
		i++;
	}).on("ended",function(){
		this.stop();
	}).start();
	self.playing = false;
};

//Set Beats per minute of waveform when series is played
WaveForm.prototype.setBpm = function(bpm){
	this.bpm = bpm;
}

//Using an arrayCollection object you can add a group of lines to the audio object
WaveForm.prototype.setCollection = function(collection) {
  var dropdownString ="";
  this.infoCollection.setCollection(collection);
  for(var i = 0; i < collection.length; i++) {
    dropdownString += "<option value="+(i + 1)+">"+(i + 1)+"</option>"
  }
  this.isDirty = true;
  document.getElementById("audioSpan").style.display = "";
  document.getElementById("lineDropdown").innerHTML = dropdownString;
}

//A change was made to a line in the table
WaveForm.prototype.changeLine = function(line, index, newValue) {
  if(line != -1) {
    this.infoCollection.changeLine(line,index,newValue);
    this.isDirty = true;
  }
}

//Toggle playing either on or off
WaveForm.prototype.playToggle = function(line, startIndex, endIndex) {
  if(!this.playing) {
    this.playSeries(line,startIndex,endIndex);
  }
  else {
    this.stop();
  }
  this.updateIcon();
}

// Updates the play / stop icon.
WaveForm.prototype.updateIcon = function() {
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