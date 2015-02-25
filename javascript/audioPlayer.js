//Creates a set of audio data from the provided arrayinfo
function AudioPlayer(arrayInfo)
{
  this.duration = 0.5; //default duration of a single note
  this.audio = jsfxlib.createWaves(this.genWaves(arrayInfo));
  this.audio.length = arrayInfo.array.length;
}

//Play a single point
AudioPlayer.prototype.playPoint = function(point)
{
  this.audio[point].play();
}

//Play a set of points between the provided indices
AudioPlayer.prototype.playLine = function(startIndex, endIndex)
{
  var delay = 0;
  //If the end is greater than the size of the array then it is set to the end index
  var endIndex = Math.min(endIndex, this.audio.length-1);
  for(var i = startIndex; i <= endIndex; i++)
  {
    this.playPointWithDelay(i, i*this.duration*1000);
  }
}

//This function is nessesary so that there is a seperate copy of the
//index for when the function is actualy called
AudioPlayer.prototype.playPointWithDelay = function(index, delay)
{
  var self = this;
  setTimeout(function() {self.playPoint(index);}, delay);
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
  return freq = ((1500*(value-min))/(max-min))+500;
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
