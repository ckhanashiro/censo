
//printjson (db.adminCommand('listDatabases'))
/*
function consDateTime(){
  var currentdate = new Date(); 
  var localDatetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + ":" 
                + currentdate.getMilliseconds();

  return (localDatetime)
}
*/

load('auxJS.js')

var dataHoraInicio = consultaDateTime();
print ('\nInício da execução: ' + dataHoraInicio)

dataHoraInicio = new Date();
//var dataHoraInicioOK = dataHoraInicio.getTime(dataHoraInicio);

print ('\nDatabases:')
db0 = db.adminCommand('listDatabases')
printjsononeline (db0)

/* Não foi necessário
var json01 = db0["databases"];
var json02 = json01["name"];
print (json01.name)
print (json02)

for(var i=0; i < json01.length; ++i) {
   print ('Coleção '+(i+1)+': '+json01[i]["name"])
}
*/

for(var i=0; i < db0["databases"].length; ++i) {
   print ('Coleção '+(i+1)+': '+db0["databases"][i]["name"])
}

db = db.getSiblingDB('teste03')

print ('\nColeções:');
print(db.getCollectionNames());
print ('\n');

// db = db.adminCommand('listDatabases')
// printjson( db)
/*
var d = new Date();
var n = d.getTime();
print (n)
*/

//print ('Fim: ' + datetime)
//datetime = consultaDateTime();

var intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta DB e coleções: ' + intervalo)

// Consulta de contagem de registros (ou documentos) de pessoas
dataHoraInicio = new Date();
//db.tPes.find().count()
cursor = db.tPes.find().count()
print ('\nNum registros tPes: ' + cursor)
//while ( cursor.hasNext() ) {
//   printjson( cursor.next() );
//}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta 2: ' + intervalo)
print ('\n\n')

// Consulta de listagem de registros (ou documentos) de pessoas
dataHoraInicio = new Date();
//db.tPes.find().count()
// cursor = db.tPes.find({"M0661":2}).limit (100)
cursor = db.tEmi.find().limit(10)
//print ('\nRegistros tEmi: ' + cursor)

while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}

intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta 3: ' + intervalo + '\n\n')


// Consulta População
dataHoraInicio = new Date();
cursor = db.tPes.aggregate(
 [{ $group: {
     _id: {$sum: 1},
     Soma: {$sum: "$V0010"}
  }
 }]
)
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}

intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta 4 \(População\): ' + intervalo + '\n\n')

// Consulta registros e pessoas por ano (Emigração)
dataHoraInicio = new Date();
//db.tPes.find().count()
// cursor = db.tPes.find({"M0661":2}).limit (100)

cursor = db.tEmi.aggregate(
 [{ $group: {
       _id: {ano:"$V0304"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
    }
 }]
)
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta 5 - nasc. dos emigrados: ' + intervalo + '\n\n')

//cursor = db.adminCommand('listDatabases')
/*cursor = db.collection.find();
while ( cursor.hasNext() ) {
   .next() );
}*/
