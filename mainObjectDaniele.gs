
function readData(){

var dataRilevazioni = sheet.getDataRange().getValues()

// rimuove riga 2 e 3
dataRilevazioni.splice(1,2)
Logger.log (dataRilevazioni) 

var sheetFotoSpazi = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1tuWo0RFwlHGsmSSimH9QahtzWdplkgghnTHdNwjjwGc/edit?usp=drive_web').getSheetByName('Foto spazi')
var sheetPlanimetrie = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1tuWo0RFwlHGsmSSimH9QahtzWdplkgghnTHdNwjjwGc/edit?usp=drive_web').getSheetByName('Planimetrie')
var fotoSpazi =  sheetFotoSpazi.getDataRange().getValues()
var planimetrie = sheetPlanimetrie.getDataRange().getValues()


var currentUser = Session.getActiveUser().getEmail()
// Logger.log(currentUser)

// modifica il formato della data di rilevazione
var dataObjectsArray = ObjApp.rangeToObjectsNoCamel(dataRilevazioni) //Object con un Array di Objects
//dataObjectsArray.forEach(function(obj) { Utilities.formatDate(new Date(obj['Data Rilevazione']), "CET", "dd/MM/yyyy"); });

var fotoSpaziObjArray = ObjApp.rangeToObjectsNoCamel(fotoSpazi)
var planimetrieObjArray = ObjApp.rangeToObjectsNoCamel(planimetrie)


// ---------------------------------------------
// controllo ruolo utente: viewer, editor, owner  

dataObjectsArray.forEach(function(obj){ 

  if(currentUser == obj['email proprietario']){
    obj.indexEditor = 1 ; 
  }
  else
  {
    obj.indexEditor = 0; 
  }
  
  Logger.log(obj.ufficioTerritoriale)
  
  fotoSpaziUT = fotoSpaziObjArray.filter(function (el) {
    Logger.log(el.UT)
    return el.UT == obj.ufficioTerritoriale
  });
  planimetrieUT = planimetrieObjArray.filter(function (el) {
    return el.UT == obj.ufficioTerritoriale
  });
  
  Logger.log(fotoSpaziUT)
  Logger.log(planimetrieUT)
  
})

Logger.log(JSON.stringify(dataObjectsArray))

// ---------------------------------------------
  
var mainObject = {  // quando completa l'array di Object costruisce l'oggetto Contenitore
      user: currentUser,
      table: dataObjectsArray,
    };

 // Logger.log(mainObject);
 // return mainObject  // il risultato viene restituito come Object 
 return JSON.stringify(mainObject) // il risultato viene restituito come JSON e sarà necesario effettuare JSON.parse()
}


