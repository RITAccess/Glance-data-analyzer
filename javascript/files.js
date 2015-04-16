// Opens a file
var openFile = function(event) {
  var input = event.target;

  // use PapaParse for handing the csv file
  var results = Papa.parse(input.files[0], {
  	complete: function(results) {
      var resData = results.data;
      if((resData[resData.length-1].length == 1) && (resData[resData.length-1][0] == "")){
        results.data.pop();
      }
  		loadData(results);
  	}
  });
};

var loadListener = function(){
  document.getElementById('files').addEventListener('change', openFile, false);
}
