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

// Muda para DB censo2010-srd
db = db.getSiblingDB('censo2010-srd')

print ('\nColeções:');
print(db.getCollectionNames());
print ('\n');

var intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta DB e coleções: ' + intervalo)


////////////////// TAB Geral

// Consulta Quantidade de pessoas por V0614 (deficiência)
dataHoraInicio = new Date();
cursor = db.tGer.aggregate([
 { $group: {
       _id: {Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$P_V0010"}
    }
 }
])
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo (TGER) consulta quantidade pessoas por deficiência (614): ' + intervalo + '\n\n')

// Consulta Quantidade de pessoas por Estado por V0614 (deficiência), apenas 1,2,3 - Com Join Estado
dataHoraInicio = new Date();
cursor = db.tGer.aggregate([
 { $match: {V0614:{$in:[1,2,3]}}},
 { $group: {
       _id: {Estado:"$P_V0001",Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$P_V0010"}
    }
 },
 { $lookup: {
     from: "uf",
     localField:"_id.Estado",
     foreignField:"_id",
     as: "Estado"
   }
 }
])
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo (TGER) consulta quantidade pessoas Por Estado com deficiência (614) 1,2,3 (JOIN Estado): ' + intervalo + '\n\n')
