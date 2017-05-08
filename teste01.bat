echo VAI INICIAR IMPORT UF: %DATE% %TIME%
mongoimport -v -d censo2010 -c uf --type csv --file uf.csv --headerline

echo TERMINOU UF. INICIA IMPORT TEMI: %DATE% %TIME%
mongoimport -v -d censo2010 -c tEmi --type csv --headerline --file c:\Clovis\01-Censos\03-Desenv\04-Mongo\ArqsEntrada\tEmi.csv

echo TERMINOU TEMI. INICIA IMPORT TMOR: %DATE% %TIME%
mongoimport -v -d censo2010 -c tMor --type csv --headerline --file c:\Clovis\01-Censos\03-Desenv\04-Mongo\ArqsEntrada\tMor.csv

echo TERMINOU TMOR. INICIA IMPORT TDOM: %DATE% %TIME%
mongoimport -v -d censo2010 -c tDom --type csv --headerline --file c:\Clovis\01-Censos\03-Desenv\04-Mongo\ArqsEntrada\tDom.csv

echo TERMINOU TDOM. INICIA IMPORT TPES: %DATE% %TIME%
mongoimport -v -d censo2010 -c tPes --type csv --headerline --file c:\Clovis\01-Censos\03-Desenv\04-Mongo\ArqsEntrada\tPes.csv

echo TERMINOU TPES. INICIA IMPORT TGER: %DATE% %TIME%
mongoimport -v -d censo2010 -c tGer --type csv --headerline --file c:\Clovis\01-Censos\03-Desenv\04-Mongo\ArqsEntrada\tGer.csv
echo TERMINOU IMPORT TGER: %DATE% %TIME%

echo VAI INICIAR TESTES CONSULTAS (SEM INDEX): %DATE% %TIME%
mongo Consultas-NoIndex.js
echo TERMINOU TESTES CONSULTAS (SEM INDEX): %DATE% %TIME%

echo VAI CRIAR INDICES: %DATE% %TIME%
mongo CriaIndices.js
echo TERMINOU CRIAÇÃO DE INDICES: %DATE% %TIME%

echo VAI INICIAR TESTES CONSULTAS (COM INDEX): %DATE% %TIME%
mongo Consultas.js
echo TERMINOU TESTES CONSULTAS (COM INDEX): %DATE% %TIME%
