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
          document.getElementById('dialogboxbody').innerHTML = dialog + "<select id='graphSelector' aria-label='Choose a type of graph'><option value='Line'> none selected </option><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select>";
          document.getElementById('dialogboxfoot').innerHTML = "<button onclick='Alert2.cancel()'>Cancel</button><button onclick='Alert.ok()'>Submit</button>"
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
          document.getElementsByClassName('createBtn')[0].focus();
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
            document.getElementById('dialogboxbody').innerHTML = dialog + "<select id='graphSelector' aria-label='Choose a type of graph'><option onclick='Alert2.ok()' value='Line'> none selected </option><option value='Line'>Line Graph</option><option value='Bar'>Bar Graph</option><option value='scatter'>Scatter Plot</option></select><br><label>Choose number of rows: </label><input id='rows' type='text' value='0' aria-label='Choose number of rows'/><br><label>Choose number of columns: </label><input id='columns' type='text' value='0' aria-label='Choose number of columns'/>";
            document.getElementById('dialogboxfoot').innerHTML = "<button onclick='Alert2.cancel()'>Cancel</button><button onclick=Alert2.reset()>Reset</button><button onclick='Alert2.ok()'>Submit</button>";
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
          document.getElementsByClassName('createBtn')[0].focus();
        }
    }

    //Second Alert Box
    function CustomAlert3() {
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
            document.getElementById('dialogboxbody').innerHTML = dialog + "<select id='removalSelector' aria-label='Do you want to remove rows or columns?'><option onclick='Alert2.ok()' value='rows'> none selected </option><option value='Rows'>Rows</option><option value='columns'>Columns</option><option value='both'>Both</option></select><br><label>Choose starting point: </label><input id='startingPoint' type='text' value='0' aria-label='Choose starting point'/><br><label>Choose number to remove: </label><input id='remove' type='text' value='0' aria-label='Choose number of columns'/>";
            document.getElementById('dialogboxfoot').innerHTML = "<button onclick='Alert3.cancel()'>Cancel</button><button onclick=Alert3.reset()>Reset</button><button onclick='Alert3.ok()'>Submit</button>";
            document.getElementById('dialogbox').style.visibility = "visible";
            document.getElementById('dialogoverlay').style.visibility = "visible";
            document.getElementById('removalSelector').focus();
        }
        this.ok = function () {
            var e = document.getElementById('removalSelector');
            var action = e.options[e.selectedIndex].value.toLowerCase();
            var start = document.getElementById("startingPoint").value;
            var skip = document.getElementById("remove").value;
            if(action==="rows"){
              removeRows(start,skip);
            }
            else if(action === "columns"){
              removeColumns(start,skip);
            }
            else if(action === "both"){
              removeRows(start,skip);
              removeColumns(start,skip);
            }
            else{
              alert("No removal type selected!");
              return;
            }
            document.getElementById('dialogbox').style.visibility = "hidden";
            document.getElementById('dialogoverlay').style.visibility = "hidden";
            document.getElementsByClassName('createBtn')[0].focus();
        }
        this.reset = function () {
            document.getElementById("startingPoint").value=0;
            document.getElementById("remove").value=0;
        }
        this.cancel= function(){
          document.getElementById('dialogbox').style.visibility = "hidden";
          document.getElementById('dialogoverlay').style.visibility = "hidden";
          document.getElementsByClassName('createBtn')[0].focus();
        }
    }
var Alert = new CustomAlert();
var Alert2 = new CustomAlert2();
var Alert3 = new CustomAlert3();

//Radio Button Chart/Graph Type Selection
var rType = function (rType) {
    var selType = document.getElementById("rTypeSel");
    if (selType.firstChild.nextSibling.checked) type = "line";
    else if (document.getElementById("barRadioButton").checked) {
        type = "bar";
    } else if (document.getElementById("scatterRadioButton").checked) {
        type = "scatter";
    }
        document.getElementById("colors").innerHTML="";
        changeType();
}
