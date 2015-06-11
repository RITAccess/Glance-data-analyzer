function printPage()
{
   var html="<html>";
   html+= document.getElementsByTagName("html")[0].innerHTML;
   html+="</html>";
   var str = document.getElementById("dataPlot").innerHTML;
   var ind = html.indexOf(str);
   var str2 = document.getElementById("rTypeSel");
   var ind2 = html.indexOf(str2);
      var s;
        //retrieve chart data and put into a csv file
        if(type === "line" || type === "scatter"){
      for (var i = 0; i < chart.datasets.length; i++) {
                for (var j = 0; j < chart.datasets[i].points.length; j++) {
                    if (i === 0 && j === 0) {
                        for (var k = 0; k < chart.datasets[i].points.length; k++) {
                            s += chart.datasets[i].points[k].label;
                            if (k + 1 < chart.datasets[i].points.length) s += ",";
                        }
                        s += "\n";
                    }
                    s += chart.datasets[i].points[j].value;
                    if (j + 1 < chart.datasets[i].points.length) s += ",";
                }
                s += "\n";
            }
    }
    else if (type === "bar") {
            for (var i = 0; i < chart.datasets.length; i++) {
                for (var j = 0; j < chart.datasets[i].bars.length; j++) {
                    if (i === 0 && j === 0) {
                        for (var k = 0; k < chart.datasets[i].bars.length; k++) {
                            s += chart.datasets[i].bars[k].label;
                            if (k + 1 < chart.datasets[i].bars.length) s += ",";
                        }
                        s += "\n";
                    }
                    s += chart.datasets[i].bars[j].value;
                    if (j + 1 < chart.datasets[i].bars.length) s += ",";
                }
                s += "\n";
            }

        }
        s = s.substring(9);
        s= s.replace(/(?:\r\n|\r|\n)/g, '<br />');
   html = html.substring(0,ind) + s +  html.substring(ind + str.length);
   var printWin = window.open("','_blank','left=0,top=0,width=500,height=500,fullscreen=1,toolbar=0,scrollbars=0,status  =0");
   printWin.document.write(html);
   printWin.document.close();
   printWin.focus();
   printWin.print();
   //printWin.close();
}