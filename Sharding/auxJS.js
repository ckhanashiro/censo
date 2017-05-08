function consultaDateTime(){
  var currentdate = new Date(); 
  var localDatetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + ":" 
                + currentdate.getMilliseconds();

  return (localDatetime)
}

function calculaIntervalo(dataHoraInicio){
  var datahora = new Date();
  var datahoraOK = datahora.getTime (datahora);
  
  var diferenca = datahoraOK - dataHoraInicio;
  var currentdate = new Date (datahoraOK - dataHoraInicio);

  var localDatetime = currentdate.getHours()-22 + "h:"  // Precisa consertar!
                + currentdate.getMinutes() + "m:" 
                + currentdate.getSeconds() + "s:" 
                + currentdate.getMilliseconds() + "ms";

  return (localDatetime)
}

