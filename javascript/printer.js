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
      s+="<tr>";
      for(var i = 0; i<chart.datasets[0].bars.length; i++){
         s+="<th>" + chart.datasets[0].bars[i].label + "</th>";
      }
      s+="</tr>";
   }
   else{
      s+="<tr>";
      for(var i = 0; i<chart.datasets[0].points.length; i++){
         s+="<th>" + chart.datasets[0].points[i].label + "</th>";
      }
      s+="</tr>";
   }
   if(type === "bar"){
      for (var i = 0; i < chart.datasets.length; i++) {
         s+="<tr>";
         for (var j = 0; j < chart.datasets[i].bars.length; j++) {
            s+= "<td>" + chart.datasets[i].bars[j].value + "</td>";
         }
         s += "</tr>";   
      }
   }
   else{
       for (var i = 0; i < chart.datasets.length; i++) {
         s+="<tr>";
         for (var j = 0; j < chart.datasets[i].points.length; j++) {
            s+= "<td>" + chart.datasets[i].points[j].value + "</td>";
         }
         s += "</tr>";   
      }   
      
      }
         s+= "</table>";
   
   html+= s;
   html += "</body></html>";
   printWin = window.open("','_blank','left=0,top=0,width=500,height=500,fullscreen=1,toolbar=0,scrollbars=0,status  =0");
   printWin.document.write(html);
   printWin.document.close();
   printWin.focus();
   printWin.print();
   //printWin.close();
}
