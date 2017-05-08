
load('auxJS.js')

var dataHoraInicio = consultaDateTime();
print ('\nInício da execução: ' + dataHoraInicio)

// Muda para DB Teste03
//db = db.getSiblingDB('censo2010')
db = db.getSiblingDB('c2010')

try {
  var01 = setVerboseShell(true);
}
catch (err) {
  print ('ERRO: ' + err)
}


// Consulta População
dataHoraInicio = new Date();
cursor = db.tPes.aggregate([
// {$match: {V0010: {$gt:0}}},
 { $group: {
     _id: null,
     Soma: {$sum: "$V0010"}
  }
 }
])
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
print ('Tempo consulta \(População Total\): ' + calculaIntervalo (dataHoraInicio) + '\n\n')

// Consulta Domicílios
dataHoraInicio = new Date();
cursor = db.tDom.aggregate([
// {$match: {V0010: {$gt:0}}},
 { $group: {
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


// tTOTAL
var vaiExpl = 0
dataHoraInicio = new Date();
cursor = db.tTotal.aggregate(
 [
 {$match: {"Pessoa.V0010": {$gt:0}}},
// {$match: {"Pessoa._id": {$gt:1000}}},
// {$project:{x:"$Pessoa.V0010"}},
 {$unwind: "$Pessoa"},
// {$match: {"Pessoa._id": {$lt:10}}},
// {$match: {"Pessoa.V0010": /^1/}},
// {$project:{x:"$Pessoa.V0010"}},
 { $group: {
//     _id: {$sum: 1},
     _id: null,
     Soma: {$sum: "$Pessoa.V0010"}
//     Soma: {$sum: "$x"}
//     Soma: {$sum: 1}
  }
//,{$hint: "Pessoa.V0010"}
 }]
//,{explain:true}
)
if (vaiExpl == 1) {
   printjson( cursor);
} else {
  while ( cursor.hasNext() ) {
     printjsononeline( cursor.next() );
  }
}

intervalo = calculaIntervalo (dataHoraInicio);
print ('(tTotal) Tempo consulta \(População Total\): ' + intervalo + '\n\n')

// Consulta Domicílios
dataHoraInicio = new Date();
/*
var str []= "[\
 {$match: {\
    V0010: {$gt:0} \
//    V0010: 1 \
  }\
 },\
 {\
  $group: {\
     _id: {$sum: 1},\
     Soma: {$sum: \"$V0010\"}\
  }\
 }]";
 
//,{explain:true}\
//)\
//";

//print (str);
*/

//var objec = JSON.parse(str);

cursor = db.tTotal.aggregate(
 [
// {$match: {V0010: {$gt:0}}},
 {
  $group: {
     _id: null,
     Soma: {$sum: "$V0010"}
  }
 }]
//,{explain:true}
)

if (vaiExpl == 1) {
   printjson( cursor);
} else {
  while ( cursor.hasNext() ) {
     printjsononeline( cursor.next() );
  }
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('(tTotal) Tempo consulta \(Domicílios Total\): ' + intervalo + '\n\n')




// Consulta V0606
dataHoraInicio = new Date();
cursor = db.tPes.aggregate(
 [
// { $match: {"Pessoa.V0606": {$gt:0}}},
 { $group: {
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

// Consulta V0606 - tTotal
dataHoraInicio = new Date();
cursor = db.tTotal.aggregate(
 [
 {$match: {"Pessoa.V0606": {$gt:0}}},
 {$unwind: "$Pessoa"},
 { $group: {
       _id: {ano:"$Pessoa.V0606"},
       NumReg: {$sum: 1},
       Soma: {$sum: "$Pessoa.V0010"}
    }
 }]
)
while ( cursor.hasNext() ) {
   printjsononeline( cursor.next() );
}
intervalo = calculaIntervalo (dataHoraInicio);
print ('(tTotal) Tempo consulta Pessoas por V0606: ' + intervalo + '\n\n')
