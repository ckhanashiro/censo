file = open("tstEntrada-1.csv","w");
file.write ("_id,campo1,campo2\r\n");
for i in range (1, 2000001):
  file.write (str(i)+",campo"+str(i)+","+str(i*10)+"\r\n");
file.close();
