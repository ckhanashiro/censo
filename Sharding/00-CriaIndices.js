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

// Muda para DB Teste03
db = db.getSiblingDB('censo2010-srd')

print ('\nColeções:');
print(db.getCollectionNames());
print ('\n');

var intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo consulta DB e coleções: ' + intervalo)

// INÍCIO DE CRIAÇÃO DE ÍNDICES
dataHoraInicio = new Date();
print ('\n\nVAI CRIAR ÍNDICES: ' + dataHoraInicio + '\n\n')
cursor = db.teste01.createIndex({campo2:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tEmi(V0300): ' + intervalo + '\n\n')


dataHoraInicio = new Date();
cursor = db.teste01.createIndex({campo1:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tMor(V0300): ' + intervalo + '\n\n')


dataHoraInicio = new Date();
cursor = db.teste01.createIndex({campo1:1,campo2:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0606,V0010): ' + intervalo + '\n\n')
