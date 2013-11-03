#pragma strict

var maxValue : float = 1.0f;
var minValue : float = 0.0f;

var barWidth : int = 200;

var powerButtonClicked: boolean = false;
var aimButtonClicked: boolean = false;

static var currentPowerValue : float = 0.0f;
var powerSliderMove : boolean = true;

static var currentAimValue : float = 0.0f;
var aimSliderMove : boolean = true;

var ballSlot: Rigidbody;

function Start () {

}

function Update() {
	
	//this condition will check if both buttons have been pressed. If they have been, it will shoot the ball
	
	if ((aimButtonClicked == true) && (powerButtonClicked == true)){ 
	
		hitOrMiss();
			
	} else {
	
		if (aimButtonClicked == false){ //if the Aim Button hasn't been clicked, the Aim Slider will continue moving up and down
	
			aimSlider();				//calls the function aimSlider to make the aim slider move up and down		   
		}			   
	
		if (powerButtonClicked == false){ //if the Power Button hasn't been clicked, the Power Slider will continue moving up and down
	
			powerSlider();				//calls the function powerSlider to make the power slider move up and down
			
		}
	}
}

function OnGUI(){

	GUI.enabled = false; //this is so users cannot click the sliders since they are actually buttons
	GUI.Button(Rect(250, 650, barWidth * currentPowerValue, 50), "");
	GUI.Button(Rect(1000, 650, barWidth * currentAimValue, 50), "");
	GUI.enabled = true;
	
	if ((GUI.Button(Rect(100, 650, 100, 50), "POWER")) && Event.current.button ==0){ //if the user clicked on the POWER button
	
		powerButtonClicked = true; //set the variable to true, thus knowing that the button was clicked and it will stop moving the slider
		print("The Print Button has been Clicked");	//debugging purposes
	}
	
	if ((GUI.Button(Rect(850, 650, 100, 50), "AIM")) && Event.current.button == 0){ //if the user clicked on the AIM button
	
		aimButtonClicked = true; //set the variable to true, thus knowing that the button was clicked and it will stop moving the slider
		print("The Aim Button has been Clicked"); //debugging purposes
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

function hitOrMiss(){

	currentPowerValue = Mathf.Round(currentPowerValue * 10f) / 10f;
	Mathf.Round(currentPowerValue);
	print(currentPowerValue);
	currentAimValue = Mathf.Round(currentAimValue * 10f) / 10f;
	print(currentAimValue);
	
	if ((currentPowerValue >= 0.1) && (currentPowerValue <= 0.3)) { //if the power is too low, the ball won't hit the target

		Instantiate(ballSlot,transform.position,transform.rotation);
		print("Too Low");
	
	} else {
		
		if ((currentPowerValue >= 0.4) && (currentPowerValue <= 0.6)){ //if the power is correct, it MIGHT hit the target depending on the aim
		
			print("HIT");
			
		} else {
		
			if ((currentPowerValue >= 0.7) && (currentPowerValue <= 1.0)){ //if the power is too high, the ball won't hit the target
			
				print("Too Powerful");
			}
		}
	}
	
	if ((currentAimValue >= 0.1) && (currentAimValue <= 0.4)) { //if the aim is off, the ball won't hit the target

		print("To the Left");
	
	} else {
		
		if ((currentAimValue >= 0.5) && (currentAimValue <= 0.6)){ //if the aim is correct, it MIGHT hit the target depending on the power
		
			print("HIT");
			
		} else {
		
			if ((currentAimValue >= 0.7) && (currentAimValue <= 1.0)){ //if the aim is off, the ball won't hit the target
			
				print("To the Right");
			}
		}
	}
}
