# timbre.soundfont.js

A library that lets you play soundfont urls via timbre.js.

Currently it uses the [free-midi](https://code.google.com/p/free-midi/)
repo to get it's sounds via jsonp.

You can play all the instruments in the
[general midi standard](http://en.wikipedia.org/wiki/General_MIDI#Program_change_events) by
default, or you can set a different url template, and pull sounds from your own site.


## Demo

[Timbre.js Soundfont Demo](http://projects.skratchdot.com/timbre.soundfont.js/)


## Dependencies

- [timbre.js](https://github.com/mohayonao/timbre.js/)

- [jsmad](https://github.com/audiocogs/jsmad/) - (If your soundfonts are in mp3 format)

- [timbre.mp3_decode.js](https://github.com/skratchdot/timbre.mp3_decode.js/) - (If your soundfonts are in mp3 format)

- [audio-jsonp.js](http://mohayonao.github.io/timbre.js/src/extras/audio-jsonp.js) - (If your soundfonts are on a different domain)


## Usage

```html
	<script src="jsmad.js"></script>
	<script src="timbre.js"></script>
	<script src="timbre.mp3_decode.js"></script>
	<script src="timbre.soundfont.js"></script>
	<script>
		// play note 64
		timbre.soundfont.play(64);

		// set instrument and play again
		timbre.soundfont.setInstrument(5);
		timbre.soundfont.play(64);

		// only play if this note has already been cached
		timbre.soundfont.play(70, false);
	</script>
```

