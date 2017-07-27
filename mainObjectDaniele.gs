
function readDataDaniele(){

var dataRilevazioni = sheet.getDataRange().getValues()

var sheetFotoSpazi = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1tuWo0RFwlHGsmSSimH9QahtzWdplkgghnTHdNwjjwGc/edit?usp=drive_web').getSheetByName('Foto spazi')
var sheetPlanimetrie = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1tuWo0RFwlHGsmSSimH9QahtzWdplkgghnTHdNwjjwGc/edit?usp=drive_web').getSheetByName('Planimetrie')
var fotoSpazi =  sheetFotoSpazi.getDataRange().getValues()
var planimetrie = sheetPlanimetrie.getDataRange().getValues()


var currentUser = Session.getActiveUser().getEmail()
// Logger.log(currentUser)

// modifica il formato della data di rilevazione
var dataObjectsArray = ObjApp.rangeToObjects(dataRilevazioni) //Object con un Array di Objects
dataObjectsArray.forEach(function(obj) { Utilities.formatDate(new Date(obj['Data Rilevazione']), "CET", "dd/MM/yyyy"); });

var fotoSpaziObjArray = ObjApp.rangeToObjects(fotoSpazi)
var planimetrieObjArray = ObjApp.rangeToObjects(planimetrie)


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
 return mainObject  // il risultato viene restituito come Object e non come JSON stringify 
}


