/*Create a Waveform Object of a specific type
	type: a string, either "sine", "square", "triangle",
	or "sawtooth". If it doesn't match, sawtooth is assumed
*/
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

/*Make a timbre object of this waveform
  Should not be called directly, only 
  during instantiation of a Waveform
*/
WaveForm.prototype.makeTObject = function() {
	this.t_object = T("buffer", {buffer:this.buffer, pitch:this.pitch, loop:true});
};

/*  Make the buffer of the waveform
	should not be called directly, only
	during instantiation of the waveform
*/
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
    else if (this.type === "triangle") {
        var totalSamples = 0;
        for (var i = 0; i < this.len && totalSamples < this.len; i++) {
            var samples = this.len / 8;
            var step = 3 / samples;
            var tempSample = -1;
            var samplesWritten = 0;
            while (samplesWritten < samples) {
                if (samplesWritten < samples / 2)
                    tempSample += step;
                else
                    tempSample -= step;
                this.buffer[totalSamples] = tempSample;
                samplesWritten++;
                totalSamples++;
            }
        }
    } else {
        var totalSamples = 0;
        for (var i = 0; i < this.len && totalSamples < this.len; i++) {
            var samples = this.len / 8;
            var step = 2 / samples;
            var tempSample = -1;
            var samplesWritten = 0;
            while (samplesWritten < samples) {
                tempSample += step;
                this.buffer[totalSamples] = tempSample;
                samplesWritten++;
                totalSamples++;
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
};

//Stop playing WaveForm
WaveForm.prototype.stop = function(){
	this.t_object.pause();
	if(this.t)
	this.t.stop();
	this.playing = false;
};

//Change Waveform Pitch
WaveForm.prototype.changePitch = function(pitch){
	this.pitch = pitch;
	this.t_object.pitch = pitch;
};

/*Play series of notes
  This function should not be called directly, but instead
  by playToggle
  line: line of data to play on
  startIndex: index of that line to start on
  endIndex: index of that line to end on
*/
/* Changes the values to fall between a range of two numbers increasing in weight as the number increases.

 */
function normalize(enteredValue, minEntry, maxEntry, normalizedMin, normalizedMax) {

    var mx = (Math.log((enteredValue - minEntry)) / (Math.log(maxEntry - minEntry)));
    var preshiftNormalized = mx * (normalizedMax - normalizedMin);
    var shiftedNormalized = preshiftNormalized + normalizedMin;

    return shiftedNormalized;

}
WaveForm.prototype.playSeries = function(line,startIndex,endIndex){
	this.playing = true;
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
			self.t_object.pause();
			this.stop();
			self.stop();
			player = new WaveForm(self.type);
		}
        self.changePitch(Math.abs(normalize(parseInt(self.infoCollection.collection[j].array[i]), 1, 100000, 200, 4000)));
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

/* Play the columns of a bar chart
   This function should only be called by playToggle, and should
   not be called directly
   line: line of data to play on
   startIndex: index of that line to start on
   endIndex: index of that line to end on
*/
WaveForm.prototype.playSeriesColumns = function(line,startIndex,endIndex){
	this.playing = true;
	
	var j = line;
	var i = startIndex;
	timbre.bpm = this.bpm;
	var self = this;
	var time = this.bpm/60 * this.infoCollection.collection.length-2 + "sec"
	this.t = T("interval", {interval:this.subdiv,timeout:time},function(){
		if(j>self.infoCollection.collection.length-1) {
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

//Sonically represent the regression line using a waveform
WaveForm.prototype.playRegressionLine = function(){
  this.playing = true;
  var i = 0;
  var myNotes = chart.calcBestFit();
  var self = this;
  timbre.bpm = this.bpm;
  this.t = T("interval", {interval:this.subdiv,timeout:"55sec"},function(){
    if(!this.started){
	self.start();
	this.started= true;
	}
    var key =  parseInt(myNotes[i][1])+30;
    console.log(key)
    self.changePitch(key);
    i++;
    if(i>myNotes.length || myNotes[i]===undefined){
      self.playing = false;
      
      self.stop();
      this.stop();
    }
  }).on("ended",function(){
    this.stop();
  }).start();
}

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

/* Preload the data into the waveform
   collection: arrayCollection containing the data
*/
WaveForm.prototype.setCollection = function(collection) {
  var dropdownString ="";
  this.infoCollection.setCollection(collection);
  for(var i = 0; i < collection.length; i++) {
    dropdownString += "<option value="+(i + 1)+">"+(i + 1)+"</option>"
  }
  document.getElementById("audioSpan").style.display = "";
  if(document.getElementById("lineDropdown").innerHTML.length < dropdownString.length)
  document.getElementById("lineDropdown").innerHTML = dropdownString;
}

/*Update a value in the data set when it changes
  line: which line the change occurred in
  index: which item in the specified line was changed
  newValue: the new value of the changed item
*/
WaveForm.prototype.changeLine = function(line, index, newValue) {
  if(line != -1) {
  	if(!isNaN(newValue))
    this.infoCollection.changeLine(line,index,newValue);
  }
}

/*Toggle playing either on or off
  line: line of data that is being played (if data set has several line) (to be passed into playing functions)
  startIndex: where in the specified dataset line to start playing (to be passed into playing functions)
  endIndex: where in the specified dataset line to stop playing (to be passed into playing functions)
*/
WaveForm.prototype.playToggle = function(line, startIndex, endIndex,mode,playing) {
  if(!playing) {
  	if(!this.paused){
  		overlay.slider[0] = 0;
  	}
  	if(!mode || mode === 0)
    	this.playSeries(line,startIndex,endIndex);
	else{
		this.paused = false;
		if(type === "bar")
			this.playSeriesColumns(line,startIndex,endIndex);
		else
			this.playRegressionLine();
	}
  }
  else {
  	this.t_object.pause();
    this.paused = true;
    this.playing = false;
  }
  
}