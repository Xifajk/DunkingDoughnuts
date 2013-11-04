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

var ballPrefab: Rigidbody;

private var ballInstance : Rigidbody;
private var ballController : BallController;

function Start () {
	
	StartRound();
	
}

function Update() {
	
	//this condition will check if both buttons have been pressed. If they have been, it will shoot the ball
	
	if (aimButtonClicked && powerButtonClicked){ 
	
		hitOrMiss();
			
	} else {
	
		if (!aimButtonClicked){ //if the Aim Button hasn't been clicked, the Aim Slider will continue moving up and down
	
			aimSlider();				//calls the function aimSlider to make the aim slider move up and down		   
		}			   
	
		if (!powerButtonClicked){ //if the Power Button hasn't been clicked, the Power Slider will continue moving up and down
	
			powerSlider();				//calls the function powerSlider to make the power slider move up and down
			
		}
	}
}

function OnGUI(){

	GUI.enabled = false; //this is so users cannot click the sliders since they are actually buttons
	GUI.Button(Rect(250, 650, barWidth * currentPowerValue, 50), "");
	GUI.Button(Rect(1000, 650, barWidth * currentAimValue, 50), "");
	GUI.enabled = true;
	
	if ((GUI.Button(Rect(100, 650, 100, 50), "POWER")) && Event.current.button == 0){ //if the user clicked on the POWER button
	
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
	currentAimValue = Mathf.Round(currentAimValue * 10f) / 10f;
	
	var mov : float;
	var aim : float;
	
	if (currentPowerValue <= 0.3)
	{
		ballController.lowPower();
		
	} else if (currentPowerValue >= 0.6) {
	
		ballController.highPower();
		
	} else {
	
		ballController.correctPower();		
	}
		
	if (currentAimValue <= 0.4) 
	{
		ballController.aimLeft();
		
	} else if (currentAimValue >= 0.6) 
	{
		ballController.aimRight();
		
	} else {
	
		ballController.correctAim();		
	}
}

function StartRound() {
	
	ballInstance = Instantiate(ballPrefab, Vector3(0, 0, -6.3), Quaternion.identity) as Rigidbody;
	ballController = ballInstance.GetComponent(BallController);
	
}