# Brashads Edits
# Glance (data-analyzer)
Accessible data analyzer tool that can be used in a browser
takes in CSV files and exports displays them with accessible notes and tags.

View our demo video at: https://youtu.be/0SkomvXaqb0

## GitHub Pages
The most recent build of the data-analyzer can be used at https://github.com/RITAccess/Glance-data-analyzer/tree/brashad_edits.

# libraries
## PapaParse - http://papaparse.com/
Parses out the data from csv files

## Chart.js - http://www.chartjs.org/
Provides a chart in which to view the data

## SlickGrid -https://github.com/mleibman/SlickGrid
Used for making dynamic tab-accessible tables and updating the data in the chart and application

## jquery - https://jquery.com/
Used for making the 2 thumbed slider at the top (jquery is not, and should not, be used for getting elements out of the document. Instead use document.getElementById, document.getElementsByClassName, or document.querySelector and document.querySelectorAll, etc...)

## require - http://requirejs.org/
Used for grabbing external javascript files in the project.

## timbre - http://mohayonao.github.io/timbre.js/
Used to create waveforms and use midi instruments in the process of graph sonification.
