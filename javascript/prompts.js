//File Alert Box
function loadCsvAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var loadCsvOverlay = document.getElementById('loadCsvOverlay');
        var loadCsvBox = document.getElementById('loadCsvBox');
        loadCsvOverlay.style.display = "block";
        loadCsvOverlay.style.height = "100%";
        loadCsvBox.style.display = "block";
        loadCsvBox.style.width = "40%";
        loadCsvBox.style.top = "15%";
        loadCsvBox.style.marginLeft = "30%";
        document.getElementById('loadCsvHead').innerHTML = "Glance";
        document.getElementById('loadCsvBody').innerHTML = dialog + "<select id='graphSelector' title='Choose a Type of Graph' aria-label='Choose a Type of Graph'><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select>";
        document.getElementById('loadCsvFoot').innerHTML = "<button title='Cancel' onclick='Alert.cancel()'>Cancel</button><button title='Submit' onclick='Alert.ok()'>Submit</button>"
        document.getElementById('loadCsvBox').style.visibility = "visible";
        document.getElementById('loadCsvOverlay').style.visibility = "visible";
        document.getElementById('graphSelector').focus();
    }
    this.ok = function () {
        var e = document.getElementById('loadCsvBody').firstChild.nextSibling;
        type = e.options[e.selectedIndex].value.toLowerCase();
        if(type != "line" && type != "bar" && type!= "scatter"){
            alert("No graph type has been selected! Please select a type of graph.");
            return;
        }
        loadFile();
        if (type === "line") document.getElementById("lineRadioButton").checked = true;
        else if (type === "bar") document.getElementById("barRadioButton").checked = true;
        else if (type === "scatter") document.getElementById("scatterRadioButton").checked = true;
        document.getElementById('loadCsvBox').style.visibility = "hidden";
        document.getElementById('loadCsvOverlay').style.visibility = "hidden";
        document.getElementsByClassName('uploadBtn')[0].focus();
        document.getElementById('playButton').setAttribute("aria-hidden", "false");
        document.getElementById('pauseButton').setAttribute("aria-hidden", "false");
        document.getElementById('stopButton').setAttribute("aria-hidden", "false");
    }
    this.cancel= function(){
        document.getElementById('loadCsvBox').style.visibility = "hidden";
        document.getElementById('loadCsvOverlay').style.visibility = "hidden";
        document.getElementById('title').focus();
    }
}
//Second Alert Box
function createTableAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var createTableOverlay = document.getElementById('createTableOverlay');
        var createTableBox = document.getElementById('createTableBox');
        createTableOverlay.style.display = "block";
        createTableOverlay.style.height = "100%";
        createTableBox.style.display = "block";
        createTableBox.style.width = "50%";
        createTableBox.style.top = "15%";
        createTableBox.style.marginLeft = "25%";
        document.getElementById('createTableHead').innerHTML = "Glance";
        document.getElementById('createTableBody').innerHTML = dialog + "<select id='graphSelector' title='Choose a Type of Graph' aria-label='Choose a Type of Graph'><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select><br><label>Choose number of rows: </label><input id='rows' title='Choose Number of Rows' aria-label='Choose Number of Rows' type='text' value='0'/><br><label>Choose number of columns: </label><input id='columns' type='text' title='Choose Number of Columns' aria-label='Choose Number of Columns' value='0'/>";
        document.getElementById('createTableFoot').innerHTML = "<button title='Cancel' onclick='Alert2.cancel()'>Cancel</button><button title='Reset' onclick=Alert2.reset()>Reset</button><button title='Reset' onclick='Alert2.ok()'>Submit</button>";
        document.getElementById('createTableBox').style.visibility = "visible";
        document.getElementById('createTableOverlay').style.visibility = "visible"
        document.getElementById('graphSelector').focus();
    }
    this.ok = function () {
        var colorlist = document.getElementById("colors1");
        while(colorlist.firstChild){
            colorlist.removeChild(colorlist.firstChild);
        }
        var e = document.getElementById('createTableBody').firstChild.nextSibling;
        type = e.options[e.selectedIndex].value.toLowerCase();
        if(document.getElementById('rows').value * document.getElementById('columns').value >= 1000 ||document.getElementById('columns').value >= 1000 ||document.getElementById('rows').value >= 1000){
            if(!confirm("Large data set may cause browser instability, continue anyways?")){
                this.reset;
                return;
            }
        }
        createFile(document.getElementById('rows').value, document.getElementById('columns').value);
        if (type === "line") document.getElementById("lineRadioButton").checked = true;
        else if (type === "bar") document.getElementById("barRadioButton").checked = true;
        else if (type === "scatter") document.getElementById("scatterRadioButton").checked = true;
        document.getElementById('createTableBox').style.visibility = "hidden";
        document.getElementById('createTableOverlay').style.visibility = "hidden";
        document.getElementById('playButton').setAttribute("aria-hidden", "false");
        document.getElementById('pauseButton').setAttribute("aria-hidden", "false");
        document.getElementById('stopButton').setAttribute("aria-hidden", "false");
        document.getElementsByClassName('createBtn')[0].focus();

    }
    this.reset = function () {
        document.getElementById("rows").value=0;
        document.getElementById("columns").value=0;
    }
    this.cancel= function(){
        document.getElementById('createTableBox').style.visibility = "hidden";
        document.getElementById('createTableOverlay').style.visibility = "hidden";
        document.getElementById('title').focus();
    }
}
function helpAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var helpOverlay = document.getElementById('helpOverlay');
        var helpBox = document.getElementById('helpBox');
        helpOverlay.style.display = "block";
        helpOverlay.style.height = "100%";
        helpBox.style.display = "block";
        helpBox.style.width = "70%";
        helpBox.style.top = "15%";
        helpBox.style.left = "15%";
        document.getElementById('helpBox').setAttribute("tabindex", "0");
        document.getElementById('helpBoxHead').innerHTML = "<h1 tabindex='0'>Glance Help</h1>";
        document.getElementById('helpBoxBody').innerHTML = "<p>This web application was designed to help analyze data through graphs, calculated values, and sound.Here's a quick look at how to use the application:</p><ul><li>Audio Controls: The audio controls allow you to choose which set of data to play and at what speed.</li><li>Graph: You can choose from three separate options when making a graph: Line, Bar, and Scatter Plot. The overlay on the graph can highlight certain parts of the data to be turned into sound.</li><li>Data Table: There are two options with the data table; load a pre-made CSV (Comma Separated Value) file, or choose to create an empty one. Rows and columns can be added or subtracted from the table, which can be saved and downloaded.</li><li>Graph Data: In this section, you can customize data set colors, as well as toggle their visibility. Graph data displays minimums, maximums, and averages for each individual row of the data set, as well as the overall total.</li></ul><h3>To get started, select Load CSV or Create New Table at the top!</h3>";
        document.getElementById('helpBoxFoot').innerHTML = "<button title='Close' onclick='Alert3.cancel()'>Close</button>"
        document.getElementById('helpBox').style.visibility = "visible";
        document.getElementById('helpOverlay').style.visibility = "visible";
        document.getElementById('helpBox').focus();
    }
    this.cancel= function(){
        document.getElementById('helpBox').style.visibility = "hidden";
        document.getElementById('helpOverlay').style.visibility = "hidden";
        document.getElementById('title').focus();
    }
}

function instAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var instOverlay = document.getElementById('instOverlay');
        var instBox = document.getElementById('instBox');
        instOverlay.style.display = "block";
        instOverlay.style.height = "100%";
        instBox.style.display = "block";
        instBox.style.width = "70%";
        instBox.style.top = "15%";
        instBox.style.left = "15%";
        document.getElementById('instBox').setAttribute("tabindex", "0");
        document.getElementById('instBoxHead').innerHTML = "<h1 tabindex='0'>Instructions</h1>";
        document.getElementById('instBoxBody').innerHTML = "<p>I. Navigation</p><ul><li>Navigating on Safari/Chrome, without screen reader:<p> 1. Use “tab” + “alt (option)” to navigate through the page<p>" +
            "<p>2. To navigate back, use “tab” + “shift” + “alt (option)”<p></p>" +
            "</li><li>Navigating on Safari/Chrome, with screen reader:<p>1. Use “ctrl (control)”+ “alt (option)” + arrow keys to navigate through the page<p><p>2. Use “tab” + “alt (option)” to exit the table<p>" +
            "</p></li><li>Navigate FireFox, with screen reader:<p>1. Use “ctrl (control)” + “alt (option)” + arrow keys to navigate the page<p><p>2. To exit the table navigate to the rows last column and press “alt (option)” + “ctrl (control)” + arrow keys<p>" +
            "</p></li></ul><h3>Click Next page for more assistance</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Next Page' onclick='Alert4.next()'>Next Page</button><button title='Close' onclick='Alert4.cancel()'>Close</button>"
        document.getElementById('instBox').style.visibility = "visible";
        document.getElementById('instOverlay').style.visibility = "visible";
        document.getElementById('instBox').focus();
    }
    this.next = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var instOverlay = document.getElementById('instOverlay');
        var instBox = document.getElementById('instBox');
        instOverlay.style.display = "block";
        instOverlay.style.height = "100%";
        instBox.style.display = "block";
        instBox.style.width = "70%";
        instBox.style.top = "15%";
        instBox.style.left = "15%";
        document.getElementById('instBox').setAttribute("tabindex", "0");
        document.getElementById('instBoxHead').innerHTML = "<h1 tabindex='0'>Instructions</h1>";
        document.getElementById('instBoxBody').innerHTML = "<p>II. Getting Started</p><ul><li>Loading a graph:<p> 1. Navigate to and click the “Load CSV” button<p><p>2. Use the file browser menu to select a .csv file to upload (can only load a .csv file)<p>" +
            "<p>3. A new menu should appear prompting you to choose a graph type.<p><p>4. At this point, if you decide you have uploaded an incorrect file, click the “Cancel” button<p><p>5. Otherwise, select a graph type from the drop-down menu (bar graph, line graph, or scatter plot) and then click submit <p> </p>" +
            "</li><li>Creating a new graph:<p>1. Navigate to the “Create New Table” button<p><p>2. At this point, if you decide you do not want to create a new table, click “Cancel”<p>" +
            "<p>3. Choose a graph type from the drop-down menu (bar graph, line graph, or scatter plot)<p><p>4. In the first text input box, enter the number of rows you would like your graph to have (valid tables require at least one row, if a lower number is chosen the number of rows will automatically be set to one)<p>" +
            "<p>5. In the next input box, enter the number of columns you would like your graph to have (valid tables need at least two columns, if a lower number is chosen the number of columns will automatically be set to two)<p>" +
            "<p>6. At this point, if you decide you don't want your current parameters for the graph and want to start again from scratch, click the “Reset” button<p><p>7. Once you are satisfied with your conditions, click the “Submit” button<p>" +
            "<p>8. You will now have a graph of your specified size with all data points set to a default of zero <p></p></li></ul><h3>Click Next page for more assistance</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Next Page' onclick='Alert4.next1()'>Next Page</button><button title='Close' onclick='Alert4.cancel()'>Close</button>"
        document.getElementById('instBox').style.visibility = "visible";
        document.getElementById('instOverlay').style.visibility = "visible";
        document.getElementById('instBox').focus();
    }
    this.next1 = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var instOverlay = document.getElementById('instOverlay');
        var instBox = document.getElementById('instBox');
        instOverlay.style.display = "block";
        instOverlay.style.height = "100%";
        instBox.style.display = "block";
        instBox.style.width = "70%";
        instBox.style.top = "15%";
        instBox.style.left = "15%";
        document.getElementById('instBox').setAttribute("tabindex", "0");
        document.getElementById('instBoxHead').innerHTML = "<h1 tabindex='0'>Instructions</h1>";
        document.getElementById('instBoxBody').innerHTML = "<p>III. Editing Data</p><ul><li>Changing data in the graph:<p> 1. Navigate to the cell representing the data point/label you would like to edit in the data table<p><p>2. Edit the text in this cell<p>" +
            "<p>3. Press the tab or enter key to submit change<p></p>" +
            "</li><li>Remove column of data:<p>1. On the top row of the table, navigate across to the label for the column you wish to remove<p><p>2. Delete the contents<p></p>" +
            "<p>3. Press the tab or enter key to finalize<p><p>4. (If you have 2 or less columns, this will not work)<p></p></li>" +
            "<li>Remove row of data: <p>1. In the first column of the table, navigate down to the label for the row you wish to remove<p><p>2. Delete the contents<p><p>3. Press the tab or enter key to finalize<p>" +
            "<p>4. (If you only have 1 row, this will not work)<p></p></li>" +
            "<li>Add/Remove new Row/Column:<p>1. Navigate to the “Add/Remove Row/Column” buttons (located below table)<p><p>2. Press the “–” button to remove the last row or column and press the “+” button to add a row or column<p>" +
            "<p>3. The screen reader will read the minus or plus as “Add Row” “Remove Row” “Add Column” “ Remove Column” respectively<p></p></li>" +
            "<li> Undo/Redo/Reset the table:<p>1. To undo a change, press the “Undo” button, located to the right of the “Add/Remove Column” button<p><p>2. To the right of the “Undo” button is the “Redo” button. Click this to redo a change made in the table<p>" +
            "<p>3. To the right of the “Redo” button is the “Reset” button. This resets the table to its original state. This cannot be undone<p></p></li>" +
            "<li> Change Graph Type:<p>1. Navigate to the page header<p><p>2. Move to the “Change Graph Type” drop down menu<p><p>3. Select a graph type and press enter<p><p>4. Your graph will now be redrawn as the new type<p></p></li></ul><h3>Click Next page for more assistance</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Next Page' onclick='Alert4.next2()'>Next Page</button><button title='Close' onclick='Alert4.cancel()'>Close</button>"
        document.getElementById('instBox').style.visibility = "visible";
        document.getElementById('instOverlay').style.visibility = "visible";
        document.getElementById('instBox').focus();
    }
    this.next2 = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var instOverlay = document.getElementById('instOverlay');
        var instBox = document.getElementById('instBox');
        instOverlay.style.display = "block";
        instOverlay.style.height = "100%";
        instBox.style.display = "block";
        instBox.style.width = "70%";
        instBox.style.top = "15%";
        instBox.style.left = "15%";
        document.getElementById('instBox').setAttribute("tabindex", "0");
        document.getElementById('instBoxHead').innerHTML = "<h1 tabindex='0'>Instructions</h1>";
        document.getElementById('instBoxBody').innerHTML = "<p>IV. Saving Data</p><ul><li>Saving table data to file:<p> 1. Navigate to the “Download CSV” button: Screen readers will read “Download CSV”<p><p>2. Click this to download a CSV file representing the current table<p>" +
            "</li><li>Printing contents of data table and graph:<p>1. Navigate to the “Print” button: Screen readers will read “Print”<p><p>2. Click this to print the page in a printer friendly format<p>" +
            "</p></li></ul><h3>Click Next page for more assistance</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Next Page' onclick='Alert4.next3()'>Next Page</button><button title='Close' onclick='Alert4.cancel()'>Close</button>"
        document.getElementById('instBox').style.visibility = "visible";
        document.getElementById('instOverlay').style.visibility = "visible";
        document.getElementById('instBox').focus();
    }
    this.next3 = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var instOverlay = document.getElementById('instOverlay');
        var instBox = document.getElementById('instBox');
        instOverlay.style.display = "block";
        instOverlay.style.height = "100%";
        instBox.style.display = "block";
        instBox.style.width = "70%";
        instBox.style.top = "15%";
        instBox.style.left = "15%";
        document.getElementById('instBox').setAttribute("tabindex", "0");
        document.getElementById('instBoxHead').innerHTML = "<h1 tabindex='0'>Instructions</h1>";
        document.getElementById('instBoxBody').innerHTML = "<p>V. Data Sonification</p><ul><li>Play Current Row:<p> 1. Under the graph is the audio settings panel, this panel controls all audio settings for data sonification<p>" +
            "<p>2. First, select the row number that you wish to play from the drop-down menu that appears after the label, “Row number”<p>" +
            "<p>3. Next, select a speed. The default speed is 100 beats per minute. The speed increases by 20 beats per minute for each number your speed counter increases<p>" +
            "<p>4. Next, select an instrument. This instrument will be used to play your data (Safari users will be limited to a small number of instruments due to the browser’s audio incompatibilities)<p>" +
            "<p>5. Finally, click the “Play” button to play the sonic representation of your data. Screen reader will read “Play Toggle”<p>" +
            "<p>6. Please note that only values up to 100,000 are currently supported. Higher numbers may work, but are not officially supported.<p>" +
            "</p></li><li>Pause playback:<p>1. To pause audio while it is playing, click the “Pause” button screen reader will read “Pause Toggle”<p><p>2. After audio is paused, resume it with the “Play” button<p>" +
            "</p></li>" +
            "<li>Stop playback:<p>1. To stop audio playback, click the “Stop” button screen reader will read “Stop Toggle”<p>" +
            "<p>2. After the “Stop” button is clicked, audio will play from the beginning<p></p></li></ul><h3>Click Next page for more assistance</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Next Page' onclick='Alert4.next4()'>Next Page</button><button title='Close' onclick='Alert4.cancel()'>Close</button>"
        document.getElementById('instBox').style.visibility = "visible";
        document.getElementById('instOverlay').style.visibility = "visible";
        document.getElementById('instBox').focus();
    }
    this.next4 = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var instOverlay = document.getElementById('instOverlay');
        var instBox = document.getElementById('instBox');
        instOverlay.style.display = "block";
        instOverlay.style.height = "100%";
        instBox.style.display = "block";
        instBox.style.width = "70%";
        instBox.style.top = "15%";
        instBox.style.left = "15%";
        document.getElementById('instBox').setAttribute("tabindex", "0");
        document.getElementById('instBoxHead').innerHTML = "<h1 tabindex='0'>Instructions</h1>";
        document.getElementById('instBoxBody').innerHTML = "<p>VI. Advanced Playback Options</p><ul><li>Select Play Mode:<p> 1. Inside the audio settings panel for bar graph or scatter plot, you will see an added menu for play mode<p>" +
            "<p>2. For bar graph, this will include “Normal”, “Play by Column”, and “Play Columns as Chords”<p><p>3. For scatter plot, this will include “Normal”, and “Play Regression Line”<p></p>" +
            "</li><li>Bar graph - Play by column:<p>1. Select “Play by Column” as the play mode for bar graph<p><p>2. Choose a column to play from the new column selector in the audio settings panel<p>" +
            "<p>3. Click the “Play” button and hear just the selected column for each row in the order of rows<p></p></li>" +
            "<li>Bar graph - Play columns as chords:<p>1. Select “Play Columns as Chords” as the play mode for bar graph<p><p>2. Click the “Play” button<p>" +
            "<p>3. This will play each column as a chord of all of the rows in that column<p></p></li>" +
            "<li>Scatter plot - Play regression line:<p>1. Select “Play Regression Line” as the play mode for scatter plot<p><p>2. Click the “Play” button<p>" +
            "<p>3. This will play an audio representation of the regression line for your scatter plot<p></p></li></ul><h3>Click Next page for more assistance</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Next Page' onclick='Alert4.next5()'>Next Page</button><button title='Close' onclick='Alert4.cancel()'>Close</button>"
        document.getElementById('instBox').style.visibility = "visible";
        document.getElementById('instOverlay').style.visibility = "visible";
        document.getElementById('instBox').focus();
    }
    this.next5 = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var instOverlay = document.getElementById('instOverlay');
        var instBox = document.getElementById('instBox');
        instOverlay.style.display = "block";
        instOverlay.style.height = "100%";
        instBox.style.display = "block";
        instBox.style.width = "70%";
        instBox.style.top = "15%";
        instBox.style.left = "15%";
        document.getElementById('instBox').setAttribute("tabindex", "0");
        document.getElementById('instBoxHead').innerHTML = "<h1 tabindex='0'>Instructions</h1>";
        document.getElementById('instBoxBody').innerHTML = "<p>VII. Changing Colors</p><ul><li>Change the color of a line:<p> 1. Navigate to the “Graph Data” section<p>" +
            "<p>2. Move to the label of the row you want to change the color of<p><p>3. Navigate to the input box. Screen reader will read “Enter Color:”<p>" +
            "<p>4. Click on the input box box to bring up a color chooser, and click the desired color. Alternatively, Type in a color name (ex. blue) or a valid hexadecimal color (ex.#0000FF)<p>" +
            "<p>5. The label next to the input box as well as the line will change color indicating that a correct color was detected<p></p>" +
            "</li><li>Hide a line on the graph:<p>1. Navigate to the “Graph Data” section of the page<p><p>2. Move to the checkbox element directly following the input box for line color<p>" +
            "<p>3. Press the space bar or enter to toggle the visibility of the line (checked is visible, unchecked is invisible)<p></p></li>" +
            "<li>Change the color of the site background, text, and graph background:<p>1. Navigate to the “Change Background Color” section of the page<p>" +
            "<p>2. To change the site background, type in a valid color into the site background input field labeled “Change Site Background Color”<p>" +
            "<p>3. Do the same with graph background and text color with their respective input fields<p><p>4. In order to ensure high contrast, there are high contrast checkboxes following each of these input boxes. Click them to force high contrast<p>" +
            "<p>5. Lastly, there are refresh buttons for site background, graph background, and text color. Use these to refresh the background/text color to the default value<p></p></li></ul><h3>Click Next page for more assistance</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Next Page' onclick='Alert4.next()'>Next Page</button><button title='Close' onclick='Alert4.cancel()'>Close</button>"
        document.getElementById('instBox').style.visibility = "visible";
        document.getElementById('instOverlay').style.visibility = "visible";
        document.getElementById('instBox').focus();
    }
    this.cancel= function(){
        document.getElementById('instBox').style.visibility = "hidden";
        document.getElementById('instOverlay').style.visibility = "hidden";
        document.getElementById('title').focus();
    }
}
var Alert = new loadCsvAlert();
var Alert2 = new createTableAlert();
var Alert3 = new helpAlert();
var Alert4 = new instAlert();
//Radio Button Chart/Graph Type Selection
var typeOpSel = function (typeOpSel) {
    var selType = document.getElementById("typeSel");
    var t = selType.options[selType.selectedIndex].value;
    t = t.toLowerCase();
    type = t;
    document.getElementById("colors").innerHTML="";
    changeType();
}
