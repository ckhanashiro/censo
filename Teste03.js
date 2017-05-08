
load('auxJS.js')

var dataHoraInicio = consultaDateTime();
print ('\nInício da execução: ' + dataHoraInicio)

// Muda para DB Teste03
db = db.getSiblingDB('teste03')

try {
  var01 = setVerboseShell(true);
}
catch (err) {
  print ('ERRO: ' + err)
}

// Consulta Distinct V0300 tMor
dataHoraInicio = new Date();
cursor = db.tMor.aggregate([{$group: {_id: '$V0300'} },{$count:"cont"}])
print ('\nNum Distinct V0300 tMor: ' + cursor.next().cont)
//print( cursor.next().cont )
//while ( cursor.hasNext() ) {
//   x = printjsononeline( cursor.next().cont );
//}
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo Num Distinct V0300 tMor: ' + intervalo)
print ('\n')

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

/**
// Consulta V0614 - Deficiencias
dataHoraInicio = new Date();
cursor = db.tPes.aggregate([
 { $match: {V0614:{$in:[1,2,3]}}},
 { $group: {
       _id: {Estado:"$V0001",Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$V0010"}
    }
 }
])
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo consulta tPes \(Grupos de V0001,V0614\): ' + intervalo + '\n\n')


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
print (consultaDateTime() + ': Tempo consulta tPes (JOIN) \(Grupos de V0001,V0614\): ' + intervalo + '\n\n')


dataHoraInicio = new Date();
cursor = db.tger.aggregate([
 { $match: {V0614:{$in:[1,2,3]}}},
 { $group: {
       _id: {Estado:"$P_V0001",Deficiencia:"$V0614"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$P_V0010"}
    }
 }
])
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print (consultaDateTime() + ': Tempo consulta-TabGER \(Grupos de V0001,V0614\): ' + intervalo + '\n\n')


dataHoraInicio = new Date();
cursor = db.tger.aggregate([
 { $match: {V0614:{$in:[1,2,3]}}},
 { $group: {
       _id: {Estado:"$P_V0001",Deficiencia:"$V0614"},
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
print (consultaDateTime() + ': Tempo consulta TabGER (JOIN) \(Grupos de V0001,V0614\): ' + intervalo + '\n\n')





/*****


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
print (consultaDateTime() + ': Tempo consulta \(Domicílios Total\): ' + intervalo + '\n\n')


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
print (consultaDateTime() + ': Tempo consulta \(Domicílios Total\): ' + intervalo + '\n\n')



// Consulta count(*) from domicilio where v0300 not in (select v0300 from emigracao)
dataHoraInicio = new Date();
cursor = db.tDom.find ({
   V0300: {
    $nin:db.tEmi.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
   }
}
).count()
print ('\nNum tDom Not In tEmi: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo tDom Not In tEmi: ' + intervalo)
print ('\n')

//varArr = 
try {
  cursor = db.tDom.find ({
     V0300: {
      $nin:db.tPes.find ({}, {_id:0,V0300:1}).toArray().map(function(u){return u.V0300})
     }
  }).count()
}
catch (err) {
  print ('ERRO: ' + err)
}
//cursor = db.tPes.find (
// {},
// {V0300:1}
//)

i = 0;
cursor = db.tEmi.find ({V0300: {$nin:[12345,974687]}})
while ( cursor.hasNext() && i++ < 10) {
   printjsononeline( cursor.next() );
}
print('\nFez not in...\n');


// Consulta Aggregation - Lockup - Join
dataHoraInicio = new Date();
cursor = db.tEmi.aggregate(
  [{ $lookup: {
       from: "tDom",
       localField:"V0300",
       foreignField:"V0300",
       as: "xxxx"
     }
   },
   {$count: "contador"}
  ]
  //,
  //{allowDiskUse: true}
)
print ('\nJoin tEmi e tDom: ' + cursor)
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo Aggregate (Join - tEmi e tDom): ' + intervalo)
print ('\n')
*****/

/*
while (cursor.hasNext ()) {
  printjson (cursor)
}
*/