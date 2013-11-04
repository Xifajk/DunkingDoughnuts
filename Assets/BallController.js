#pragma strict

function Start()
{

}

function Update() {
		
}

function lowPower(){

	transform.Translate(0, -0.001, 5 * Time.deltaTime);

}

function highPower(){

	transform.Translate(0, 0.05, 2 * Time.deltaTime);
	
}

function correctPower(){

	transform.Translate(0, 0.02, 2 * Time.deltaTime);
	print("Good Power");
}

function aimLeft()
{

	transform.Translate(-0.1,0, 2 * Time.deltaTime);
}
		
function aimRight()
{

	transform.Translate(0.1, 0, 2 * Time.deltaTime);
}
		
function correctAim()
{
	
	transform.Translate(0, 0.03, 2 * Time.deltaTime);
	print("Good Aim");

}

function OnTriggerEnter(other:Collider)
{
        if(other.gameObject.tag=="target")
        {
              Destroy(this.gameObject);
              Application.LoadLevel(1);
        }
}
        