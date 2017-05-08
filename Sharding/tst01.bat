echo VAI INICIAR IMPORT UF: %DATE% %TIME%
mongoimport -v --port 27013 -d censo2010-srd -c teste01 --type csv --headerline --file tstEntrada-1.csv

echo TERMINOU UF. INICIA IMPORT TEMI: %DATE% %TIME%
echo VAI INICIAR TESTES CONSULTAS (SEM INDEX): %DATE% %TIME%
mongo --port 27013 00-Consultas-NoIndex.js
echo TERMINOU TESTES CONSULTAS (SEM INDEX): %DATE% %TIME%

echo VAI CRIAR INDICES: %DATE% %TIME%
mongo --port 27013 00-CriaIndices.js
echo TERMINOU CRIAÇÃO DE INDICES: %DATE% %TIME%

echo VAI INICIAR TESTES CONSULTAS (COM INDEX): %DATE% %TIME%
mongo --port 27013 00-Consultas-NoIndex.js
echo TERMINOU TESTES CONSULTAS (COM INDEX): %DATE% %TIME%
