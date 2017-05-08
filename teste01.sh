echo "VAI INICIAR IMPORT UF: $(date)"
mongoimport -v -d censo2010 -c uf --type csv --headerline --file uf.csv

echo "TERMINOU UF. INICIA IMPORT TEMI: $(date)"
mongoimport -v -d censo2010 -c tEmi --type csv --headerline --file tEmi.csv

echo "TERMINOU TEMI. INICIA IMPORT TMOR: $(date)"
mongoimport -v -d censo2010 -c tMor --type csv --headerline --file tMor.csv

echo "TERMINOU TMOR. INICIA IMPORT TDOM: $(date)"
mongoimport -v -d censo2010 -c tDom --type csv --headerline --file tDom.csv

echo "TERMINOU TDOM. INICIA IMPORT TPES: $(date)"
mongoimport -v -d censo2010 -c tPes --type csv --headerline --file tPes.csv

echo "TERMINOU TPES. INICIA IMPORT TGER: $(date)"
mongoimport -v -d censo2010 -c tGer --type csv --headerline --file tGer.csv
echo "TERMINOU IMPORT TGER: $(date)"

echo "VAI INICIAR TESTES CONSULTAS (SEM INDEX): $(date)"
mongo Consultas-NoIndex.js
echo "TERMINOU TESTES CONSULTAS (SEM INDEX): $(date)"

echo "VAI CRIAR INDICES: $(date)"
mongo CriaIndices.js
echo "TERMINOU CRIAÇÃO DE INDICES: $(date)"

echo "VAI INICIAR TESTES CONSULTAS (COM INDEX): $(date)"
mongo Consultas.js
echo "TERMINOU TESTES CONSULTAS (COM INDEX): $(date)"
