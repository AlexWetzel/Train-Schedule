// to do

// take the user inputs for tain name, destination, period, and next arrival
// store the inputs in a new folder in firebase
// use the current time and the next arrival to calculate when the next train will arrive, and refrech the time every minute.
// use the period to calculate any subsequent arrival times
// store the information for each train in a table, and append information for new trains
 moment().format();

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

function toMinutes(time){
	var start = moment(time, "HH-mm");
	var hours = parseInt(start.format("HH"));
	var minutes = parseInt(start.format("mm"));
	return minutes + (hours * 60);
}

function toHours(time){
	if (time > 1440) {
		time = time - 1440;
	}

	var hours = Math.floor(time/60);
	var minutes = time % 60;
	return hours + ":" + minutes;
}

// function getNextArrival(time, period){
// 	period = parseInt(period);
// 	var startMin = toMinutes(time);

// 	var now = moment();

// 	var currentMin = toMinutes(now);

// 	if (currentMin < startMin) {
// 		startMin += 1440;
// 	}

// 	var diff = currentMin - startMin;
// 	var rem = diff % period;
// 	var nextMin = currentMin + period - rem

// 	console.log(startMin + " " + currentMin);
// 	console.log(nextMin);
// }

db.ref().orderByKey().on("child_added", function(train) {
   
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
   	var time = train.val().departure;
	var period = parseInt(train.val().period);
	
	var startMin = toMinutes(time);

	var now = moment();

	var currentMin = toMinutes(now);

	if (currentMin < startMin) {
		startMin += 1440;
	}

	var diff = currentMin - startMin;
	var rem = diff % period;
	var nextMin = currentMin + period - rem;
	var timeLeft = nextMin - currentMin;

	console.log(startMin + " " + currentMin);
	console.log(nextMin);

	var nextTime = toHours(nextMin);

	$("table").append("<tr><td>" + train.val().name + "</td><td>" + train.val().destination + "</td><td>" + train.val().period + "</td><td>" + nextTime + "</td><td>" + timeLeft + "</td></tr>")
	
	// getNextArrival(train.val().departure, train.val().period);
	
});

// db.ref().on("value", function(snapshot) {
//       //takes the click count from the database and writes it to the element id "click-value"
//       // $("#click-value").html(snapshot.val().clickCount);
//       //writes the database clickcounter to the web page
//       count = snapshot.val().trainCount;
//     }, function(errorObject) {
//       //error message
//       console.log("The read failed: " + errorObject.code);
//     });

$("#enter-button").on( "click", function(event) {
	event.preventDefault();

	var nameIn = $("#train-name").val().trim();
	var destIn = $("#destination").val().trim();
	var periodIn = $("#period").val().trim();
	var departureIn = $("#departure").val().trim();

	db.ref().push({
		name: nameIn,
		destination: destIn,
		period: periodIn,
		departure: departureIn
	});

});







