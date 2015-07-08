//Create a Waveform Object
function WaveForm(type){
	this.type = type;
	this.len = 44100;
	this.buffer = null;
	this.pitch = 50;
	this.bpm = 120;
	this.subdiv = "L4";
	this.t_object = null;
	this.makeBuffer();
	this.makeTObject();
	this.infoCollection = new ArrayCollection([]);
	this.playing = false;
	this.paused = false;
	this.t = null;
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
	if(startIndex> endIndex){
		startIndex = 0;
		i = 0;
	}
	this.t = T("interval", {interval:this.subdiv,timeout:"99sec"},function(){
		if(i>=endIndex || isNaN(self.pitch)) {
			overlay.slider[0] = 0;
			self.updateIcon();
			self.t_object.pause();
			this.stop();
			self.stop();
			player = new WaveForm(self.type);
		}
		self.changePitch(30 + parseInt(self.infoCollection.collection[j].array[i]));
		if(!this.started){
			self.start();
			this.started = true;
		}
		if(overlay){
			overlay.slider[0] = i+1;
		}
		i++;
	}).on("ended",function(){
		this.stop();
	}).start();
};

//Play series of notes
WaveForm.prototype.playSeriesColumns = function(line,startIndex,endIndex){
	this.playing = true;
	this.updateIcon();
	var j = line;
	var i = startIndex;
	timbre.bpm = this.bpm;
	var self = this;
	var time = this.bpm/60 * this.infoCollection.collection.length-2 + "sec"
	this.t = T("interval", {interval:this.subdiv,timeout:time},function(){
		if(j>self.infoCollection.collection.length-1) {
			self.updateIcon();
			self.stop();
			this.stop();
		}
		if(!this.started){
			self.start();
			this.started= true;
		}
		if(self.infoCollection.collection[j]){
			self.changePitch(30 + parseInt(self.infoCollection.collection[j].array[i]));
			j++;
		}
	}).on("ended",function(){
		this.stop();
		self.stop();
	}).start();
};


//Set Beats per minute of waveform when series is played
WaveForm.prototype.setBpm = function(bpm){
  this.subdiv = "L4";
  if(bpm > 280){
    while(bpm>280){
      this.subdiv = "L" + parseInt(this.subdiv.substr(1))*2;
      bpm /= 2;
    }
  }
  this.bpm = bpm;
}

//Using an arrayCollection object you can add a group of lines to the audio object
WaveForm.prototype.setCollection = function(collection) {
  var dropdownString ="";
  this.infoCollection.setCollection(collection);
  for(var i = 0; i < collection.length; i++) {
    dropdownString += "<option value="+(i + 1)+">"+(i + 1)+"</option>"
  }
  document.getElementById("audioSpan").style.display = "";
  document.getElementById("lineDropdown").innerHTML = dropdownString;
}

//A change was made to a line in the table
WaveForm.prototype.changeLine = function(line, index, newValue) {
  if(line != -1) {
    this.infoCollection.changeLine(line,index,newValue);
  }
}

//Toggle playing either on or off
WaveForm.prototype.playToggle = function(line, startIndex, endIndex,mode,playing) {
  if(!playing) {
  	if(!this.paused){
  		overlay.slider[0] = 0;
  	}
  	if(!mode || mode === 0)
    	this.playSeries(line,startIndex,endIndex);
	else{
		this.playSeriesColumns(line,startIndex,endIndex);
	}
  }
  else {
  	this.t_object.pause();
    this.paused = true;
    this.playing = false;
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