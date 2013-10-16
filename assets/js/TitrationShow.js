var aTopVol = null
var bTopVol = null
var aBotVol = null
var bBotVol = null
var aTopCon = null
var bTopCon = null
var aBotCon = null
var bBotCon = null

function show(){

	if(document.getElementById("acid").checked) {
		document.getElementById("topAcid").style.visibility="visible";
		// Clears Base input boxes.
		document.getElementById('bTopVol').value = "";
		document.getElementById('bTopCon').value = "";
		document.getElementById('baseList').selectedIndex = 0;
	}

	else {
		document.getElementById("topAcid").style.visibility="hidden";
		}

	if (document.getElementById("acid2").checked) {
		document.getElementById("botAcid").style.visibility="visible";
		// Clears Base input boxes.
		document.getElementById('bBotVol').value = "";
		document.getElementById('bBotCon').value = "";
		document.getElementById('baseList2').selectedIndex = 0;
	}

	else {
		document.getElementById("botAcid").style.visibility="hidden";
		}

	if(document.getElementById("base").checked){
		document.getElementById("topBase").style.visibility="visible";
		// Clears Acid input boxes.
		document.getElementById('aTopVol').value = "";
		document.getElementById('aTopCon').value = "";
		document.getElementById('acidList').selectedIndex = 0;	
	}

	else {
		document.getElementById("topBase").style.visibility="hidden";
		}

	if (document.getElementById("base2").checked) {
		document.getElementById("botBase").style.visibility="visible";
		// Clears Acid input boxes.
		document.getElementById('aBotVol').value = "";
		document.getElementById('aBotCon').value = "";	
		document.getElementById('acidList2').selectedIndex = 0;
	}

	else {
		document.getElementById("botBase").style.visibility="hidden";
		}
}

function removeLetters(x){

	var l=document.getElementById(x);
	l.value=l.value.replace(/[^\d.]/g, "");
}

function option(sel){
	if(sel == "pH"){
		document.getElementById("neutral").checked = false;
		document.getElementById("mid").checked = false;
	}

	else if(sel =="eqpoint" || sel == "midpoint"){
		document.getElementById("desPH").value = "";
	}

	else{
	}
}

function help(){
	alert("How to use the Titration Calculator:\n\n-Check one radio button under both Being Added... and ...To (Note that one must be 'acid' and the other 'base')\n-Select the name of the substances using the two dropdown menus \n\nTo Find pH:\n-Enter values for Volume (mL) and Concentration (M) in all four input boxes that appear\n-Click on the Calculate button\n\nTo Find Volume or Concentration:\n-Leave the box that you want to find blank\n-Enter values for the three other input boxes\n-Either... enter a desired pH, select the Neutralization/Equivalence button, or select the Midpoint button\n-Click on the Calculate button\n\n**The three options (pH, Neutralization/Equivalance, Midpoint) should only be entered if a Volume or Concentration is left blank\n**To reset these three options, click on the pH input box\n**Entering data into only two boxes may lead to inaccurate results, if any at all");
}
