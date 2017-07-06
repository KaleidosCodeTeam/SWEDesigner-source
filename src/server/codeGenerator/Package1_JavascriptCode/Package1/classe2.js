function classe2()
 { 
this.operInterfaccia = function(param1,param2) 
 { 
while(param2 >0){ 
System.out.println(param1);
}
return "operInterfaccia da classe2"; 
} 
this.setAttr1 = function(at1) 
 { 
attr1 = at1;
System.out.println(attr1.operazione1(5));
return new class3(); 
} 
} 
classe2.attr1 = undefined;
classe2.operazione2= function() 
 { 
return new classe3(); 
} 
