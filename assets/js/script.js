// add today's date to header
var updateDate = function() {
    $("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));
}

// declare array to store hour objects
var plannerArr = [];

// load plannerArr from local storage
var savedPlannerArr = window.localStorage.getItem("plannerArr");

// if there is no plannerArr to load from localStorage, create one
if (!savedPlannerArr) {
    // create object for each business hour and push into planner array
    for (var hour = 9; hour <= 17; hour++) {
        hourObj = {
            hour: moment().set({
                "hour": hour,
                "minute": "0",
                "second": "0",
                "millisecond": "0"
            }).format("hA"),
            plan: ""
        };
        plannerArr.push(hourObj);
    }
} else {
    plannerArr = JSON.parse(savedPlannerArr);
}

// loop through plannerArr and create bootstrap row & columns for each object
for (var i = 0; i < plannerArr.length; i++) {
    // create column for time
    var timeColEl = $("<div>")
        .addClass("col-2 col-lg-1 hour")
        .text(plannerArr[i].hour);
    // create column for textarea
    var textColEl = $("<textarea>")
        .addClass("col-8 col-md-9 col-lg-10")
        .attr("data-planner-index", i)
        .val(plannerArr[i].plan);
    // create column for save button
    var saveColEl = $("<button>")
        .addClass("col-2 col-md-1 btn saveBtn")
        .attr("data-planner-index", i)
        .html("<i class='fas fa-save'></i>");
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
var colorCode = function () {
    // get current hour (instead of exact time) as moment.js object
    var currentHour = moment()
        .set({
            "minute": "0",
            "second": "0",
            "millisecond": "0"
        });

    // color code each textarea based on current time    
    $(".time-block").each(function () {
        // remove previously set color coding classes
        $(this).children("textarea").removeClass("past present future")

        // get each time block's displayed time and convert to moment.js object
        var timeColElText = $(this).children(".hour").text();
        var blockTime = moment(timeColElText, "hA");

        // compare each time block to current hour and add appropriate class
        if (blockTime.isBefore(currentHour)) {
            $(this).children("textarea").addClass("past");
        } else if (blockTime.isSame(currentHour)) {
            $(this).children("textarea").addClass("present");
        } else {
            $(this).children("textarea").addClass("future");
        }
    });
}

// save user input text to localStorage
var saveText = function () {
    // get index of save button clicked
    var targetedIndex = $(this).attr("data-planner-index");
    // get text from textarea
    var textInput = $("textarea[data-planner-index='" + targetedIndex + "']").val();
    // update plannerArr with text from textarea
    plannerArr[targetedIndex].plan = textInput;
    // replace plannerArr in local storage with updated plannerArr
    window.localStorage.setItem("plannerArr", JSON.stringify(plannerArr));
}

updateDate();

colorCode();

$(".saveBtn").on("click", saveText);