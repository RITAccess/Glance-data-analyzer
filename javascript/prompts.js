   //File Alert Box
    function CustomAlert() {
        this.render = function (dialog) {
          var winW = window.innerWidth;
          var winH = window.innerHeight;
          var dialogoverlay = document.getElementById('dialogoverlay');
          var dialogbox = document.getElementById('dialogbox');
          dialogoverlay.style.display = "block";
          dialogoverlay.style.height = winH + "px";
          dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
          dialogbox.style.top = "100px";
          dialogbox.style.display = "block";
          document.getElementById('dialogboxhead').innerHTML = "Data Analyzer";
          document.getElementById('dialogboxbody').innerHTML = dialog + "<select id='graphSelector' title='Choose a Type of Graph' aria-label='Choose a Type of Graph'><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select>";
          document.getElementById('dialogboxfoot').innerHTML = "<button title='Cancel' onclick='Alert2.cancel()'>Cancel</button><button title='Submit' onclick='Alert.ok()'>Submit</button>"
          document.getElementById('dialogbox').style.visibility = "visible";
          document.getElementById('dialogoverlay').style.visibility = "visible";
          document.getElementById('graphSelector').focus();
        }
        this.ok = function () {
          var e = document.getElementById('dialogboxbody').firstChild.nextSibling;
          type = e.options[e.selectedIndex].value.toLowerCase();
          if(type != "line" && type != "bar" && type!= "scatter"){
              alert("No graph type has been selected! Please select a type of graph.");
              return;
            }
          loadFile();
          if (type === "line") document.getElementById("lineRadioButton").checked = true;
          else if (type === "bar") document.getElementById("barRadioButton").checked = true;
          else if (type === "scatter") document.getElementById("scatterRadioButton").checked = true;
          document.getElementById('dialogbox').style.visibility = "hidden";
          document.getElementById('dialogoverlay').style.visibility = "hidden";
          document.getElementsByClassName('uploadBtn')[0].focus();
        }
        this.cancel= function(){
          document.getElementById('dialogbox').style.visibility = "hidden";
          document.getElementById('dialogoverlay').style.visibility = "hidden";
          document.getElementById('title').focus();
        }
    }
    //Second Alert Box
    function CustomAlert2() {
        this.render = function (dialog) {
            var winW = window.innerWidth;
            var winH = window.innerHeight;
            var dialogoverlay = document.getElementById('dialogoverlay');
            var dialogbox = document.getElementById('dialogbox');
            dialogoverlay.style.display = "block";
            dialogoverlay.style.height = winH + "px";
            dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
            dialogbox.style.top = "100px";
            dialogbox.style.display = "block";
            document.getElementById('dialogboxhead').innerHTML = "Data Analyzer";
            document.getElementById('dialogboxbody').innerHTML = dialog + "<select id='graphSelector' title='Choose a Type of Graph' aria-label='Choose a Type of Graph'><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select><br><label>Choose number of rows: </label><input id='rows' title='Choose Number of Rows' aria-label='Choose Number of Rows' type='text' value='0'/><br><label>Choose number of columns: </label><input id='columns' type='text' title='Choose Number of Columns' aria-label='Choose Number of Columns' value='0'/>";
            document.getElementById('dialogboxfoot').innerHTML = "<button title='Cancel' onclick='Alert2.cancel()'>Cancel</button><button title='Reset' onclick=Alert2.reset()>Reset</button><button title='Reset' onclick='Alert2.ok()'>Submit</button>";
            document.getElementById('dialogbox').style.visibility = "visible";
            document.getElementById('dialogoverlay').style.visibility = "visible"
            document.getElementById('graphSelector').focus();
        }
        this.ok = function () {
            var e = document.getElementById('dialogboxbody').firstChild.nextSibling;
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
            document.getElementById('dialogbox').style.visibility = "hidden";
            document.getElementById('dialogoverlay').style.visibility = "hidden";
            document.getElementsByClassName('createBtn')[0].focus();
        }
        this.reset = function () {
            document.getElementById("rows").value=0;
            document.getElementById("columns").value=0;
        }
        this.cancel= function(){
          document.getElementById('dialogbox').style.visibility = "hidden";
          document.getElementById('dialogoverlay').style.visibility = "hidden";
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
        helpOverlay.style.height = winH + "px";
        helpBox.style.left = (winW / 2.78) - (550 * .5) + "px";
        helpBox.style.top = "100px";
        helpBox.style.display = "block";
        helpBox.style.width = "70%";
        document.getElementById('helpBox').setAttribute("tabindex", "0");
        document.getElementById('helpBoxHead').innerHTML = "<h1 tabindex='0'>Data Analyzer Help</h1>";
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

var Alert = new CustomAlert();
var Alert2 = new CustomAlert2();
var Alert3 = new helpAlert();
//Radio Button Chart/Graph Type Selection
var typeOpSel = function (typeOpSel) {
    var selType = document.getElementById("typeSel");
    var t = selType.options[selType.selectedIndex].value;
    t = t.toLowerCase();
    type = t;
    document.getElementById("colors").innerHTML="";
    changeType();
}
