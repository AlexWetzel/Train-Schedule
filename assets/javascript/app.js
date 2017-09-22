var config = {
	apiKey: "AIzaSyBSi5gUKnWXOoR1fpB-AxELk8rNb6RoHtE",
    authDomain: "train-schedule-719ca.firebaseapp.com",
    databaseURL: "https://train-schedule-719ca.firebaseio.com",
    projectId: "train-schedule-719ca",
    storageBucket: "train-schedule-719ca.appspot.com",
    messagingSenderId: "420863130757"
  };
firebase.initializeApp(config);

var now = moment();

var db = firebase.database();

//If the time entered is after the current time, a day is subtracted
function checkTime(time) {
	var minutes = moment(now, "HH-mm").diff(time, "minutes");

	if (minutes < 0) {
      time = moment(time).subtract(1, "days");
      minutes = moment(now, "HH-mm").diff(time, "minutes");
    }
    return time;
}

//Orders the database entries in chronological order (by key) and adds them to the web page
db.ref().orderByKey().on("child_added", function(snapshot) {

	var train = snapshot.val();

	var period = parseInt(train.period);
	var time = train.departure;
	var time = moment(time, "HH-mm--MM-DD-YYYY")

	
	var minutes = moment(now, "HH-mm").diff(time, "minutes");
	//The next arrival time is calculated by getting the remainder of the difference divided by the period
	var remainder = minutes % period;
	//subtracting the remainder from the period gives us the time until the next arrival
    var timeLeft = period - remainder;    
    nextTime = moment().add(timeLeft, "minutes").format("hh:mm a");
	
	$("table").append("<tr><td>" + train.name + "</td><td>" + train.destination + "</td><td>" + train.period + "</td><td>" + nextTime + "</td><td>" + timeLeft + "</td></tr>");
}, function(errorObject){
	console.log("something went wrong");
});

//Gets the values from the form and adds them to the database
$("#enter-button").on( "click", function(event) {
	event.preventDefault();

	var nameIn = $("#train-name").val().trim();
	var destIn = $("#destination").val().trim();
	var periodIn = $("#period").val().trim();
	var departureIn = $("#departure").val().trim();


	var parsedTime = moment(departureIn, "HH-mm");
	var checkedTime = checkTime(parsedTime);

	//the date is added to the database, as the calculations take it into account
	departureIn = moment(checkedTime).format("HH:mm, MM/DD/YYYY")
	
	db.ref().push({
		name: nameIn,
		destination: destIn,
		period: periodIn,
		departure: departureIn,
	});
});







