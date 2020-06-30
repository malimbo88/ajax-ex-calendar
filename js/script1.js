//javaScript1
//jquery
$(document).ready(function(){

//Moment
var january2018 = moment("2018-01-01");

// Function daysInMonth
//Stampa i giorni contenuti in un mese
function daysInMonth (month) {

  //Handelbars
  var source = $("#template").html();
  var template = Handlebars.compile(source);

  //Variabile che rappresenta il mese corrente formattato
  var monthFormat = month.format("MMMM");
  //Variabile che rappresenta anno corrente formattato
  var yearFormat = month.format("YYYY");

  //Creo la ul che conterra i giorni del mese
  $(".container").append('<ul class="' + monthFormat + '"></ul>');
  //Variabile che rappresenta la ul che conterra` i giorni del mese
  var monthList = $("ul." + monthFormat);
  //Creo un titolo che contiene il mese e l'anno
  monthList.append('<h2 data-title="' + month.format("YYYY-MM-DD") + '">' + monthFormat + " " + yearFormat + '</h2>')

  //Faccio un ciclo di tutti i giorni in un mese e li stampo
  var count = 0;
  var daysInAMonth = month.daysInMonth();
  while(count < daysInAMonth) {

    //Formatto la data per poter stampare i risultati html
    //Variabile che rappresenta il giorno corrente formattato
    var dayFormat = month.format("DD");
    //Variabile che rappresenta la data intera corrente formattata
    var monthDateFormat = month.format("YYYY-MM-DD");

    //oggetto contenete le chiavi che Hndelbars stampera`
    var context = {
      date: monthDateFormat,
      month: monthFormat,
      day: dayFormat
      };

    //Compilo html template con le chiavi indicate prima di stamparlo
    var html = template(context);
    //Appendo html compilato con giorno mese e anno al tag ul
    monthList.append(html)
    month.add(1, "days");
    count++
  }
}
//end Function daysInMonth


daysInMonth (january2018)

//Event month switch next
$(document).on("click", ".btn_next", function(){
  var currentDate = $("ul > h2").attr("data-title");
  var momentCurrentDate = moment(currentDate);
  var nextMonth = momentCurrentDate.add(1, "months");
  $(".container > ul").remove()
  daysInMonth (momentCurrentDate)
});
//end Event month switch next

// //Event month switch previous
$(document).on("click", ".btn_previous", function(){
  var currentDate = $("ul > h2").attr("data-title");
  var momentCurrentDate = moment(currentDate);
  var nextMonth = momentCurrentDate.subtract(1, "months");
  $(".container > ul").remove()
  daysInMonth (momentCurrentDate)
});

// //end Event month switch previous


});
//end jquery
