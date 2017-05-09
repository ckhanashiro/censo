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
db = db.getSiblingDB('censo2010')

print ('\nColeções:');
print(db.getCollectionNames());
print ('\n');

var intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta DB e coleções: ' + intervalo)

// Consulta de contagem de registros (ou documentos) de pessoas
dataHoraInicio = new Date();
cursor = db.tPes.find().count()
print ('\nNum registros tPes: ' + cursor)
print (consultaDateTime()+ ': Tempo Registros Pessoa: ' + calculaIntervalo (dataHoraInicio) + '\n')

// Consulta de contagem de registros (ou documentos) de Domicilios
dataHoraInicio = new Date();
cursor = db.tDom.find().count()
print ('Num registros tDom: ' + cursor)
print ('Tempo Registros Domicílios: ' + calculaIntervalo (dataHoraInicio) + '\n')

// Consulta de contagem de registros (ou documentos) de Emigracao
dataHoraInicio = new Date();
cursor = db.tEmi.find().count()
print ('Num registros tEmi: ' + cursor)
print ('Tempo Registros Emigração: ' + calculaIntervalo (dataHoraInicio) + '\n')

// Consulta de contagem de registros (ou documentos) de Mortalidade
dataHoraInicio = new Date();
cursor = db.tMor.find().count()
print ('Num registros tMor: ' + cursor)
print ('Tempo Registros Mortalidade: ' + calculaIntervalo (dataHoraInicio) + '\n')

// Consulta de contagem de registros (ou documentos) Tabela Geral
dataHoraInicio = new Date();
cursor = db.tger.find().count()
print ('Num registros tger: ' + cursor)
print ('Tempo Registros Tabela Geral: ' + calculaIntervalo (dataHoraInicio) + '\n')

// Consulta de contagem de registros (ou documentos) Tabela Geral (IdGeral > 0)
dataHoraInicio = new Date();
cursor = db.tger.find({IdGeral:{$gt:0}}).count()
print ('Num registros tPes (IdGeral > 0): ' + cursor)
print ('Tempo Registros Tabela Geral (IdGeral > 0): ' + calculaIntervalo (dataHoraInicio) + '\n')

// Consulta Distinct V0300 tEmi
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tEmi.aggregate([{$group: {_id: '$V0300'} },{$count:"cont"}])
if (i == 1) {print ('Num Distinct V0300 tEmi: ' + cursor.next().cont)}
print ('Tempo Num Distinct V0300 tEmi: ' + calculaIntervalo (dataHoraInicio))
}

// Consulta Distinct V0300 tMor
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tMor.aggregate([{$group: {_id: '$V0300'} },{$count:"cont"}])
if (i == 1) {print ('\nNum Distinct V0300 tMor: ' + cursor.next().cont)}
print (consultaDateTime() + ': Tempo Num Distinct V0300 tMor: ' + calculaIntervalo (dataHoraInicio))
}

// Consulta Distinct V0300 tDom
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tDom.aggregate([{$match: {V0300:{$gt:0}}},{$group: {_id: '$V0300'} },{$count:"cont"}])
if (i == 1) {print ('\nNum Distinct V0300 tDom: ' + cursor.next().cont)}
print ('Tempo Num Distinct V0300 tDom: ' + calculaIntervalo (dataHoraInicio))
}

// Consulta Distinct V0300 tPes
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tPes.aggregate([{$match: {V0300:{$gt:0}}},{$group: {_id: '$V0300'} },{$count:"cont"}])
if (i == 1) {print ('\nNum Distinct V0300 tPes: ' + cursor.next().cont)}
print (consultaDateTime() + ': Tempo Num Distinct V0300 tPes: ' + calculaIntervalo (dataHoraInicio))
}

/** Verificar - estouro de memória **/
// Consulta count(*) from pessoa where v0300 not in (select v0300 from domicilio)
/*
dataHoraInicio = new Date();
try {
  cursor = db.tPes.find ({
     V0300: {
      $nin:db.tDom.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
     }
  },
  {
     V0300:1
  }
  ).count()
} catch (Err) {
  print ('\nERRO! : ' + consultaDateTime() + Err + '\n')
}
print ('Num tPes Not In tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo tPes Not In tDom: ' + intervalo)
print ('\n')

// count(*) from domicilio where v0300 not in (select v0300 from pessoa)
dataHoraInicio = new Date();
try {
cursor = db.tDom.find ({
   V0300: {
    $nin:db.tPes.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
   }
}
).count()
} catch (Err) {
  print (consultaDateTime() + '\nERRO! : ' + Err + '\n')
}
print ('Num tDom Not In tPes: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo tDom Not In tPes: ' + intervalo)
print ('\n')
/**/

CLOVIS COMEÇA AQUI

// Consulta count(*) from domicilio where v0300 not in (select v0300 from mortalidade)
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
try {
cursor = db.tDom.find ({
   V0300: {
    $nin:db.tMor.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
   }
}
).count()
} catch (Err) {
  print ('\nERRO! : ' + consultaDateTime() + Err + '\n')
}
if (i == 1) {print ('\nNum tDom Not In tMor: ' + cursor)}
print (consultaDateTime() + ': Tempo tDom Not In tMor: ' + calculaIntervalo (dataHoraInicio))
}

// Consulta count(*) from mortalidade where v0300 not in (select v0300 from domicilio)
/*
dataHoraInicio = new Date();
try {
cursor = db.tMor.find ({
   V0300: {
    $nin:db.tDom.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
   }
}
).count()
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
print ('Num tMor Not In tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo tMor Not In tDom: ' + intervalo)
print ('\n')
*/

// Consulta count(*) from domicilio where v0300 not in (select v0300 from emigracao);
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
try {
cursor = db.tDom.find ({
   V0300: {
    $nin:db.tEmi.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
   }
}
).count()
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
if (i == 1) {print ('\nNum tDom Not In tEmi: ' + cursor)}
print (consultaDateTime() + ': Tempo tDom Not In tEmi: ' + calculaIntervalo (dataHoraInicio))
}

// Consulta count(*) from emigracao where v0300 not in (select v0300 from domicilio)
/*
dataHoraInicio = new Date();
try {
cursor = db.tEmi.find ({
   V0300: {
    $nin:db.tDom.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
   }
}
).count()
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
print ('Num tEmi Not In tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo tEmi Not In tDom: ' + intervalo)
print ('\n')

/**/
// Consulta Aggregation - Lockup - Join - Com diskUse
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
try {
cursor = db.tEmi.aggregate(
  [
   { $match: {V0300:{$gt:0}}},
   { $lookup: {
       from: "tDom",
       localField:"V0300",
       foreignField:"V0300",
       as: "tDom"
     }
   },
   { $count: "contador"}
  ],
  {allowDiskUse: true}
)
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
if (i == 1) {print ('\nJoin tEmi e tDom: ' + cursor)}
print (consultaDateTime() + ': Tempo Aggregate (Join - tEmi e tDom com DiskUse): ' + calculaIntervalo (dataHoraInicio))
}

// Consulta Aggregation - Lockup - Join - sem diskUse
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
try {
cursor = db.tEmi.aggregate(
  [
   { $match: {V0300:{$gt:0}}},
   { $lookup: {
       from: "tDom",
       localField:"V0300",
       foreignField:"V0300",
       as: "tDom"
     }
   },
   { $count: "contador"}
  ]
)
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
if (i == 1) {print ('\nJoin tEmi e tDom: ' + cursor)}
print (consultaDateTime() + ': Tempo Aggregate (Join - tEmi e tDom SEM DiskUse): ' + calculaIntervalo (dataHoraInicio))
}

// Consulta Aggregation - Lockup - Join - Contrario - com DiskUse
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
try {
cursor = db.tDom.aggregate(
  [
  { $match: {V0300:{$gt:0}}},
  { $lookup: {
       from: "tEmi",
       localField:"V0300",
       foreignField:"V0300",
       as: "tEmi"
     }
   },
   {$count: "contador"}
  ],
  {allowDiskUse: true}
)
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
if (i == 1) {print ('\nJoin tDom e tEmi: ' + cursor)}
print (consultaDateTime() + ': Tempo Aggregate (Join - tDom e tEmi COM DiskUse): ' + calculaIntervalo (dataHoraInicio))
}

// Consulta Aggregation - Lockup - Join - Contrario - SEM DiskUse
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
try {
cursor = db.tDom.aggregate(
 [
   { $match: {V0300:{$gt:0}}},
   { $lookup: {
       from: "tEmi",
       localField:"V0300",
       foreignField:"V0300",
       as: "tEmi"
     }
   },
   {$count: "contador"}
  ]
)
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
if (i == 1) {print ('\nJoin tDom e tEmi: ' + cursor)}
print (consultaDateTime() + ': Tempo Aggregate (Join - tDom e tEmi SEM DiskUse): ' + calculaIntervalo (dataHoraInicio))
}

// Consulta Aggregation - Lockup - Join - sem diskUse
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
try {
cursor = db.tPes.aggregate(
  [
   { $match: {V0300:{$gt:0}}},
   { $lookup: {
       from: "tDom",
       localField:"V0300",
       foreignField:"V0300",
       as: "tDom"
     }
   },
   {$count: "contador"}
  ]
)
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
if (i == 1) {print ('\nJoin tPes e tDom: ' + cursor)}
print (consultaDateTime() + ': Tempo Aggregate (Join - tPes e tDom SEM DiskUse): ' + calculaIntervalo (dataHoraInicio))
}
/**/


// Consulta População
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tPes.aggregate(
 [
  { $match: {V0010:{$gt:0}}},
  { $group: {
     _id: {$sum: 1},
     Soma: {$sum: "$V0010"}
  }
 }]
)
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo consulta \(População Total\): ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')

// Consulta Domicílios
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tDom.aggregate(
 [
  { $match: {V0010:{$gt:0}}},
  { $group: {
     _id: {$sum: 1},
     Soma: {$sum: "$V0010"}
  }
 }]
)
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo consulta \(Domicílios Total\): ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')

// Consulta V0606
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tPes.aggregate(
 [
  { $match: {V0606:{$gt:0}}},
  { $group: {
       _id: {ano:"$V0606"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
    }
 }]
)
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo consulta Pessoas por V0606: ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')

// Consulta Quantidade de pessoas com V0614 (deficiência 1,2,3)
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tPes.aggregate(
 [{ $match: {V0614:{$in:[1,2,3]}}},
  { $group: {
       _id: {Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
  }
 }]
)
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo consulta quantidade Total pessoas com deficiência (614) 1,2,3: ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')

// Consulta Quantidade de pessoas por V0614 (deficiência)
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tPes.aggregate([
 { $match: {V0614:{$gt:0}}},
 { $group: {
       _id: {Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
    }
 }
])
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo consulta quantidade pessoas por deficiência (614): ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')

// Consulta Quantidade de pessoas por Estado por V0614 (deficiência), apenas 1,2,3 - Com Join Estado
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tPes.aggregate([
 { $match: {V0614:{$in:[1,2,3]}}},
 { $group: {
       _id: {Estado:"$V0001",Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
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
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo consulta quantidade pessoas Por Estado com deficiência (614) 1,2,3 (JOIN Estado): ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')

////////////////// TAB Geral

// Consulta Quantidade de pessoas por V0614 (deficiência)
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tGer.aggregate([
 { $match: {V0614:{$gt:0}}},
 { $group: {
       _id: {Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$P_V0010"}
    }
 }
])
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo (TGER) consulta quantidade pessoas por deficiência (614): ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')

// Consulta Quantidade de pessoas por Estado por V0614 (deficiência), apenas 1,2,3 - Com Join Estado
for (i = 1; i < 4; i++) {
dataHoraInicio = new Date();
cursor = db.tGer.aggregate([
 { $match: { $and: [{P_V0001:{$gt:0}},{V0614:{$in:[1,2,3]}}]}},
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
if (i == 1) {
 print ('\n')
 while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
 }
}
print ('\nTempo (TGER) consulta quantidade pessoas Por Estado com deficiência (614) 1,2,3 (JOIN Estado): ' + calculaIntervalo (dataHoraInicio))
}
print ('\n\n')
