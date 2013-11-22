window.onload = function(){
	var textinput = document.getElementById("input");
	textinput.focus();
	textinput.select();
}

function getInput(){
	var subTotal = 0;
	var work = 0;
	var total=0;
	var i=0;
	var j=0;
	var k=0;
	var inPar = "";
	var sepArray = "";
	var userIn = document.getElementById("input").value;
		// Use Cu(NO3)2H5(CO2)3 as the example.
	var userArray=userIn.match(/(?:[A-Z][a-z]*|\d+|[()])/g);
		// Cu, ( , N , O ,  3 ...	
	while (i < userArray.length){
		if (userArray[i] == "("){
			inPar = userIn.match(/\(.*?\)/g).map(function(match) { return match.substr(1); });
			// inPar.length=2 .. NO3) , CO2)
			sepArray = inPar[k].match(/(?:[A-Z][a-z]*|\d+|[()])/g);
			// N , O , 3 , ) ..
			// The below while loop deals with the input in parenthesis, multiplying the value by the first character after the ")".
			while (j < sepArray.length){
				if (sepArray[j] == ")"){
					if (!isNaN(userArray[(parseInt(i) + sepArray.length + 1)])){
						work *= userArray[(parseInt(i) + sepArray.length + 1)];
					}
					else{
						work *= 1;
					}
					subTotal += work;
					work = 0;
				}
				else if (!isNaN(sepArray[j] * 1)){
					work += (sepArray[j]*elementList[sepArray[j-1]])-(elementList[sepArray[j-1]]);
				}
				else{
					work += elementList[sepArray[j]];
				}
				j++;
			}
			i += (sepArray.length + 1);
			j = 0;
			k++;
		}
		// After the while loop, starts on the first character after the end parenthesis. 
		// We will most likely do nothing with it, as it will almost always have been used already in the above while loop.
		if (userArray[i] == "("){
			i--;
		}
		else if (userArray[i] == undefined){
			// Do Nothing
		}
	    // If character is a number:
	    else if (!isNaN(userArray[i] * 1)){
	    	if (userArray[i-1] == ")"){
	    		// Do nothing
	    	}
	    	else {
			   	total += (userArray[i]*elementList[userArray[i-1]])-(elementList[userArray[i-1]]);
			}
	    }
	    // Otherwise, it's an element.
	    else {
	    	total += elementList[userArray[i]];
	    }
	    i++;
	}
	var atWeight = (total + subTotal);
	atWeight = atWeight.toFixed(5);
	document.getElementById("entered").innerHTML = userIn.replace(/(\d+)/g, '<sub>$1</sub>');
	document.getElementById("weight").innerHTML = atWeight + " grams";
	if(isNaN(atWeight)){
		document.getElementById("weight").innerHTML = "Error when calculating. Please refine the formula.";
	}
}

