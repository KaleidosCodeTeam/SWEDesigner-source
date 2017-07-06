function classe1()
 { 
this.operAbs = function() 
 { 
if(attrAbs > 0){ 
System.out.println("OperAbs della classe1!!");
System.out.println(attr1);
return "ramo if"; 
}
else { 
return "ramo then"; 
} 
} 
} 
classe1.operazione1= function(param1) 
 { 
attrAbs = param1;

if(param1 > 0){ 
operAbs();
return ; 
}
else { 
operAbs();
return ; 
} 
} 
classe1.prototype = new abstractClass();
 classe1.prototype.constructor = classe1; 
