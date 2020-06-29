//javaScript
//Jquery
$(document).ready(function() {

//Moment
var date = moment("2018-01-01")

//Function addZero
//Se un numero e` inferiore a 10 concatena uno 0 davanti
function addZero (number) {
  if(number < 10) {
    return "0" + number;
  }
}

//Function htmlDays
// Stampo tutti i giorni del mese
function htmlDays(data) {

  //Handelbars
  var source = $("#template").html();
  var template = Handlebars.compile(source);

  // Ciclo tutti i giorni di un mese e li stampo
  var counter = 0;
  while (counter < date.daysInMonth()) {
    //console.log("Giorno corrente del mese " + date.date());
    //console.log("Numero di giorni del mese " + date.daysInMonth())
    //oggetto contenete le chiavi che Hndelbars stampera`
    //Formatto i formati delle date nel modo in cui desidero stamparli
    var dayFormat = date.format("DD");
    var monthFormat = date.format("MMMM");
    //Sommo 1 al totale dei mesi che altrimenti partirebbe da 0
    var monthFormatAttribute = (parseInt(date.format("mm")) + 1);
    //Se il numero che rappresenta i mesi e` inferiore a 0 gli aggiungo uno "0" davanti tramite la funzione addZero
    var monthAttribute = addZero(monthFormatAttribute);
    var yearFormat = date.format("YYYY");
    //Formatto la data da inserire nell'attributo data-list
    var dateAttribute = yearFormat + "-" + monthAttribute + "-" + dayFormat;
    //oggetto contenete le chiavi che Hndelbars stampera`
    //console.log(dateAttribute)
    var context = {
      date: dateAttribute,
      year: yearFormat,
      month: monthFormat,
      day: dayFormat
      };

    //Appendo html compilato con giorno mese e anno al tag ul
    var html = template(context);
    $("#month").append(html)

    date.add(1, "days");
    counter++
  }
}
//end Function htmlDays
//Ajax
$.ajax(
  {
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method: "GET",
    success: function(data, state) {
      htmlDays(date)
      //Variabile che rappresenta tutte le liste presenti nel tag ul con id month
      var listDayMonth = $("ul#month > li[data-list]")
      //Variabile che rappresenta un Array fornitomi dall API con all'interno i giorni di vacanza del mese
      var dataArrayResponse = data.response;
      //Ciclo ArrayResponse per vedere i valori delle chiavi degli oggetti contenuti in ArrayResponse
      //Gli oggetti contenuti in questo Array indicano i giorni di vacanza del mese
      //Le chiavi contenute in ciascun oggetto indicano la data del giorno di vacanza corrente e il tipo di festivita`
      for (var i = 0; i < dataArrayResponse.length; i++) {
        var dataObject = dataArrayResponse[i];
        var dateHoliday = dataObject.date;
        var nameHoliday = dataObject.name;
        //console.log("DATA: " + dateHoliday)
        //Controllo nella lista dei giorni del mese per verificare se ci sono giorni di vacanza ed eventualmente evidenziarli
        listDayMonth.each(function(){
          //console.log(this)
          var listAttribute = $(this).attr("data-list");
          if(listAttribute === dateHoliday) {
            $(this).addClass("red")
            $(this).append("<span>" + nameHoliday + "</span>");
          }
        })
      }

    },
    error: function(request, data, error) {
      alert("Warning: " + error);
    }
  }
);
//end Ajax

});
//end Jquery
