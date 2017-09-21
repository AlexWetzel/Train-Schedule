var config = {
	apiKey: "AIzaSyBSi5gUKnWXOoR1fpB-AxELk8rNb6RoHtE",
    authDomain: "train-schedule-719ca.firebaseapp.com",
    databaseURL: "https://train-schedule-719ca.firebaseio.com",
    projectId: "train-schedule-719ca",
    storageBucket: "train-schedule-719ca.appspot.com",
    messagingSenderId: "420863130757"
  };
firebase.initializeApp(config);

var db = firebase.database();

//Converts a time of day into minutes
function toMinutes(time){
	var start = moment(time, "HH-mm");
	var hours = parseInt(start.format("HH"));
	var minutes = parseInt(start.format("mm"));
	return minutes + (hours * 60);
}

//Converts minutes to hours in military time
function toHours(time){
	
	//Prevents unintended behavior where the time would be greater than 23:59
	if (time >= 1440) {
		time = time % 1440;
	}

	var hours = Math.floor(time/60);
	var minutes = time % 60;

	hours = formatTime(hours);
	minutes = formatTime(minutes);

	return hours + ":" + minutes;
}

//If the hours or minutes are less than 10, adds a zero to the value
function formatTime(num) {
	if(num < 10) {
		num = "0" + num;
	}
	return num;
}

//Orders the database entries in chronological order (by key) and adds them to the web page
db.ref().orderByKey().on("child_added", function(snapshot) {

	var train = snapshot.val();
   
 /* Was trying to be neat here, but my code wouldn't work
 ----------------------------------------
   // var cell = $("<td>");
   
   // var name = train.val().name;
   // var destination = train.val().destination;
   // var period = train.val().period;
   // var nextarrival = train.val().nextarrival;

   // var row = $("<tr>")
   // row.append(cell.text(name));
   // row.append(cell.text(destination));
   // row.append(cell.text(period));
   // row.append(cell.text(nextarrival));
   //  console.log(name);
   // $("table").append(row);
------------------------------------------*/   

	var time = train.departure;
	var period = parseInt(train.period);

	var startMin = toMinutes(time);

	var now = moment();

	var currentMin = toMinutes(now);

	//Accounts for the difference in time between days
	if (currentMin < startMin) {
		currentMin += 1440;
	}

	var diff = currentMin - startMin;	

	var rem = diff % period;
	var nextMin = currentMin + period - rem;
	var timeLeft = nextMin - currentMin;

	var nextTime = toHours(nextMin);

	$("table").append("<tr><td>" + train.name + "</td><td>" + train.destination + "</td><td>" + train.period + "</td><td>" + nextTime + "</td><td>" + timeLeft + "</td></tr>");
}, function(errorObject){

});

//Gets the values from the form and adds them to the database
$("#enter-button").on( "click", function(event) {
	event.preventDefault();

	var nameIn = $("#train-name").val().trim();
	var destIn = $("#destination").val().trim();
	var periodIn = $("#period").val().trim();
	var departureIn = $("#departure").val().trim();

	console.log(nameIn);
	
	db.ref().push({
		name: nameIn,
		destination: destIn,
		period: periodIn,
		departure: departureIn
	});

});







