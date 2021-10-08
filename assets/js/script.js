// add today's date to header
$("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));

// create array to store hour objects
var plannerArr = [];

// create object for each business hour and push into planner array
for (var hour = 9; hour <= 17; hour++) {
    hourObj = {
        hour: moment().set({
            "hour": hour,
            "minute": "0",
            "second": "0"
        }).format("hA"),
        plan: ""
    };
    plannerArr.push(hourObj);
}

console.log(plannerArr);

// loop through planner array and create time block for each object
for (var i = 0; i < plannerArr.length; i++) {
    // create column for time
    var timeColEl = $("<div>")
        .addClass("col-1 hour")
        .text(plannerArr[i].hour);
    //create column for textarea
    var textColEl = $("<textarea>")
        .addClass("col-text col-10");
    // create column for save button
    var saveColEl = $("<button>")
        .addClass("col-save col-1 btn saveBtn");
    //create row and add all columns to it
    var rowEl = $("<div>")
        .addClass("row time-block")
        .append(timeColEl)
        .append(textColEl)
        .append(saveColEl);
    // add row to page
    $(".container").append(rowEl);
}

// color code time blocks based on current time
var auditTimeBlocks = function() {
    // get current time
    var currentTime = moment();

    $(".time-block").each(function() {
        console.log($(this).children(".hour").text());
        console.log($(this).children("textarea"));
    });
}

auditTimeBlocks();
