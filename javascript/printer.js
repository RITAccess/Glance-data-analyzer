var printWin;
function printPage()
{
   var html="<html>";
   html += "<head>";
   html += document.getElementsByTagName('head')[0].innerHTML;
   html += "</head>"
   html += "<body>";
   /*html+="<div id='dataPlot'>";
   html+= document.getElementById('dataPlot').innerHTML;
   html+="</div>"
   html+="</body></html>";
   var str = document.getElementById("dataPlot").innerHTML;
   var ind = html.indexOf(str);
   var str2 = document.getElementById("rTypeSel");
   var ind2 = html.indexOf(str2);*/
   var s = "<table class='printTable'>";
   if(type === "bar"){
      var counter = 0;
      for(var j = 0; j<(chart.datasets[0].bars.length/15); j++){
         s+="<tr>";
         for(var i = 0; (i<chart.datasets[0].bars.length && counter<15 && chart.datasets[0].bars[(15*j)+i]!= undefined); i++){
            s+="<th>" + chart.datasets[0].bars[(15*j)+i].label + "</th>";
            counter++;
         }
         s+="</tr>";
         counter = 0;
         for (var i = 0; i < chart.datasets.length; i++) {
            s+="<tr>";
            for(var k = 0; (k<chart.datasets[i].bars.length && counter<15 && chart.datasets[i].bars[(15*j)+k]!= undefined); k++) {
               s+= "<td>" + chart.datasets[i].bars[(15*j) + k].value + "</td>"; 
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
      for(var j = 0; j<(chart.datasets[0].points.length/15); j++){
         s+="<tr>";
         for(var i = 0; (i<chart.datasets[0].points.length && counter<15 && chart.datasets[0].points[(15*j)+i]!= undefined); i++){
            s+="<th>" + chart.datasets[0].points[(15*j)+i].label + "</th>";
            counter++;
         }
         s+="</tr>";
         counter = 0;
         for (var i = 0; i < chart.datasets.length; i++) {
            s+="<tr>";
            for(var k = 0; (k<chart.datasets[i].points.length && counter<15 && chart.datasets[i].points[(15*j)+k]!= undefined); k++) {
               s+= "<td>" + chart.datasets[i].points[(15*j) + k].value + "</td>"; 
               counter++;
            }
            counter = 0;
            s += "</tr>";
         }

         s+="</table><br /><table class='printTable'>";
         counter = 0;
      }
   }
   html+= s;
   html += "</body></html>";
   printWin = window.open("','_blank','left=0,top=0,width=500,height=500,fullscreen=1,toolbar=0,scrollbars=0,status  =0");
   printWin.document.write(html);
   printWin.document.close();
   printWin.focus();
   printWin.print();
   //printWin.close();
}
