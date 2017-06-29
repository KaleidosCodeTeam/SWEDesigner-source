function NomeClasse2()
 { 
} 
NomeClasse2.nuovoAttributo2 = 'c';
NomeClasse2.nuovaOperazione2= function(nuovoParametro2 = "sss") 
 { 
} 
NomeClasse2.prototype = new NomeClasse1();
 NomeClasse2.prototype.constructor = NomeClasse2; 
