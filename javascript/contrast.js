//Calculate the contrast ration between 2 hex colors
var calcContrast = function(hex,hex2){
  var r = parseInt(hex.substring(1,3), 16);
  var g = parseInt(hex.substring(3,5), 16);
  var b = parseInt(hex.substring(5), 16);
  var lum = calcLum(r,g,b);
  var r2 = parseInt(hex2.substring(1,3), 16);
  var g2 = parseInt(hex2.substring(3,5), 16);
  var b2 = parseInt(hex2.substring(5), 16);
  var lum2 = calcLum(r2,g2,b2);
  if(lum > lum2){
    var contrast = (lum + 0.05) / (lum2 + 0.05);
  }
  else{
    var contrast = (lum2 + 0.05) / (lum + 0.05);
  }
  return contrast;
}

//Calculate the luminosity of a color (used for contrast comparison)
var calcLum = function(r,g,b){
  r /= 255; //R_sRGB
  g /= 255; //G_sRGB
  b /= 255; //B_sRGB
  var valArr = [r,g,b];
  for(var i = 0; i < valArr.length; i++){
    if(valArr[i]<=  0.03928){
      valArr[i] /= 12.92;
    }
    else{
      var val = valArr[i]+0.055;
      val /= 1.055
      valArr[i] = Math.pow(val,2.4);
    }
  }
  var l = 0.2126 * valArr[0] + 0.7152 * valArr[1] + 0.0722 * valArr[2];
  return l;
}

//Find the greatest contrasting color in the global list of colors given a hex color
var findContrastor = function(hex){
  if(hex.toLowerCase() === "#ff0000")
    return "#FFFFFF";
  var max = -1;
  var maxCon;
  for(var key in colors){
    var candidateContrast = calcContrast(hex,colors[key]);
    if(candidateContrast>max){
      max = candidateContrast;
      maxCon = colors[key];
    }
    if(candidateContrast >= 7){
      return colors[key];
    }
  }
  return maxCon;
}

//Convert an RGB/RGBA string to a hex number. Also supports values over 255
var convertRGBtoHex= function(conColor){
    if(conColor === undefined){
      var e  = new Error();
      console.log(e.stack);
    }
    conColor = conColor.substring(conColor.indexOf('(')+1);
    var r = conColor.substring(0,conColor.indexOf(','));
    conColor = conColor.substring(conColor.indexOf(' '));
    var g = conColor.substring(0,conColor.indexOf(','));
    conColor = conColor.substring(conColor.indexOf(' '));
    conColor = conColor.substring(conColor.indexOf(','));
    conColor = conColor.substring(conColor.indexOf(' '));
    var b = conColor.substring(0,conColor.indexOf(','));
    if(b==="")
      b=conColor.substring(0,conColor.indexOf(')'));
    r = parseInt(r);
    if(r>255)
      r=255;
    r = r.toString(16);
    if(r.length<2){
      r = "0" + r;
    }
    g = parseInt(g);
    if(g>255)
      g=255;
    g = g.toString(16);
    if(g.length<2){
      g = "0" + g;
    }
    b = parseInt(b);
    if(b>255)
      b=255;
    b = b.toString(16);
    if(b.length<2){
      b = "0" + b;
    }
    conColor = "#";
    conColor += r;
    conColor += g;
    conColor += b;
    return conColor;
}
