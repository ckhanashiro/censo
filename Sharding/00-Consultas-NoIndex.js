load('auxJS.js')

var dataHoraInicio = consultaDateTime();
print ('\nInício da execução: ' + dataHoraInicio)

dataHoraInicio = new Date();

print ('\nDatabases:')
db0 = db.adminCommand('listDatabases')
printjsononeline (db0)
print ('\n')

for(var i=0; i < db0["databases"].length; ++i) {
   print ('DB '+(i+1)+': '+db0["databases"][i]["name"])
}

// Muda para DB censo2010
db = db.getSiblingDB('censo2010-srd')

print ('\nColeções:');
print(db.getCollectionNames());
//print ('\n');

var intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta DB e coleções: ' + intervalo)

// Consulta de contagem de registros (ou documentos) de pessoas
dataHoraInicio = new Date();
cursor = db.teste01.find().count()
print ('Num registros tPes: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime()+ ': Tempo Registros teste01: ' + intervalo)
print ('\n')

// Consulta Distinct V0300 tEmi
dataHoraInicio = new Date();
cursor = db.teste01.aggregate([{$group: {_id: '$campo1'} },{$count:"cont"}])
print ('Num Distinct V0300 tEmi: ' + cursor.next().cont)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Num Distinct campo1 teste01: ' + intervalo)
print ('\n')

// Consulta Distinct V0300 tMor
/** Verificar - estouro de memória **/
// Consulta count(*) from pessoa where v0300 not in (select v0300 from domicilio)
dataHoraInicio = new Date();
try {
  cursor = db.teste01.find ({
     _id: {
      $nin:db.uf.find ({}, {_id:1}).toArray().map(function(u){return u._id})
     }
  },
  {
     _id:1
  }
  ).count()
} catch (Err) {
  print ('\nERRO! : ' + consultaDateTime() + Err)
}
print ('\nNum tPes Not In tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo tPes Not In tDom: ' + intervalo)
print ('\n')


// Consulta População
dataHoraInicio = new Date();
cursor = db.teste01.aggregate(
 [{ $group: {
     _id: {$sum: 1},
     Soma: {$sum: "$_id"}
  }
 }]
)
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta \(População Total\): ' + intervalo + '\n\n')
