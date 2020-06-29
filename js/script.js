//javaScript
//Jquery
$(document).ready(function() {

//Moment
var date = moment("2018-01-01")

//Handelbars
var source = $("#template").html();
var template = Handlebars.compile(source);

// Stampo tutti i giorni del mese
while ((date.date()) < (date.daysInMonth())) {
  console.log("Giorno corrente del mese " + date.date());
  console.log("Numero di giorni del mese " + date.daysInMonth())
  var context = {
    year: date.format("YYYY"),
    month: date.format("MMMM"),
    day: date.format("DD")
    };

  var html = template(context);
  $("#january").append(html)

  date.add(1, "days");
}


});
//end Jquery
