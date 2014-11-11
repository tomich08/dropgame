/**
 * The Drop class is a blueprint for each raindrop we generate
 * @author  John Doe
 * @version 1.0, May 2014
 */
 
 
//make an array to keep track of drops

var drop_array = new Array();
var user_bucket = new Bucket(75,75);
 
function Drop(w,h){
	this.x; //starts empty, will keep track of each drop's left-right position as a #
	this.y; //starts empty, will keep track of each drop's up-down position as a #
	this.width = w;
	this.height = h;
	this.item_on_page; //represents drop's physical presence on the screen
	/** 
	*	The create method creates a DIV that looks like a blue drop on the page
	*/
	this.create = function(){
		//make a div tag in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
		//give it a class which styles it in CSS to resemble a drop
		this.item_on_page.className = "raindrop";
		this.item_on_page.style.width = this.width+"px";
		//store a random x and y position, different for each drop. I'm using screen width of 800, height of 600:
		this.x = Math.floor(Math.random()*800);
		this.y = -50;
		//use those x and y coordinates in the CSS to position the drop:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.body.appendChild(this.item_on_page);
	}
	/** 
	*   The destroy function does lots of cleaning up when a drop is removed from the page
	*/
	this.destroy = function(){
		//clear all splashes by removing all elements with the class "splash".
		for(var j=0;j<document.getElementsByClassName("splash").length; j++){
			document.body.removeChild(document.getElementsByClassName("splash")[j]);
		}
		//generate a copy of our animating GIF as an <img> tag:
		var newsplash = document.createElement("img");
		newsplash.className = "splash";
		//make each path/filename unique so it replays the animatin:
		newsplash.src = "img/splash-anim-gif.gif?" + Math.random();
		//style it and set its position to that of the drop:
		newsplash.style.position = "absolute";
		newsplash.style.left = this.x+"px";
		newsplash.style.top = this.y+"px";
		//place it onto the HTML page
		document.body.appendChild(newsplash);
		//remove the drop object from the array so other functions stop trying to manipulate it.
		var this_drops_index_num = drop_array.indexOf(this);
		//splice a single item out of the array
		drop_array.splice(this_drops_index_num, 1);
		//removes the graphic of the drop from the html page
		document.body.removeChild(this.item_on_page);
		
	}
} //close the Drop class

/**
* The Bucket Class is a blueprint for the user controller catcher
*@ author	John Doe
*@version 1.0	may 2014
*/

var drop_array = new Array();
 
function Bucket(w,h){
	this.x; //starts empty, will keep track of each drop's left-right position as a #
	this.y; //starts empty, will keep track of each drop's up-down position as a #
	this.width = w;
	this.height = h;
	this.item_on_page; //represents buckets physical presence on the screen
	/** 
	*	The create method creates a DIV that looks like a grey drop on the page
	*/
	this.create = function(){
		//make a div tag in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
		//give it a class which styles it in CSS to resemble a drop
		this.item_on_page.className = "bucket";
		this.item_on_page.style.width = this.width+"px";
		this.item_on_page.style.height = this.height+"px";
		this.item_on_page.style.backgroundColor = "rgba(51,53,153,.5)";
		this.item_on_page.style.position = "absolute";
		this.item_on_page.style.zIndex = "5";
		this.item_on_page.style.borderBottomLeftRadius = "25px";
		this.item_on_page.style.borderBottomRightRadius = "25px";
		//store a random x and y position, different for each drop. I'm using screen width of 800, height of 600:
		this.x = 100;
		this.y = 400;
		//use those x and y coordinates in the CSS to position the drop:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.body.appendChild(this.item_on_page);
	}
	/** 
	*   The destroy function does lots of cleaning up when a drop is removed from the page
	*/
	
} //close the Bucket class


 /*this function moves all existing drops downward a little bit*/
 
 function moveAllDrops(){
	 //loop through all the existing drops, apply it to its CSS
	 for(var i=0;i<drop_array.length;i++){
	 //add to the y property of the drop
	 drop_array[i].y += 5;
	 drop_array[i].item_on_page.style.top = drop_array[i].y+'px';
	 //if drop is touching the jar
	 if(collisionCheck(user_bucket,drop_array[i])){
		drop_array[i].destroy();
	 }
	 //if drop is touching floor
	 if(drop_array[i].y > 500){
		 drop_array[i].destroy();
	 }
	 }
 }
 
 /*this function makes a drop every so often*/
 
 function spawn(){
	var anotherDrop = new Drop(50,50);
	anotherDrop.create();
	drop_array.push(anotherDrop); 
 }
 
 
onload=init;

function init() {
	
	setInterval(function(){spawn()}, 1000);

	//make an object that's an instance of the Drop Class:
	/*var drop1 = new Drop();
	drop1.create();
	drop_array.push(drop1);*/
	//make an object that's an instance of the Drop Class:
/*	var drop2 = new Drop();
	drop2.create();
	drop_array.push(drop2);*/
	//start moving the drops a little bit every so often
	setInterval(moveAllDrops, 1000/30);
	//create the Bucket obj in the browsers 'mind'
	user_bucket.create();//put the bucket on the page
	//when a key is pressed execute function checkKey
	document.onkeydown = function(e){
		checkKey();
	}
}

/**
* This function takes various actions depending on which key was pressed
*/

function checkKey(e){
	e = e||window.event;//so all browsers understand what the event is
	//if it was the right arrow that was pressed....
	if(e.keyCode == '39'){
		/*console.log('right arrow');*/
		user_bucket.x += 15;	
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}
	
	//if it was the left arrow that was pressed....
	if(e.keyCode == '37'){
		/*console.log('left arrow');*/	
		user_bucket.x -= 15;	
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}
}//close function checkKey

/**
* this function takes two items that store their own x and y width, height
* and sees if one is colliding with the other
*/

function collisionCheck(big_obj,sm_obj){
	var big_left 	= 	big_obj.x;
	var big_right 	= 	big_obj.x + big_obj.width;
	var big_top 	= 	big_obj.y;
	var big_bottom 	= 	big_obj.y + big_obj.height;
	var sm_left 	= 	sm_obj.x;
	var sm_right 	= 	sm_obj.x + sm_obj.width;
	var sm_top 		= 	sm_obj.y;
	var sm_bottom 	= 	sm_obj.y + sm_obj.height;
	//if the items left and right edges are colliding 
	if((sm_left < big_right)&&(sm_right > big_left)){
		//if the items top and bottom edges are colliding
		if((sm_top > big_top)&&(sm_bottom < big_bottom)){
			return true;//they're touching
		}
	}
	return false;//they're not touching
}//end function collisionCheck









