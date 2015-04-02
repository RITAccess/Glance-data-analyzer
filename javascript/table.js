loadTable = function(fileData){
  /*
    Handsontable
  */
  var container1 = document.getElementById('table');
  var settings1 = { data: fileData };
  var hot1 = new Handsontable(container1, settings1);
  hot1.render();
  hot1.updateSettings({
    beforeKeyDown: function (e) {
      var selection = hot1.getSelected();
      // ENTER
      if (e.keyCode === 13) {
        // if last change affected a single cell and did not change it's values
        // if (lastChange && lastChange.length === 1 && lastChange[0][2] == lastChange[0][3]) {
        //   e.stopImmediatePropagation();
        //   hot.spliceCol(selection[1], selection[0], 0, ''); // add new cell
        //   hot.selectCell(selection[0], selection[1]); // select new cell
        // }
        console.log("push enter");
        console.log(selection);
      }
    }
  });


  function bindDumpButton() {

    Handsontable.Dom.addEvent(document.body, 'click', function (e) {

      var element = e.target || e.srcElement;

      if (element.nodeName == "BUTTON" && element.name == 'dump') {
        var name = element.getAttribute('data-dump');
        var instance = element.getAttribute('data-instance');
        var hot = window[instance];
        console.log('data of ' + name, hot.getData());
      }
    });
  }
  bindDumpButton();
}
