var printWin;
function printPage()
{
   var html="<html>";
   html += "<head>";
   html += document.getElementsByTagName('head')[0].innerHTML;
   html += "</head>"
   html += "<body>";
   html += "<header><h1 id='title' tabindex='0'><a href='index.php'>Data Analyzer</a></h1></header>";
   html += "<div id='content'>";
   html += "<div id='graphImg'><img tabindex='0' alt='Data Analyzer Graph' width='800px' src='" + chart.toBase64Image() + "'/></div>";
   html += "<div id='summaryBox' style='display: block;'>";
   html += document.getElementById('summaryBox').innerHTML;
   html += "</div><div id='printTable'><h3 id='printTableHeader'>Data Table</h3>";
   html += "<div id='printTableBody'>";
   var s = "<table class='printTable'>";
   if(type === "bar"){
      var counter = 0;
      for(var j = 0; j<(chart.datasets[0].bars.length/10); j++){
         s+="<tr>";
         for(var i = 0; (i<chart.datasets[0].bars.length && counter<10 && chart.datasets[0].bars[(10*j)+i]!= undefined); i++){
            s+="<th>" + chart.datasets[0].bars[(10*j)+i].label + "</th>";
            counter++;
         }
         s+="</tr>";
         counter = 0;
         for (var i = 0; i < chart.datasets.length; i++) {
            s+="<tr>";
            for(var k = 0; (k<chart.datasets[i].bars.length && counter<10 && chart.datasets[i].bars[(10*j)+k]!= undefined); k++) {
               s+= "<td>" + chart.datasets[i].bars[(10*j) + k].value + "</td>";
               counter++;
            }
            counter = 0;
            s += "</tr>";
         }

         s+="</table><br /><table class='printTable'>";
         counter = 0;
      }
   }
   else{
      var counter = 0;
      for(var j = 0; j<(chart.datasets[0].points.length/10); j++){
         s+="<tr>";
         for(var i = 0; (i<chart.datasets[0].points.length && counter<10 && chart.datasets[0].points[(10*j)+i]!= undefined); i++){
            s+="<th>" + chart.datasets[0].points[(10*j)+i].label + "</th>";
            counter++;
         }
         s+="</tr>";
         counter = 0;
         for (var i = 0; i < chart.datasets.length; i++) {
            s+="<tr>";
            for(var k = 0; (k<chart.datasets[i].points.length && counter<10 && chart.datasets[i].points[(10*j)+k]!= undefined); k++) {
               s+= "<td>" + chart.datasets[i].points[(10*j) + k].value + "</td>";
               counter++;
            }
            counter = 0;
            s += "</tr>";
         }

         s+="</table><br /><table class='printTable'>";
         counter = 0;
      }
   }
   html += s;
   html += "</div></div>";
   html += "</content>";
   html += "</body></html>";
   printWin = window.open("','_blank','left=0,top=0,width=500,height=500,fullscreen=1,toolbar=0,scrollbars=0,status  =0");
   printWin.document.write(html);
   printWin.document.close();
   printWin.focus();
   printWin.print();
}
