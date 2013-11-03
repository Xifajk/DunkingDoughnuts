#pragma strict

var maxValue : float = 1.0f;
var minValue : float = 0.0f;

var barWidth : int = 200;

var aimButtonClicked: boolean = false;
var powerButtonClicked: boolean = false;

var currentAimValue : float = 0.0f;
var aimSliderMove : boolean = true;

var currentPowerValue : float = 0.0f;
var powerSliderMove : boolean = true;

function Start () {

}

function Update() {

	if (aimButtonClicked == false){ //if the Aim Button hasn't been clicked, the Aim Slider will continue moving up and down
	
		aimSlider();			   //class the function aimSlider to make the aim slider move up and down
		
	} else {					   //if the Aim Button was clicked, the Slider will stop and will take note of the position of the slider
		print(currentAimValue);
	}
	
	if (powerButtonClicked == false){ //if the Power Button hasn't been clicked, the Power Slider will continue moving up and down
	
		powerSlider();				  //class the function powerSlider to make the power slider move up and down
		
	} else {
		print(currentPowerValue); //if the Power Button was clicked, the Slider will stop and will take note of the position of the slider
	}
}

function OnGUI(){

	GUI.enabled = false; //this is so users cannot click the buttons
	GUI.Button(Rect(1000, 650, barWidth * currentAimValue, 20), "");
	GUI.Button(Rect(800, 600, barWidth * currentPowerValue, 20), "");
	GUI.enabled = true;
	if ((GUI.Button(Rect(850, 640, 100, 50), "AIM")) && Event.current.button == 0){ //if the user clicked on the AIM button
	
		aimButtonClicked = true; //set the variable to true, thus knowing that the button was clicked
		print("The Aim Button has been Clicked"); //debugging purposes
	}
	
	if ((GUI.Button(Rect(850, 580, 100, 50), "POWER")) && Event.current.button ==0){ //if the user clicked on the POWER button
	
		powerButtonClicked = true; //set the variable to true, thus knowing that the button was clicked
		print("The Print Button has been Clicked");	//debugging purposes
	}
}

function aimSlider(){ //this makes the AIM slider move up and down

	if (aimSliderMove){ 
				
				currentAimValue += Time.deltaTime;
	} else {
				currentAimValue -= Time.deltaTime;
		   }
			
	if (currentAimValue < 0.1f){
	
				currentAimValue = 0.2f;
				aimSliderMove = true;
	}
			
	if (currentAimValue > 1.0f) {
				
				currentAimValue = 1.0f;
				aimSliderMove = false;
	}
}

function powerSlider(){ //this makes the POWER slider move up and down

	if (powerSliderMove){
				
				currentPowerValue += Time.deltaTime;
	} else {
				currentPowerValue -= Time.deltaTime;
		   }
			
	if (currentPowerValue < 0.1f){
	
				currentPowerValue = 0.2f;
				powerSliderMove = true;
	}
			
	if (currentPowerValue > 1.0f) {
				
				currentPowerValue = 1.0f;
				powerSliderMove = false;
	}
}
		