
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDrzuryY6fId2jyh1KFK1N9JB5jmls43q4",
    authDomain: "sl-gtbootcamp-7-3.firebaseapp.com",
    databaseURL: "https://sl-gtbootcamp-7-3.firebaseio.com",
    projectId: "sl-gtbootcamp-7-3",
    storageBucket: "",
    messagingSenderId: "849799281821"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startDate = "";
var rate = "";

var dateFormat = "MM/DD/YYYY";
var convertedDate = moment(startDate, dateFormat);

// Capture Button Click
$("#add-employee").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#input-name").val().trim();
    role = $("#input-role").val().trim();
    startDate = $("#input-date").val().trim();
    rate = $("#input-rate").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().rate);

// full list of items to the well
$("#employee-list").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
    " </span><span id='role'> " + childSnapshot.val().role +
    " </span><span id='date'> " + childSnapshot.val().date +
    " </span><span id='rate'> " + childSnapshot.val().rate + " </span></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild(dateAdded).limitToLast(3).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(snapshot.val().name);
    console.log(snapshot.val().role);
    console.log(snapshot.val().startDate);
    console.log(snapshot.val().rate);

    console.log(moment().diff(startDate, "months"));


    // Change the HTML to reflect
    $("#list-name").append("<div>" + snapshot.val().name + "</div>");
    $("#list-role").append("<div>" + snapshot.val().role + "</div>");
    $("#list-date").append("<div>" + snapshot.val().startDate + "</div>");
    $("#list-rate").append("<div>" + snapshot.val().rate + "</div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
