loadChart = function(data){
  /*
    Using Chart.js
  */
  data1 = [
      ['Kia', 'Nissan', 'Toyota', 'Honda'],
      [10, 11, 12, 13], // 2008
      [20, 11, 14, 13], // 2009
      [30, 15, 12, 13]  // 2010
    ];
  var data = {
    labels: data1[0],
    datasets: [
      {
        label: "2008",
        fillColor: "rgba(220,220,220,0)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: data1[1]
      },
      {
        label: "2009",
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: data1[2]
      },
      {
        label: "2010",
        fillColor: "rgba(110,150,110,0)",
        strokeColor: "rgba(110,150,110,1)",
        pointColor: "rgba(110,150,110,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(110,150,110,1)",
        data: data1[3]
      }
    ]
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  var myLineChart = new Chart(ctx).Line(data);
  document.getElementById("myChart").setAttribute("title","chart read out"); // by setting the attribute we can make the chart accessible
}
