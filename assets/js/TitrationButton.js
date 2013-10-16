function log10(value){
	var output = -(Math.log(value)/2.302585093);
	return output;
}

function showEquiv(pH){
	if(document.getElementById('neutral').checked){
		document.getElementById('showPH').value = "pH = " + pH;
	}
	else{
		document.getElementById('showPH').value = "pH = " + pH + ". This is the equivalence point!";
	}
}

function showMid(pH){
	if(document.getElementById('mid').checked){
		document.getElementById('showPH').value = "pH = " + pH;
	}
	else{
		document.getElementById('showPH').value = "pH = " + pH + ". This is the midpoint!";
	}
}

function Button(){
//ph Start
	function aPreReq(){	
		molH = aTopCon*(aTopVol/1000);
		molOH = bBotCon*(bBotVol/1000);
		volTot = (parseFloat(aTopVol) + (parseFloat(bBotVol)))/1000;

	}
	function bPreReq(){
		molOH = bTopCon*(bTopVol/1000);
		molH = aBotCon*(aBotVol/1000);
		volTot = (parseFloat(bTopVol) + (parseFloat(aBotVol)))/1000;
	}
	function innerPreReq(){
		molMax = Math.max(molH, molOH);
		molMin = Math.min(molH, molOH);
		molTot = molMax-molMin;
		MTot = molTot/volTot;
		molSalt = molMin;
		MSalt = molMin/volTot;
	}

	function aInput(){
		aBotVol = document.getElementById("aBotVol").value;
		aBotCon = document.getElementById("aBotCon").value;
		if(cId == "two"){
			aBotCon *= 2;
		}
		if(cId == "three"){
			aBotCon *= 3;
		}		
		newMol = (((aBotVol/1000)*aBotCon) || ((bTopVol/1000)*bTopCon));
		phInput = document.getElementById('desPH').value;
		document.getElementById('showVolCon').value = "";

/////////////////////////////////

		if(phInput != ""){
			hCon = Math.pow(10, -(phInput));
			if(bTopVol == ""){
				xMolar = parseFloat(bTopCon);
				v = "topBaseVol";
			}
			else if(aBotVol == ""){
				xMolar = parseFloat(aBotCon);
				v = "botAcidVol";
			}
			else if(bTopCon == ""){
				xMolar = parseFloat(bTopVol/1000);
				v = "topBaseCon";
			}
			else if(aBotCon == ""){
				xMolar = parseFloat(aBotVol/1000);
				v = "botAcidCon";
			}
			sideOne = (hCon + xMolar);
			sideTwo = (newMol-(hCon*((aBotVol/1000) || (bTopVol/1000))));

			if(bTopCon == "" || aBotCon == ""){
				volume = ((bTopVol/1000) + (aBotVol/1000));
			}			
			if(aBotVol == ""){
				sideOne = xMolar - hCon;
				sideTwo = (newMol+(hCon*((aBotVol/1000) || (bTopVol/1000))));				
			}
			if(bTopVol == "" || aBotVol == ""){
				newVol = (sideTwo/sideOne)*1000;
				volume = newVol + parseFloat((bTopVol || aBotVol));	
			}
			else if(bTopCon == ""){
				newVol = newMol-(hCon*volume);
				newVol /= (bTopVol/1000);
				// newVol is x (in moles)
			}
			else if(aBotCon == ""){
				newVol = newMol+(hCon*volume);
				newVol /= (aBotVol/1000);
			}
			phInput = parseFloat(phInput);
			if((bTopCon != "" && phInput > 7.0000) || phInput >= 7.0000){
				twoPOH = 14-phInput;
				ohCon = Math.pow(10, -(twoPOH));
				ohMol = (ohCon*volume);
				if(bTopVol == "" || bTopCon == ""){
					addVol = (ohMol/(bTopCon || bTopVol/1000));
					if(phInput > 7.000){
						newVol += addVol;					
					}
					else if(phInput < 7.000){
						newVol -= addVol;				
					}	
					else if(phInput == 7){
						newVol = newMol/((bTopVol || bTopCon)/1000);
					}				
				}
				else if(aBotVol == "" || aBotCon == ""){
					addVol = (ohMol/(aBotCon || aBotVol/1000));
					if(phInput > 7.000){
						newVol -= addVol;
					}
					else if(phInput < 7.000){
						newVol += addVol;
					}
					else if(phInput == 7){
						newVol = newMol/((aBotVol || aBotCon)/1000);
					}						
				}
			}
			if(bTopVol == ""){
				bTopVol = newVol;
			}
			else if(aBotVol == ""){
				aBotVol = newVol;
			}
			else if(bTopCon == ""){
				bTopCon = newVol;
			}
			else if(aBotCon == ""){
				aBotCon = newVol;
			}			
			if(newVol < 0){
				document.getElementById('showVolCon').value = "Error!";
			}
			else if(v == "topBaseVol"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(4) + " mL " + b.options[b.selectedIndex].text;
			}
			else if(v == "botAcidVol"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(4) + " mL " + c.options[c.selectedIndex].text;
			}
			else if(v == "topBaseCon"){
				document.getElementById('showVolCon').value = "Concentration = " + newVol.toFixed(7) + " M " + b.options[b.selectedIndex].text;
			}
			else if(v == "botAcidCon"){
				document.getElementById('showVolCon').value = "Concentration = " + newVol.toFixed(7) + " M " + c.options[c.selectedIndex].text;
			}			
		}

///////////////////////////////

		else if((bTopVol == "" || aBotVol == "") && (document.getElementById('mid').checked || document.getElementById('neutral').checked)){
			if(document.getElementById('mid').checked){
				newMol = newMol/2;
			}
			if(bTopVol == ""){
				v = "topBase";
				newVol = (newMol/bTopCon);
				newVol *= 1000;
				bTopVol = newVol;
			}
			else if(aBotVol == ""){
				v = "botAcid";
				newVol = (newMol/aBotCon);
				newVol *= 1000;
				aBotVol = newVol;
			}
			if(v == "topBase"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(4) + " mL " + b.options[b.selectedIndex].text;
			}
			else if(v == "botAcid"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(4) + " mL " + c.options[c.selectedIndex].text;
			}
		}

////////////////////////////////

		else if((bTopCon == "" || aBotCon == "") && (document.getElementById('mid').checked || document.getElementById('neutral').checked)){
			if(document.getElementById('mid').checked){
				newMol = newMol/2;
			}
			if(bTopCon == ""){
				v = "topBase";				
				newCon = newMol/(bTopVol/1000);
				bTopCon = newCon;					
				if(bId == "two"){
					newCon /= 2;
				}
				if(bId == "three"){
					newCon /= 3;
				}					
			}
			else if(aBotCon == ""){
				v = "botAcid";
				newCon = newMol/(aBotVol/1000);
				aBotCon = newCon;
				if(cId == "two"){
					newCon /= 2;
				}
				if(cId == "three"){
					newCon /= 3;
				}
			}
			if(v == "topBase"){
				document.getElementById('showVolCon').value = "Volume = " + newCon.toFixed(4) + " M " + b.options[b.selectedIndex].text;
			}
			else if(v == "botAcid"){
				document.getElementById('showVolCon').value = "Volume = " + newCon.toFixed(4) + " M " + c.options[c.selectedIndex].text;
			}
		}
	}

	function bInput(){
		bBotVol = document.getElementById("bBotVol").value;
		bBotCon = document.getElementById("bBotCon").value;
		if(dId == "two"){
			bBotCon *= 2;
		}		
		if(dId == "three"){
			bBotCon *= 3;
		}		
		newMol = (((bBotVol/1000)*bBotCon) || ((aTopVol/1000)*aTopCon));
		phInput = document.getElementById('desPH').value;
		document.getElementById('showVolCon').value = "";

//////////////////////////////

		if(phInput != ""){
			hCon = Math.pow(10, -(phInput));
			if(aTopVol == ""){
				xMolar = parseFloat(aTopCon);
				v = "topAcidVol";
			}
			else if(bBotVol == ""){
				xMolar = parseFloat(bBotCon);
				v = "botBaseVol";
			}
			else if(aTopCon == ""){
				xMolar = parseFloat(aTopVol/1000);
				v = "topAcidCon";
			}
			else if(bBotCon == ""){
				xMolar = parseFloat(bBotVol/1000);
				v = "botBaseCon";
			}
			sideOne = (hCon + xMolar);
			sideTwo = (newMol-(hCon*((bBotVol/1000) || (aTopVol/1000))));

			if(aTopCon == "" || bBotCon == ""){
				volume = ((aTopVol/1000) + (bBotVol/1000));
			}				
			if(aTopVol == ""){
				sideOne = xMolar - hCon;
				sideTwo = (newMol+(hCon*((aTopVol/1000) || (bBotVol/1000))));				
			}
			if(aTopVol == "" || bBotVol == ""){
				newVol = (sideTwo/sideOne)*1000;
				volume = newVol + parseFloat((aTopVol || bBotVol));	
			}
			else if(bBotCon == ""){
				newVol = newMol-(hCon*volume);
				newVol /= (bBotVol/1000);
				// newVol is x (in moles)
			}
			else if(aTopCon == ""){
				newVol = newMol+(hCon*volume);
				newVol /= (aTopVol/1000);
			}
			phInput = parseFloat(phInput);
			if((bBotCon != "" && phInput > 7.0000) || phInput >= 7.0000){
				twoPOH = 14-phInput;
				ohCon = Math.pow(10, -(twoPOH));
				ohMol = (ohCon*volume);
				if(bBotVol == "" || bBotCon == ""){
					addVol = (ohMol/(bBotCon || bBotVol/1000));
					if(phInput > 7.000){
						newVol += addVol;					
					}
					else if(phInput < 7.000){
						newVol -= addVol;				
					}	
					else if(phInput == 7){
						newVol = newMol/((bBotVol || bBotCon)/1000);
					}				
				}
				else if(aTopVol == "" || aTopCon == ""){
					addVol = (ohMol/(aTopCon || aTopVol/1000));
					if(phInput > 7.000){
						newVol -= addVol;
					}
					else if(phInput < 7.000){
						newVol += addVol;
					}
					else if(phInput == 7){
						newVol = newMol/((aTopVol || aTopCon)/1000);
					}						
				}
			}			
			if(bBotVol == ""){
				bBotVol = newVol;
			}
			else if(aTopVol == ""){
				aTopVol = newVol;
			}
			else if(aTopCon == ""){
				aTopCon = newVol;
			}
			else if(bBotCon == ""){
				bBotCon = newVol;
			}				
			if(newVol < 0){
				document.getElementById('showVolCon').value = "Error!";
			}
			else if(v == "topAcidVol"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(2) + " mL " + a.options[a.selectedIndex].text;
			}
			else if(v == "botBaseVol"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(2) + " mL " + d.options[d.selectedIndex].text;
			}
			else if(v == "topAcidCon"){
				document.getElementById('showVolCon').value = "Concentration = " + newVol.toFixed(7) + " M " + a.options[a.selectedIndex].text;
			}
			else if(v == "botBaseCon"){
				document.getElementById('showVolCon').value = "Concentration = " + newVol.toFixed(7) + " M " + d.options[d.selectedIndex].text;
			}			
		}

////////////////////////////////////////////////

		else if((aTopVol == "" || bBotVol == "") && (document.getElementById('mid').checked || document.getElementById('neutral').checked)){
			if(document.getElementById('mid').checked){
				newMol = newMol/2;
			}
			if(aTopVol == ""){
				v = "topAcid";
				newVol = (newMol/aTopCon);
				newVol *= 1000;
				aTopVol = newVol;			
			}
			else if(bBotVol == ""){
				v = "botBase";
				newVol = (newMol/bBotCon);
				newVol *= 1000;
				bBotVol = newVol;
			}
			if(v == "topAcid"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(4) + " mL " + a.options[a.selectedIndex].text;
			}
			else if(v == "botBase"){
				document.getElementById('showVolCon').value = "Volume = " + newVol.toFixed(4) + " mL " + d.options[d.selectedIndex].text;
			}
		}

//////////////////////////////////////////

		else if((aTopCon == "" || bBotCon == "") && (document.getElementById('mid').checked || document.getElementById('neutral').checked)){
			newMol = (((aTopVol/1000)*aTopCon) || ((bBotVol/1000)*bBotCon));
			if(document.getElementById('mid').checked){
				newMol = newMol/2;
			}
			if(aTopCon == ""){
				v = "topAcid";				
				newCon = (newMol/(aTopVol/1000));
				aTopCon = newCon;
				if(aId == "two"){
					newCon /= 2;
				}
				if(aId == "three"){
					newCon /= 3;
				}
			}
			else if(bBotCon == ""){
				v = "botBase";				
				newCon = (newMol/(bBotVol/1000)) ;
				bBotCon = newCon;
				if(dId == "two"){
					newCon /= 2;
				}		
				if(dId == "three"){
					newCon /= 3;
				}			
			}
			if(v == "topAcid"){
				document.getElementById('showVolCon').value = "Volume = " + newCon.toFixed(4) + " M " + a.options[a.selectedIndex].text;
			}
			else if(v == "botBase"){
				document.getElementById('showVolCon').value = "Volume = " + newCon.toFixed(4) + " M " + d.options[d.selectedIndex].text;
			}
		}	
	}

	function strAcidStrBase(){
		if(document.getElementById("acid").checked){
			aPreReq();
			SaSbGetPH();
		}

		else if(document.getElementById("base").checked){
			bPreReq();
			SaSbGetPH();
		}	

		function SaSbGetPH(){
			innerPreReq();
			if((molOH.toFixed(8)) == (molH.toFixed(8))){
				pH = 7;
				showEquiv(pH);
			}
			
			else if(molMax == molOH){
				pOH = log10(MTot);
				pH = 14-pOH;
				pH = pH.toFixed(2);
				if(molH == molOH/2){
					showMid(pH);
				}
				else{
					document.getElementById('showPH').value = "pH = " + pH;
				}
			}

			else if(molMax == molH){
				pH = log10(MTot);
				pH = pH.toFixed(2);
				if(molOH == molH/2){
					showMid(pH);
				}
				else{
					document.getElementById('showPH').value = "pH = " + pH;
				}
			}
		}
	}

	function strAcidWeakBase(){
		if(document.getElementById("acid").checked){
			aPreReq();
			SaWbGetPH();
		}
		else if(document.getElementById("base").checked){
			bPreReq();
			SaWbGetPH();
		}	

		function SaWbGetPH(){
			innerPreReq();
			if(aTopVol == 0 || aBotVol == 0){
				x = (bVal || dVal)*(bBotCon || bTopCon);
				x = Math.sqrt(x);
				pOH = log10(x);
				var pH = 14-pOH;
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}

			else if(bBotVol == 0 || bTopVol == 0){
				x = (aTopCon || aBotCon);
				var pH = log10(x);
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}

			else if(molOH == molH){
				Ka = .00000000000001/(bVal || dVal);
				x = Ka*MSalt;
				x = Math.sqrt(x);
				pH = log10(x);
				pH = pH.toFixed(2);
				showEquiv(pH);
			}

			else if(molH == molOH/2){
				pOH = log10(bVal || dVal);
				var pH = 14-pOH;
				pH = pH.toFixed(2);
				showMid(pH);
			}

			else if(molMax == molOH){
				pOH = log10(bVal || dVal);
				pOH += -log10(MSalt/MTot);
				pH = 14-pOH;
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}

			else if(molMax == molH){
				pH = log10(MTot);
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}	
		}
	}

	function weakAcidStrBase(){
		if(document.getElementById("acid").checked){
			aPreReq();
			WaSbGetPH();
		}
		else if(document.getElementById("base").checked){
			bPreReq();
			WaSbGetPH();
		}	

		function WaSbGetPH(){
			innerPreReq();
			if(aTopVol == 0 || aBotVol == 0){
				pOH = log10(bBotCon || bTopCon);
				pH = 14-pOH;
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}

			else if(bBotVol == 0 || bTopVol == 0){
				x = (aVal || cVal)*(aTopCon || aBotCon);
				x = Math.sqrt(x);
				pH = log10(x);
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}

			else if(molOH == molH){
				Kb = .00000000000001/((aVal || cVal));
				x = Kb*MSalt;
				x = Math.sqrt(x);
				pOH = log10(x);
				pH = 14-pOH;
				pH = pH.toFixed(2);
				showEquiv(pH);
			}

			else if(molOH == molH/2){
				pH = log10(aVal || cVal);
				pH = pH.toFixed(2);
				showMid(pH);
			}

			else if(molMax == molOH){
				pOH = log10(MTot);
				pH = 14-pOH;
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}

			else if(molMax == molH){
				pH = log10(aVal || cVal);
				pH += -log10(MSalt/MTot);
				pH = pH.toFixed(2);
				document.getElementById('showPH').value = "pH = " + pH;
			}	
		}
	}
	function weakAcidWeakBase(){
		alert("Weak Acid / Weak Base titrations are not supported.");
	}

	var a = document.getElementById("acidList");
	var aVal = a.options[a.selectedIndex].value;
	var aId = a.options[a.selectedIndex].id;
	var b = document.getElementById("baseList");
	var bVal = b.options[b.selectedIndex].value;
	var bId = b.options[b.selectedIndex].id;
	var c = document.getElementById("acidList2");
	var cVal = c.options[c.selectedIndex].value;
	var cId = c.options[c.selectedIndex].id;
	var d = document.getElementById("baseList2");
	var dVal = d.options[d.selectedIndex].value;
	var dId = d.options[d.selectedIndex].id;

	if(document.getElementById("acid").checked){
		// Gets the Volume and Concentration inputs in the "acid" row.
		aTopVol = document.getElementById("aTopVol").value;
		aTopCon = document.getElementById("aTopCon").value;
		if(aId == "two"){
			aTopCon *= 2;
		}
		if(aId == "three"){
			aTopCon *= 3;
		}
		if(aVal > 1 && document.getElementById("base2").checked && dVal > 1){
			bInput();
			strAcidStrBase();
		}	
		else if(aVal > 1 && document.getElementById("base2").checked && dVal < 1){
			bInput();
			strAcidWeakBase();
		}
		else if(aVal < 1 && document.getElementById("base2").checked && dVal > 1){
			bInput();
			weakAcidStrBase();
		}

		else if(aVal < 1 && document.getElementById("base2").checked && dVal < 1){
			bInput();
			weakAcidWeakBase();
		}
	}

	else if(document.getElementById("base").checked){
		// Gets the Volume and Concentration inputs in the "base" row.
		bTopVol = document.getElementById("bTopVol").value;
		bTopCon = document.getElementById("bTopCon").value;
		if(bId == "two"){
			bTopCon *= 2;
		}
		if(bId == "three"){
			bTopCon *= 3;
		}		
		if(bVal > 1 && document.getElementById("acid2").checked && cVal > 1){
			aInput();
			strAcidStrBase();
		}	
		else if(bVal > 1 && document.getElementById("acid2").checked && cVal < 1){
			aInput();
			weakAcidStrBase();
		}
		else if(bVal < 1 && document.getElementById("acid2").checked && cVal > 1){
			aInput();
			strAcidWeakBase();
		}
		else if(bVal < 1 && document.getElementById("acid2").checked && cVal < 1){
			aInput();
			weakAcidWeakBase();
		}
	}
//pH End	
}