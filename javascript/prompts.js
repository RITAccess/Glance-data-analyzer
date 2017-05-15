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
        document.getElementById('instBoxBody').innerHTML = "<p>test instructions call</p><ul><li>new line test</li><li>new line test</li><li>new line test</li><li>new line test</li></ul><h3>bottom heading i think</h3>";
        document.getElementById('instBoxFoot').innerHTML = "<button title='Close' onclick='Alert4.cancel()'>Close</button>"
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
