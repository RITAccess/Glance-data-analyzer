//Creates a set of audio data from the provided arrayinfo
function AudioPlayer()
{
  this.duration = 0.5; //default duration of a single note
  this.maxFreq = 300;
  this.minFreq = 1900;
  this.audio = [];
  this.numLines = 0;
}

AudioPlayer.prototype.addLine = function(arrayInfo)
{
  this.audio[this.numLines] = jsfxlib.createWaves(this.genWaves(arrayInfo));
  this.audio[this.numLines].length = arrayInfo.array.length;
  this.numLines++;
}

//Play a single point
AudioPlayer.prototype.playPoint = function(line, point)
{
  this.audio[line][point].play();
}

//Play a line. can also have optional parameters for start and ending index
AudioPlayer.prototype.playLine = function(line, startIndex, endIndex)
{
  var delay = 0;
  //If startIndex or endIndex are undefined they will be set to the start and end of the line respectively
  for(var i = (startIndex || 0); i < (endIndex || this.audio[line].length); i++)
  {
    this.playPointWithDelay(line, i, i*this.duration*1000);
  }
}

AudioPlayer.prototype.playLines = function(lines, startIndex, endIndex)
{
  for (var line in lines)
  {
    this.playLine(line, startIndex, endIndex);
  }
}

//This function is nessesary so that there is a seperate copy of the
//index for when the function is actualy called
AudioPlayer.prototype.playPointWithDelay = function(line, index, delay)
{
  var self = this;
  setTimeout(function() {self.playPoint(line, index);}, delay);
}

//Using the arrayinfo a wave array is created
AudioPlayer.prototype.genWaves = function(arrayInfo)
{
  audioLibParams = {};

  var min = arrayInfo.trend.min;
  var max = arrayInfo.trend.max;

  for(var i = 0; i < arrayInfo.array.length; i++)
  {
    audioLibParams[i] = this.genSoundArray(this.calcFrequency(arrayInfo.array[i], min, max), this.duration);
  }
  return audioLibParams;
}

//Converts the value to a frquency between 500 and 2000.
AudioPlayer.prototype.calcFrequency = function(value, min, max)
{
  return freq = (((this.maxFreq-this.minFreq)*(value-min))/(max-min))+this.minFreq;
}

//Creates a sound object
AudioPlayer.prototype.genSoundArray = function(frequency, duration)
{
  soundArray =
  ["sine",
  0.0000, //super sampling quality
  0.1750, //master volume
  0.0000, //attack time
  duration/2, //sustain time
  0.2500, //sustain punch
  duration/2, //decat time
  20.0000, //min frequency
  frequency, //This is the frequency
  2400.0000, //max frequency
  -0.0250, //slide
  -0.0250, //delta slide
  0.0000, //vibrato slide
  0.0000, //vibrato frequency
  0.0000, //vibrato depth slide
  0.0000, //vibrato frequency slide
  -0.0100, //change amount
  0.0000, //change speed
  0.0000, //square duty
  -0.0140, //square duty sweep
  0.0000, //repeat speed
  0.0080, //phaser offset
  0.0100, //phaser sweep
  1.0000, //lp filter cutoff
  0.0100, //lp filter cutoff sweep
  0.0000, //lp filter resonance
  0.0000, //hp filter cutoff
  0.0100]; //hp filter cutoff sweep
  return soundArray;
}
