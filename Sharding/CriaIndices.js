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
cursor = db.tEmi.createIndex({V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tEmi(V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tMor.createIndex({V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tMor(V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tDom.createIndex({V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tDom(V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({D_V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(D_V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({P_V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(P_V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({M_V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(M_V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({E_V0300:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(E_V0300): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0010:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0010): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tDom.createIndex({V0010:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tDom(V0010): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0606:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0606): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0606:1,V0010:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0606,V0010): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0614:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0614): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0614:1,V0010:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0614,V0010): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0010:1,V0614:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0010,V0614): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0614:1, V0010:1, V0001:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0614,V0010,V0001): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tPes.createIndex({V0001:1, V0010:1, V0614:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tPes(V0001,V0010,V0614): ' + intervalo + '\n\n')



dataHoraInicio = new Date();
cursor = db.tGer.createIndex({IdMortalidade:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(IdMortalidade): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({IdEmigracao:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(IdEmigracao): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({IdDomicilio:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(IdDomicilio): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({IdPessoa:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(IdPessoa): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({P_V0001:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(P_V0001): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({P_V0010:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(P_V0010): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({V0614:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(V0614): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({V0614:1,P_V0010:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(V0614,P_V0010): ' + intervalo + '\n\n')

dataHoraInicio = new Date();
cursor = db.tGer.createIndex({P_V0001:1,V0614:1,P_V0010:1});
intervalo = calculaIntervalo (dataHoraInicio);
print ('Tempo criação índice tGer(V0001,V0614,P_V0010): ' + intervalo + '\n\n')
