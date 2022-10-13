document.title=	"Online Calculator";

let mathExpression={
  number1:"",
  operator:"",
  number2:"",
  result:"",
};

const enterNumber=(numberToEnter)=>{

  let Box=document.getElementById("result-box");
  if (mathExpression.operator=="" && mathExpression.result=="")
  { 
    mathExpression.number1=numberRendering(numberToEnter,mathExpression.number1)
  }
  else if (mathExpression.operator!="" && mathExpression.result=="")
  {
    if (mathExpression.number1!="" && mathExpression.number2=="")
    {
      Box.value="";
    }
    mathExpression.number2=numberRendering(numberToEnter,mathExpression.number2)
  }
  else if (mathExpression.operator=="" && mathExpression.result!="")
  { 
    Box.value="";
    mathExpression.result="";
    mathExpression.number1=numberRendering(numberToEnter,mathExpression.number1)
  }
  else if (mathExpression.operator!="" && mathExpression.result!="")
  {
    if (mathExpression.number1!="" && mathExpression.number2=="")
    {
      Box.value="";
    }
    mathExpression.number2=numberRendering(numberToEnter,mathExpression.number2)
  }

  changeToCE();
  console.log(mathExpression);
}

const numberRendering=(numberToEnter,number1or2)=>{
  let Box=document.getElementById("result-box");

  if (Box.value=="0" && numberToEnter=="0")
  {
    Box.value="0";
    number1or2="0";
  } 
  else if (Box.value=="0" && numberToEnter!=".")
  {
    Box.value=numberToEnter;
    number1or2=Box.value;
  }
  else
  {
  //Adds the number to the end of the Box
  Box.value+=numberToEnter;

  //Assigns box value to number1
  number1or2=Box.value;
  }

  return number1or2;
}

const floatPointNumberPrecisionProblem=(number)=>{
  return (parseFloat(number).toPrecision(15));
}

const precisionProblemFloatingPointNumbers=(number1,number2)=>{
  if (Number.isInteger(Number(number1))==false || Number.isInteger(Number(number2))==false)
  {
    //Calculating the decimal result with 12 digit precision
    mathExpression.result=floatPointNumberPrecisionProblem(mathExpression.result);

    //Splitting the number
    mathExpression.result=mathExpression.result.split("");

    let dotFound=false;
    for (i=mathExpression.result.length-1;dotFound==false;i--)
    {
      if (mathExpression.result[i]=="0")
      {mathExpression.result.pop();}
      else
      {dotFound=true;}
    }

    let finalResult="";
    for (i=0;i<=mathExpression.result.length-1;i++)
    {finalResult+=mathExpression.result[i]}

    return finalResult;
  }
}

const enterSymbol=(operation)=>{

if (operation=="=")
{
  //Calculating the result
  mathExpression.result=mathExpression.number1+mathExpression.operator+mathExpression.number2;
  mathExpression.result=eval(mathExpression.result);

  //Dealing with precision problems considering floating point numbers
  mathExpression.result=precisionProblemFloatingPointNumbers(mathExpression.number1,mathExpression.number2)

  //Rendering the result in the Box
  Box=document.getElementById("result-box");
  Box.value=mathExpression.result;
  
  //Assigning empty to number1,number2,operator
  mathExpression.number1="";
  mathExpression.number2="";
  mathExpression.operator="";

}
else if (mathExpression.number1!="" && mathExpression.number2!="")
{
  //Calculating the result
  mathExpression.result=mathExpression.number1+mathExpression.operator+mathExpression.number2;
  mathExpression.result=eval(mathExpression.result);

  //Dealing with precision problems considering floating point numbers
  mathExpression.result=precisionProblemFloatingPointNumbers(mathExpression.number1,mathExpression.number2);

  //Rendering the result in the Box
  Box=document.getElementById("result-box");
  Box.value=mathExpression.result;

  //Assigning the result to number1
  mathExpression.number1=mathExpression.result.toString();

  //Assigning the new operator to operator
  mathExpression.operator=operation;

  //Assigning number2 to empty
  mathExpression.number2="";

}
else if (mathExpression.number1=="" && mathExpression.operator=="" && mathExpression.number2=="" && mathExpression.result!="")
{
  mathExpression.number1=mathExpression.result.toString();
  mathExpression.operator=operation;
  mathExpression.result="";
}
else
{
  mathExpression.operator=operation;
}

if (operation!="=")
{
  changeToCE();
}

console.log(mathExpression)
}

const manipulateNumber=(manipulation)=>{
  let Box=document.getElementById("result-box");

  if (manipulation=="x**n")
  {
    let x=Box.value;
    let n=prompt("Enter a value to be the exponential number (default value is 0)");
    Box.value=x**n;
  }
  if (manipulation=="x**2")
  {
    Box.value=Box.value**(2);
  }
  if (manipulation=="pi")
  {
    Box.value=Math.PI;
  }
  if (manipulation=="squareRoot")
  {
    Box.value=Box.value**(1/2);
  }
  else if (manipulation=="percentage")
  {
    Box.value=Box.value*(0.01);
  }
  else if (manipulation=="negate")
  {
    Box.value=Box.value*(-1);
  }
  else if (manipulation=="sequence")
  {
    let BoxValue=Number(Box.value);
    let Isinteger=Number.isInteger(BoxValue);

    if (Isinteger==true && BoxValue>0)
    {
      let currentProduct=1;
      for (i=2;i<=BoxValue;i++)
      {
        currentProduct=currentProduct*i;
      }
        if (mathExpression.operator=="")
          { 
            Box.value=currentProduct.toString();
            mathExpression.number1=Box.value;
          }
        else if (mathExpression.operator!="")
          {
            Box.value=currentProduct.toString();
            mathExpression.number2=Box.value;
          }
    }
    else if (Isinteger==true && BoxValue==0)
    {
      if (mathExpression.operator=="")
          { 
            Box.value="1";
            mathExpression.number1=Box.value;
          }
        else if (mathExpression.operator!="")
          {
            Box.value="1";
            mathExpression.number2=Box.value;
          }
    } 
    else
    {
      alert("Please enter a positive integer");
      Box.value="";
    } 
  }

  if (mathExpression.operator=="")
  { 
    mathExpression.number1=Box.value;
  }
  else if (mathExpression.operator!="")
  {
    mathExpression.number2=Box.value;
  }
  console.log(mathExpression);

}

const changeToAC=()=>{
  let ACorCEButton=document.getElementById("ACorCEbutton");
  ACorCEButton.innerText="AC";
  ACorCEButton.value="AC";
}

const changeToCE=()=>{
  let ACorCEButton=document.getElementById("ACorCEbutton");
  ACorCEButton.innerText="CE";
  ACorCEButton.value="CE";  
}

const deleteEntry=()=>{
  let Box=document.getElementById("result-box");
  let ACorCEButton=document.getElementById("ACorCEbutton");

if (ACorCEButton.value=="AC")
{
  mathExpression.number1="";
  mathExpression.operator="";
  mathExpression.number2="";
  mathExpression.result="";
  Box.value="";
}
else if (ACorCEButton.value=="CE")
{
      if(mathExpression.number1!=""
      && mathExpression.operator==""
      && mathExpression.number2==""
      && mathExpression.result=="")
        {
          mathExpression.number1="";
          Box.value="";
          changeToAC();
          //console.log("if 1")
        }
  else if( mathExpression.number1!=""
       && mathExpression.operator!=""
       && mathExpression.number2==""
       && mathExpression.result=="")
        {
          mathExpression.operator="";
          changeToAC();
          //console.log("if 2")
        }
  else if( mathExpression.number1!=""
       && mathExpression.operator!=""
       && mathExpression.number2!=""
       && mathExpression.result=="")
        {
          mathExpression.number2="";
          Box.value="";
          changeToAC();
          //console.log("if 3")
        }
  else if( mathExpression.number1==""
        && mathExpression.operator==""
        && mathExpression.number2==""
        && mathExpression.result!="")
          {
            mathExpression.result="";
            Box.value="";
            changeToAC();
            //console.log("if 4")
          }
  else if(  mathExpression.number1!=""
         && mathExpression.operator!=""
         && mathExpression.number2==""
         && mathExpression.result!="")
          {  
            mathExpression.operator="";
            changeToAC();
            //console.log("if 5")
          }
          else if(  mathExpression.number1!=""
         && mathExpression.operator!=""
         && mathExpression.number2!=""
         && mathExpression.result!="")
          {  
            mathExpression.number2="";
            Box.value="";
            changeToAC();
            //console.log("if 6")
          }
}
console.log(mathExpression);
}

let memoryNumber=0;
const memory=(action)=>{
  let Box=document.getElementById("result-box");
  if (action=="+")
  {
    memoryNumber+=Number(Box.value);
  }
  else if (action=="-")
  {
    memoryNumber-=Number(Box.value);
  }
  else if (action=="recall")
  {
    if (mathExpression.operator=="")
    {
      Box.value=memoryNumber.toString();
      mathExpression.number1=memoryNumber.toString();
    }else if (mathExpression.operator!="")
    {
      Box.value=memoryNumber.toString();
      mathExpression.number2=memoryNumber.toString();
    }
  }
  else if (action=="clear")
  {
    memoryNumber=0;
  }
  console.log(mathExpression);
  console.log(`memory number is: ${memoryNumber}`);
}
