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
print ('\n');

var intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta DB e coleções: ' + intervalo)

// Consulta de contagem de registros (ou documentos) de pessoas
dataHoraInicio = new Date();
cursor = db.tPes.find().count()
print ('\nNum registros tPes: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime()+ ': Tempo Registros Pessoa: ' + intervalo)
print ('\n')

// Consulta de contagem de registros (ou documentos) de Domicilios
dataHoraInicio = new Date();
cursor = db.tDom.find().count()
print ('Num registros tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Registros Domicílios: ' + intervalo)
print ('\n')

// Consulta de contagem de registros (ou documentos) de Emigracao
dataHoraInicio = new Date();
cursor = db.tEmi.find().count()
print ('Num registros tEmi: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Registros Emigração: ' + intervalo)
print ('\n')

// Consulta de contagem de registros (ou documentos) de Mortalidade
dataHoraInicio = new Date();
cursor = db.tMor.find().count()
print ('Num registros tMor: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Registros Mortalidade: ' + intervalo)
print ('\n')

// Consulta de contagem de registros (ou documentos) Tabela Geral
dataHoraInicio = new Date();
cursor = db.tger.find().count()
print ('Num registros tger: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Registros Tabela Geral: ' + intervalo)
print ('\n')

// Consulta de contagem de registros (ou documentos) Tabela Geral (IdGeral > 0)
dataHoraInicio = new Date();
cursor = db.tger.find({IdGeral:{$gt:0}}).count()
print ('Num registros tPes (IdGeral > 0): ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Registros Tabela Geral (IdGeral > 0): ' + intervalo)
print ('\n')

// Consulta Distinct V0300 tEmi
dataHoraInicio = new Date();
cursor = db.tEmi.aggregate([{$group: {_id: '$V0300'} },{$count:"cont"}])
print ('Num Distinct V0300 tEmi: ' + cursor.next().cont)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Num Distinct V0300 tEmi: ' + intervalo)
print ('\n')

// Consulta Distinct V0300 tMor
dataHoraInicio = new Date();
cursor = db.tMor.aggregate([{$group: {_id: '$V0300'} },{$count:"cont"}])
print ('Num Distinct V0300 tMor: ' + cursor.next().cont)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Num Distinct V0300 tMor: ' + intervalo)
print ('\n')

// Consulta Distinct V0300 tDom
dataHoraInicio = new Date();
cursor = db.tDom.aggregate([{$group: {_id: '$V0300'} },{$count:"cont"}])
print ('Num Distinct V0300 tDom: ' + cursor.next().cont)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Num Distinct V0300 tDom: ' + intervalo)
print ('\n')

// Consulta Distinct V0300 tPes
dataHoraInicio = new Date();
cursor = db.tPes.aggregate([{$group: {_id: '$V0300'} },{$count:"cont"}])
print ('Num Distinct V0300 tPes: ' + cursor.next().cont)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Num Distinct V0300 tPes: ' + intervalo)
print ('\n')

/** Verificar - estouro de memória **/
// Consulta count(*) from pessoa where v0300 not in (select v0300 from domicilio)
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

// Consulta count(*) from domicilio where v0300 not in (select v0300 from mortalidade)
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
print ('Num tDom Not In tMor: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo tDom Not In tMor: ' + intervalo)
print ('\n')

// Consulta count(*) from mortalidade where v0300 not in (select v0300 from domicilio)
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

// Consulta count(*) from domicilio where v0300 not in (select v0300 from emigracao);
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
print ('Num tDom Not In tEmi: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo tDom Not In tEmi: ' + intervalo)
print ('\n')

// Consulta count(*) from emigracao where v0300 not in (select v0300 from domicilio)
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
dataHoraInicio = new Date();
try {
cursor = db.tEmi.aggregate(
  [{ $lookup: {
       from: "tDom",
       localField:"V0300",
       foreignField:"V0300",
       as: "tDom"
     }
   },
   {$count: "contador"}
  ],
  {allowDiskUse: true}
)
} catch (Err) {
  print ('\nERRO! : ' + Err + '\n')
}
print ('Join tEmi e tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Aggregate (Join - tEmi e tDom com DiskUse): ' + intervalo)
print ('\n')

// Consulta Aggregation - Lockup - Join - sem diskUse
dataHoraInicio = new Date();
try {
cursor = db.tEmi.aggregate(
  [{ $lookup: {
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
print ('Join tEmi e tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Aggregate (Join - tEmi e tDom SEM DiskUse): ' + intervalo)
print ('\n')

// Consulta Aggregation - Lockup - Join - Contrario - com DiskUse
dataHoraInicio = new Date();
try {
cursor = db.tDom.aggregate(
  [{ $lookup: {
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
print ('Join tDom e tEmi: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Aggregate (Join - tDom e tEmi COM DiskUse): ' + intervalo)
print ('\n')

// Consulta Aggregation - Lockup - Join - Contrario - SEM DiskUse
dataHoraInicio = new Date();
try {
cursor = db.tDom.aggregate(
  [{ $lookup: {
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
print ('Join tDom e tEmi: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Aggregate (Join - tDom e tEmi SEM DiskUse): ' + intervalo)
print ('\n')

// Consulta Aggregation - Lockup - Join - sem diskUse
dataHoraInicio = new Date();
try {
cursor = db.tPes.aggregate(
  [{ $lookup: {
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
print ('Join tPes e tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Aggregate (Join - tPes e tDom SEM DiskUse): ' + intervalo)
print ('\n')
/**/


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
print ('Tempo consulta \(População Total\): ' + intervalo + '\n\n')

// Consulta Domicílios
dataHoraInicio = new Date();
cursor = db.tDom.aggregate(
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
print ('Tempo consulta \(Domicílios Total\): ' + intervalo + '\n\n')


// Consulta V0606
dataHoraInicio = new Date();
cursor = db.tPes.aggregate(
 [{ $group: {
       _id: {ano:"$V0606"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
    }
 }]
)
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta Pessoas por V0606: ' + intervalo + '\n\n')

// Consulta Quantidade de pessoas com V0614 (deficiência 1,2,3)
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
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta quantidade Total pessoas com deficiência (614) 1,2,3: ' + intervalo + '\n\n')

// Consulta Quantidade de pessoas por V0614 (deficiência)
dataHoraInicio = new Date();
cursor = db.tPes.aggregate([
 { $group: {
       _id: {Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
    }
 }
])
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta quantidade pessoas por deficiência (614): ' + intervalo + '\n\n')

// Consulta Quantidade de pessoas por Estado por V0614 (deficiência), apenas 1,2,3 - Com Join Estado
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
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta quantidade pessoas Por Estado com deficiência (614) 1,2,3 (JOIN Estado): ' + intervalo + '\n\n')

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
