loadChart = function(data){
  /*
    Using Chart.js
  */
  data1 = data;
  deque(data[0]);
  var data = {
    labels: data1[0],
    datasets: [
      {
        label: deque(data[1]),
        fillColor: "rgba(220,220,220,0)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: data[1]
      },
      {
        label: deque(data[2]),
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: data[2]
      },
      {
        label: deque(data[3]),
        fillColor: "rgba(110,150,110,0)",
        strokeColor: "rgba(110,150,110,1)",
        pointColor: "rgba(110,150,110,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(110,150,110,1)",
        data: data[3]
      }
    ]
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  var myLineChart = new Chart(ctx).Line(data);
  document.getElementById("myChart").setAttribute("title","chart read out"); // by setting the attribute we can make the chart accessible
}

function deque(array) {
  var ele = array[0];
  array.splice(0,1);
  return ele;
}
