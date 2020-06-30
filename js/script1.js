//javaScript1
//jquery
$(document).ready(function(){

//Moment
var january2018 = moment("2018-01-01");
var mia = moment("1989-11-01")
console.log(mia)
holidaysInMonth(january2018)
daysInMonth (january2018)

//Function holidaysInMonth
function holidaysInMonth (month) {
  //Chiamata Ajax
  //Chiamo Api per conoscere festivita` 2018
  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays",
      method: "GET",
      data: {
        year: month.year(),
        month: month.month()
      },
      success: function(data, state) {
        //Variabile che rappresenta un Array fornitomi dall API con all'interno i giorni di vacanza del mese
        var arrayHolidays = data.response;
        //Variabile che rappresenta il valore dell'attributo data-list di ogni lista contenuta in ul
        var listAttribute = $("container > ul > li").attr("data-list");
        //Ciclo ArrayHolidays per vedere i valori delle chiavi degli oggetti contenuti in esso
        //Le chiavi contenute in ciascun oggetto indicano la data del giorno di vacanza corrente e il tipo di festivita`
        for (var i = 0; i < arrayHolidays.length; i++) {
          var objectHolidays = arrayHolidays[i];
          var dateHoliday = objectHolidays.date;
          var nameHoliday = objectHolidays.name;
          //Vado a selezionare tutte le liste con attibuto data-list identico a dateHoliday
          //Aggiungo classe red e appendo span con scritto il tipo di festivita`
          $('li[data-list="' + dateHoliday  + '"]').addClass("red").append("<span>" + nameHoliday + "</span>");
        }
      },
      error: function(request, data, error) {
        alert("Warning: " + error);
      }
    }
  );
  //end Chiamata Ajax
}
//end Function holidaysInMonth


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

  //Creo un titolo che contiene il mese e l'anno
  $(".container").append('<h2 data-title="' + month.format("YYYY-MM-DD") + '">' + monthFormat + " " + yearFormat + '</h2>')
  //Creo la ul che conterra i giorni del mese
  $(".container").append('<ul class="' + monthFormat + '"></ul>');
  //Variabile che rappresenta la ul che conterra` i giorni del mese
  var monthList = $("ul." + monthFormat);

  //Faccio un ciclo di tutti i giorni in un mese e li stampo
  var count = 0;
  var daysInAMonth = month.daysInMonth();
  while(count < daysInAMonth) {

    //Formatto la data per poter stampare i risultati html
    //Variabile che rappresenta il giorno corrente formattato in numero con 0 davanti
    var dayFormat = month.format("DD");
    //Variabile che rappresenta il giorno corrente formattato in parola
    var dayWordFormat = month.format("dddd")

    //Se e` domenica aggiungo classe red altrimenti nessuna classe
    //Passo la classe red attraverso oggetto Monday
    if (dayWordFormat === "Sunday") {
      dayWordFormat = "red";
    }else {
      dayWordFormat = "";
    }

    //Variabile che rappresenta la data intera corrente formattata
    var monthDateFormat = month.format("YYYY-MM-DD");

    //oggetto contenete le chiavi che Hndelbars stampera`
    var context = {
      date: monthDateFormat,
      month: monthFormat,
      day: dayFormat,
      monday: dayWordFormat
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

//Event month switch next
$(document).on("click", ".btn_next", function(){
  //Variabile che indica il valore di attributo data-title
  var currentDate = $(".container > h2").attr("data-title");
  //Trasformo currentDate in un oggetto Moment
  var momentCurrentDate = moment(currentDate);
  //Aggiungo un mese ad ogni click
  var nextMonth = momentCurrentDate.add(1, "months");
  //Se l'anno corrisponde al 2018 stampo il mese richiesto altrimenti "error"
  if (nextMonth.year() === 2018) {
    $(".container > ul").remove()
    $(".container > h2").remove()
    holidaysInMonth(momentCurrentDate)
    daysInMonth (momentCurrentDate)
  }else {
    alert("Errore")
  }
});
//end Event month switch next

// //Event month switch previous
$(document).on("click", ".btn_previous", function(){
  //Variabile che indica il valore di attributo data-title
  var currentDate = $(".container > h2").attr("data-title");
  //Trasformo currentDate in un oggetto Moment
  var momentCurrentDate = moment(currentDate);
  //Aggiungo un mese ad ogni click
  var nextMonth = momentCurrentDate.subtract(1, "months");
  //Se l'anno corrisponde al 2018 stampo il mese richiesto altrimenti "error"
  if (nextMonth.year() === 2018) {
    $(".container > ul").remove()
    $(".container > h2").remove()
    holidaysInMonth(momentCurrentDate)
    daysInMonth (momentCurrentDate)
  }else {
    alert("Errore")
  }
});
// //end Event month switch previous


});
//end jquery
