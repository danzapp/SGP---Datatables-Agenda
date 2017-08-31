function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet() {

  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate(); 
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// *****************  LEGGE I DATI DALLO SHEET E RESTITUISCE UN OBJECT  *************

function readData(){


//var rows = sheet.getLastRow()-2
//// Logger.log(rows);
//var cols = sheet.getLastColumn()+1
//// Logger.log(cols);
//var headers = sheet.getRange(1,1,1,cols).getValues()
//// Logger.log(headers)
//var data = sheet.getRange(4,1,rows,cols).getValues()
//// Logger.log(data)


var data = sheet.getDataRange().getValues()
var headers = data[0]
var dataRawObjectsArray = ObjApp.rangeToObjectsNoCamel(data)

// elimina le prime 2 righe (awesome table)
var dataObjectsArray = dataRawObjectsArray.filter(function(el){
      return el.rowNum >2 && el['Stato Richiesta'] != 'Annullata';
})

var currentUser = Session.getActiveUser().getEmail()
// Logger.log(currentUser)

 
// ---------------------------------------------
// controllo ruolo utente: viewer, editor, owner  
// Logger.log(dataObjectsArray)  
/*
for (var i=0; i<dataObjectsArray.length; i++){
  if(currentUser == dataObjectsArray[i]['email proprietario']){
    dataObjectsArray[i].indexEditor = 1 ; 
  }
  else
  {
    dataObjectsArray[i].indexEditor = 0; 
  }
}
*/

//Logger.log(dataObjectsArray)

// ---------------------------------------------
  
var mainObject = {  // quando completa l'array di Object costruisce l'oggetto Contenitore
      user: currentUser,
      table: dataObjectsArray,
    };

 Logger.log(mainObject);
 // return mainObject  // restituisce il risultato come Object
 return JSON.stringify(mainObject)  // restituisce il risultato come JSON stringify va poi effettuato JSON.parse
}