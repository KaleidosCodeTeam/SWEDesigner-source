package Package1_JavaCode.Package1;
import Package1_JavaCode.Package2.*;
public final class classe1 extends abstractClass 
 { 
private int[] attr2  = new int[10];
protected String operAbs() { 
if(attrAbs > 0){ 
System.out.println("OperAbs della classe1!!");
System.out.println(attr1);
return "ramo if"; 
}
else { 
return "ramo then"; 
} 
 
 }; 
public static String operazione1(int param1) { 
attrAbs = param1;

if(param1 > 0){ 
operAbs();
return ; 
}
else { 
operAbs();
return ; 
} 
 
 }; 
};