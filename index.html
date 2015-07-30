<!DOCTYPE HTML>
<html>
<head>
  <title>Data Analyzer</title>
  <meta charset="UTF-8">
  <!-- load main.js after require.js -->
  <script data-main="javascript/main" src="libs/require/Require.js"></script>
  <script src="libs/timbrejs/timbre.js"></script>
  <script src="libs/timbrejs/audio-jsonp.js"></script>
  <script src="libs/timbrejs/jsmad.js"></script>
  <script src="libs/timbrejs/mp3_decode.js"></script>
  <script src="libs/timbrejs/soundfont.js"></script>
  <script src="libs/timbrejs/Instrument.js"></script>
  <script src="libs/timbrejs/WaveForm.js"></script>
  <link href="stylesheets/style.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="libs/SlickGrid/slick.grid.css" type="text/css"/>
  <link rel="stylesheet" href="libs/SlickGrid/css/smoothness/jquery-ui-1.8.16.custom.css" type="text/css"/>
  <link rel="stylesheet" href="libs/SlickGrid/examples/examples.css" type="text/css"/>
  <link rel="stylesheet" href="libs/jquery/jquery-ui.css"/>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  </head>
<body>
  <header>
    <h1 id="title"><a href="index.php" title="Data Analyzer Home" aria-label="Data Analyzer Home">Data Analyzer</a></h1>
    <div class="inputBtnSection no-print">
      <label class="fileUpload">
          <input id="files" tab-index="0" aria-label="Load CSV" type="file" accept=".csv" class="upload" onfocus="focusElement('uploadBtn')" onblur = "blurElement('uploadBtn')"/>
          <span class="uploadBtn" title="Load CSV" aria-hidden="true" onmouseover="focusElement('uploadBtn')" onmouseleave="blurElement('uploadBtn')">Load CSV</span>
      </label>
    </div>
    <div class="newBtnSection no-print">
      <label class="createNew">
        <input id="newTable" tab-index="0" aria-label="Create New Table" type="button" class="emptyTable" onfocus="focusElement('createBtn')" onblur="blurElement('createBtn')"/>
        <span class="createBtn" title="Create New Table" aria-hidden="true" onmouseover="focusElement('createBtn')" onmouseleave="blurElement('createBtn')">Create New Table</span>
      </label>
    </div>
    <button id="helpButton" aria-label="Help" title="Help" onclick="Alert3.render()"><i class="fa fa-question fa-3x"></i></button>
    <span id="typeSelBody" class="no-print" style="display:none;">
      Change graph type:
      <select id="typeSel" class="no-print" title="Change Graph Type" onchange="typeOpSel()">
        <option id="lineRadioButton" name="graphTypeSel" value="Line" onclick="typeOpSel()">Line Graph</label>
        <option id="barRadioButton" name="graphTypeSel" value="Bar" onclick="typeOpSel()">Bar Graph</option>
        <option id="scatterRadioButton" name="graphTypeSel" value="Scatter" onclick="typeOpSel()">Scatter Plot</option>
      </select>
    </span><!-- END id="typeSelBody" -->
    <output id="list"></output>
  </header>
    <div id="start">
      <div id="startBody">
        <h1>Welcome to Data Analyzer</h1>
        <p>
          This web application was designed to help analyze data through graphs, calculated values, and sound.
          Here's a quick look at how to use the application:
        </p>
        <ul>
          <li>Audio Controls: The audio controls allow you to choose which set of data to play and at what speed.</li>
          <li>Graph: You can choose from three separate options when making a graph: Line, Bar, and Scatter Plot. The overlay on the graph can highlight certain parts of the data to be turned into sound.</li>
          <li>Data Table: There are two options with the data table; load a pre-made CSV (Comma Separated Value) file, or choose to create an empty one. Rows and columns can be added or subtracted from the table, which can be saved and downloaded.</li>
          <li>Graph Data: In this section, you can customize data set colors, as well as toggle their visibility. Graph data displays minimums, maximums, and averages for each individual row of the data set, as well as the overall total.</li>
        </ul>
        <h3 id="startInst">To get started, select Load CSV or Create New Table at the top!</h3>
      </div>
      <div id="startFooter">
        <button id="toTopButton" title="Return to Top" onclick="location.href='index.php'" >Return to Top</button>
      </div>
    </div> <!-- End of start div -->
    <div id="content" style="position: absolute; top: -9999px; left: -9999px;"><!-- css style is for hiding the content section when page first load -->
      <div id="dataGraph">
        <h3 id="graphHeader" style="display:none;">Data Analyzer Graph</h3>
        <div id="slider-range" data-start="0" data-end="-1" data-size="0" title="Chart Slider" class="no-print"></div>
        <svg id="overlay" width="800" height="400" style='display:none;' class="no-print">
          <rect id="background" title="Data Analyzer Graph" x="0" y="0" width="800" height="400" />
          <rect id="selection" title="Slider" x="0" y="0" width="800" height="400" />
        </svg>
        <div id="graphCC">
          <canvas id="myChart" title="Data Analyzer Graph"  width="800" height="400" style="display:none;"></canvas>
        </div>
      </div><!-- END id="dataGraph" -->
      <div id='continuosBox'>
        <div id="dataPlot">
          <h3 id="plot-header" style="display:none;">Data Table</h3>
          <div id="tableCount"></div><!-- END id="tableCount" -->
          <div id="tblContainer" style="display:none;" title="Data Table">
            <div id="slickTable" style="width:100%;"></div>
          </div> <!-- end id="tblContainer" -->
          <div id="remInstruction" class="no-print"></div>
        <div id="tableControls" style="display: none" class="no-print">
          <div id="rowLabel">
            <label><button id="subtractRow" title="Remove Row" aria-label="Remove Row" onclick="subtractRow()"><i class="fa fa-minus"></i></button></label>
            <p style="display: inline">Row</p>
            <label><button id="addNewRow" title="Add Row" aria-label="Add Row" onclick="addRow()"><i class="fa fa-plus"></i></button></label>
          </div>
          <div id="columnLabel">
            <label><button id="subtractColumn" title="Remove Column" aria-label="Remove Column" onclick="subtractColumn()"><i class="fa fa-minus"></i></button></label>
            <p style="display: inline">Column</p>
            <label><button id="addNewCol" title="Add Column" aria-label="Add Column" onclick="addColumn()"><i class="fa fa-plus"></i></button></label>
          </div>
          <button id="undoButton" title="Undo" aria-label="Undo" onclick="undo()"><i class="fa fa-undo fa-lg"></i></button>
          <button id="redoButton" title="Redo" aria-label="Redo" onclick="redo()"><i class="fa fa-repeat fa-lg"></i></button>
          <button id="resetButton" title="Reset Table" aria-label="Reset Table" onclick="tableReset()" title="Reset Table"><i class="fa fa-refresh fa-lg"></i></button>
          <button id="downloadCSV" title="Download CSV" aria-label="Download CSV" onclick="download()"><i class="fa fa-download fa-lg"></i></button>
          <button id="printButton" title="Print" aria-label="Print" onclick="printPage()"><i class="fa fa-print fa-lg"></i></button>
        </div><!-- END id="tableControls" -->
      </div><!-- END id="dataPlot" -->
      <?php
          include 'php/ajax.php';
      ?>
      <div id="audioSpanSec" class="no-print">
        <h3 id="audioHeader" style="display:none;">Audio Control</h3>
        <div id="audioSpan" style="display: none">
          <label for="lineDropdown" tabindex="0"> Row </label>
          <select id="lineDropdown" class='drop-down' title="Select Row" aira-lable="selected" onchange="changeAudioLine()"></select>
           at speed <input id="bpm" class='drop-down' name="Speed Multiplier" title="Select Speed" type="number" min="0" value="1"/>
          <label for="instrumentDropdown" tabindex="0"> Instrument </label>
          <select id="instrumentDropdown" class='drop-down' title="Select Instrument"></select>
        </div><!-- END id="audioSpan" -->
        <div id="audioSpanBar"><!-- NOT an empty span: main.js "Play mode" and "Column number" for bar graph -->
        </div><!-- END id="audioSpanBar" -->
        <div id="audioSpanButtons"><!-- Play, Pause, Stop buttons for audio -->
          <button id="playButton" onclick="play()" title="Play Audio" aria-label="Play Audio"><i id="playToggle" class="fa fa-play fa-lg" ></i></button>
          <button id="pauseButton" onclick="pause()" title="Pause Audio" aria-label="Pause Audio"><i id="pauseToggle" class="fa fa-pause fa-lg" ></i></button>
          <button id="stopButton" onclick="stop()" title="Stop Audio" aria-label="Stop Audio"><i id="stopToggle" class="fa fa-stop fa-lg" ></i></button>
        </div><!-- END id="audionSpanButtons" -->
      </div><!-- END id="audioSpanSec" -->
      <div id="summaryBox">
      <h3 id="summary-header" style="display:none;">Graph Data</h3>
        <ol id="colors" class="color-editor-input"></ol>
      </div><!-- END id="summaryBox" -->
      <div id="bgColorChange" style="display:none;" class="no-print">
      <h3>Change Background Color</h3><!-- "cc" and "CC" both stands for "color change"-->
        <div id="ccContent">
            <form>
              <div class="ccFeature">
                <label>Site Background:</label><input id="siteColorInput" type="text" onInput="changeSiteBg()" title="Change Site Background Color">
                <label>High Contrast:</label>
                  <div class="squaredTwo">
                    <input id="siteContrast" type="checkbox" tabindex="0" checked="checked" aria-label="Enable/Disable Site Background Color Contrast" onclick="changeSiteBg()">
                    <label for="siteContrast" title="Enable/Diable Site Background Color Contrast"></label>
                  </div>
                  <input type="button" id="siteCCReset" tabindex="0" role="button" class="fa fa-refresh" aria-label="Reset Site Background to Original" title="Reset Site Background to Original" onclick="resetSiteBg()" onkeyup="siteKeyUp()" value="">
              </div>
              <div class="ccFeature">
                <label>Graph Background:</label><input id="graphColorInput" type="text" onInput="changeGraphBg()" title="Change Graph Background Color">
                <label tabindex="0" >High Contrast:</label>
                  <div class="squaredTwo">
                    <input id="graphContrast" tabindex="0" type="checkbox" checked="checked" aria-label="Enable/Disable  Graph Background Color Contrast" onclick="changeGraphBg()">
                    <label for="graphContrast" title="Enable/Disable Graph Background Color Contrast"></label>
                  </div>
                  <input type="button" id="graphCCReset" tabindex="0" role="button" class="fa fa-refresh" aria-label="Reset Graph Background to Original" title="Reset Graph Background to Original" onclick="resetGraphBg()" value="">
              </div>
              <div class="ccFeature">
                <label>Text Color:</label><input id="textColorInput" type="text" title="Change Text Color" onInput="changeTextColor()">
                <label>High Contrast:</label>
                  <div class="squaredTwo">
                    <input id="textContrast" type="checkbox" tabindex="0" checked="checked" aria-label="Enable/Disable Text Color Contrast" onclick="changeTextColor()">
                    <label for="textContrast" title="Enable/Disable Text Color Contrast"></label>
                  </div>
                <input type="button" id="textCCReset" tabindex="0" role="button" class="fa fa-refresh" aria-label="Reset Text Color to Original" title="Reset Text Color to Original" onclick="resetText()" onkeyup="textKeyUp()" value="">
              </div>
            </form>
        </div><!-- END id="ccContent" -->
      </div><!-- END id="bgColorChange" -->
    </div><!-- END id="continuosBox" -->
  </div><!-- end div id="content" -->
<!-- div for LOAD CSV pop-up list -->
  <div id="loadCsvOverlay"></div>
    <div id="loadCsvBox">
        <div>
            <div id="loadCsvHead"></div>
            <div id="loadCsvBody" class="sChartType"></div>
            <div id="loadCsvFoot"></div>
        </div>
    </div>
<!-- END div for LOAD CSV pop-up list -->
<!-- div for CREATE NEW TABLE pop-up list -->
  <div id="createTableOverlay"></div>
    <div id="createTableBox">
      <div id="createTableHead"></div>
      <div id="createTableBody" class="sChartType"></div>
      <div id="createTableFoot"></div>
    </div>
<!-- END div for CREATE NEW TABLE pop-up list -->
<!-- div for Help pop-up list -->
  <div id="helpOverlay"></div>
    <div id="helpBox">
        <div>
            <div id="helpBoxHead"></div>
            <div id="helpBoxBody"></div>
            <div id="helpBoxFoot"></div>
        </div>
    </div>
<!-- END div for Help pop-up list -->
</body>
</html>
