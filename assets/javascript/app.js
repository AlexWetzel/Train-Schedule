// to do

// take the user inputs for tain name, destination, period, and next arrival
// store the inputs in a new folder in firebase
// use the current time and the next arrival to calculate when the next train will arrive, and refrech the time every minute.
// use the period to calculate any subsequent arrival times
// store the information for each train in a table, and append information for new trains

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
	var arrivalIn = $("#arrival").val().trim();

	db.ref().push({
		name: nameIn,
		destination: destIn,
		period: periodIn,
		nextarrival: arrivalIn
	});

	console.log(nameIn + ", " + destIn + ", " + periodIn + ", " + arrivalIn);
});



db.ref().orderByKey().on("child_added", function(train) {
   console.log(train.val().name);
});

