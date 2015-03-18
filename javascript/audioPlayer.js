//Creates a set of audio data from the provided arrayinfo
function AudioPlayer()
{
  this.duration = 0.5; //default duration of a single note
  this.maxFreq = 64;
  this.minFreq = 28;
  this.audio = [];
  this.numLines = 0;
}

AudioPlayer.prototype.addLine = function(arrayInfo)
{
  this.audio[this.numLines] = jsfxlib.createWaves(this.genWaves(arrayInfo), false);
  this.audio[this.numLines].info = arrayInfo;
  this.numLines++;
}

AudioPlayer.prototype.addLineWithChords = function(arrayInfo)
{
  this.audio[this.numLines] = jsfxlib.createWaves(this.genWaves(arrayInfo), true);
  this.audio[this.numLines].length = arrayInfo.array.length;
  this.audio[this.numLines].info = arrayInfo;
  this.numLines++;
}

AudioPlayer.prototype.addCollection = function(collection)
{
  for(var i = 0; i < collection.length; i++)
  {
    this.addLine(collection[i]);
  }
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
  for(var i = (startIndex || 0); i < (endIndex || this.audio[line].info.array.length); i++)
  {
    this.playPointWithDelay(line, i, i*(this.duration-this.duration/8)*1000);
  }
}

AudioPlayer.prototype.playLineWithChords = function (line, startIndex, endIndex)
{
  var delay = 0;
  //If startIndex or endIndex are undefined they will be set to the start and end of the line respectively
  for(var i = (startIndex || 0); i < (endIndex || this.audio[line].length); i+=3)
  {
    this.playPointWithDelay(line, i, i*(this.duration-this.duration/8)*1000);
    this.playPointWithDelay(line, i+1, i*(this.duration-this.duration/8)*1000);
    this.playPointWithDelay(line, i+2, i*(this.duration-this.duration/8)*1000);
  }
}

AudioPlayer.prototype.playLines = function(lines, startIndex, endIndex)
{
  for (var i = 0; i < lines.length; i++)
  {
    this.playLine(lines[i], startIndex, endIndex);
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
AudioPlayer.prototype.genWaves = function(arrayInfo, hasChords)
{
  audioLibParams = {};

  var min = arrayInfo.trend.min;
  var max = arrayInfo.trend.max;

  for(var i = 0; i < arrayInfo.array.length; i++)
  {
    if(hasChords)
    {
      //add chords here
      audioLibParams[i] = this.genSoundArray(this.calcFrequency(arrayInfo.array[i], min, max));
    }
    else
    {
      audioLibParams[i] = this.genSoundArray(this.calcFrequency(arrayInfo.array[i], min, max));
    }
  }
  return audioLibParams;
}

AudioPlayer.prototype.genChord = function(freq)
{
  chord = [3];

  chord[0] = freq;
  chord[1] = freq + freq/4;
  chord[2] = freq + freq/2;

  return chord;
}

//Converts the value to a frquency between the min and max frequnecy.
AudioPlayer.prototype.calcFrequency = function(value, min, max)
{
  var freq = (((this.maxFreq-this.minFreq)*(value-min))/(max-min))+this.minFreq;
  freq = Math.pow(2,((freq-40)/12))*440;
  return freq;
}

playNotes = function(notes)
{
  this.sounds = [];
  for(var i = 0; i < notes.length; i++)
  {
    sounds[i] = jsfxlib.createWaves(notes);
  }

  for(var i = 0; i < notes.length; i++)
  {
    sounds[i][0].play();
  }
}

//Creates a sound object
AudioPlayer.prototype.genSoundArray = function(frequency)
{
  soundArray =
  ["sine",
  0.0000, //super sampling quality
  0.1750, //master volume
  0.0075, //attack time
  0.0750, //sustain time
  0.0000, //sustain punch
  0.5000, //decay time
  20.0000, //min frequency
  frequency, //This is the frequency
  2400.0000, //max frequency
  0.0000, //slide
  0.0000, //delta slide
  0.0250, //vibrato slide
  45.0000, //vibrato frequency
  -0.3000, //vibrato depth slide
  -1.0000, //vibrato frequency slide
  0.0000, //change amount
  0.0000, //change speed
  0.0000, //square duty
  0.0000, //square duty sweep
  0.0000, //repeat speed
  0.0080, //phaser offset
  0.0000, //phaser sweep
  1.0000, //lp filter cutoff
  0.0040, //lp filter cutoff sweep
  0.0000, //lp filter resonance
  0.0000, //hp filter cutoff
  0.0100]; //hp filter cutoff sweep
  return soundArray;
}
