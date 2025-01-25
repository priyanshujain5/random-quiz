const form = document.querySelector("form")
let h1 = document.createElement("h1")
h1.textContent="facts quiz"
form.appendChild(h1)


const questionbank=[
    {question:"who is pm of india?",option:["virat","modi","manmohan"],answer:"modi"},
    {question:"who is president of india?",option:["vallabh patel","murmu","pranabh"],answer:"murmu"},
    {question:"who is finance minister of india?",option:["amit","modi","nirmala"],answer:"nirmala"},
    {question:"worlds largest cricket stadium in which country?",option:["england","india","australia"],answer:"india"},
    {question:"worlds largest cricket stadium name?",option:["malbourne","modi","brisbane"],answer:"modi"},
    {question:"isro is in which country?",option:["india","russia","china"],answer:"india"},
    {question:"RAW is for?",option:["interogation","intelligence","finance"],answer:"intelligence"},

    {question:"worlds biggest country?",option:["italy","america","russia"],answer:"russia"}
]

function randomselect(){

    // const data  = new Set();
    // while(data.size != 5){
    //     let i = Math.floor(Math.random()*questionbank.length)
    //     data.add(questionbank[i]);
    // }
    // return [...data] // converting set into array

    // more optimized way to select questions

    // questionbank.sort(()=> Math.random()-0.5)

    // return questionbank.slice(0,5)

    // most optimized way fisher algo
    let arr=[]

    let l = questionbank.length
    for(let i=0 ; i<5 ; i++){
    let i = Math.floor(Math.random()*l)
    arr.push(questionbank[i]);
    [questionbank[i],questionbank[l-1]]=[questionbank[l-1],questionbank[i]]
    l--;
    }
    return arr;



}

const problemset= randomselect();

problemset.forEach((obj,index)=>{

    const para = document.createElement("p")
    para.textContent=`q${index+1}. ${obj.question}`
    form.appendChild(para)
    const div = document.createElement("div")
    div.className="option"
    form.appendChild(div)

    obj["option"].forEach((data)=>{
        const div1=document.createElement("div")
        const input= document.createElement("input")
        const label=document.createElement("label")
        input.type="radio"
        input.name=`q${index+1}`
        input.value=data
        form.appendChild(div1)
        div1.appendChild(label)
        label.appendChild(input)
        label.appendChild(document.createTextNode(data))
        

    })
    
})

const divb = document.createElement("div")
divb.className="divbutton"
const button=document.createElement("button");
button.className="button"
button.textContent="submit"
button.type="submit";
divb.appendChild(button)


const reset=document.createElement("button");
reset.className="button"
reset.textContent="reset"
reset.type="reset";
divb.appendChild(reset)
form.append(divb)

const quizans={}
problemset.forEach((obj,index)=>{
    quizans[`${index+1}`]=obj["answer"]
})

const result= document.createElement("div")

const f = document.querySelector("form")
f.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    
    let r = 0;
    const d = new FormData(f)
    const ans = Array.from(d.values())
    
   for(let i=0; i<ans.length ; i++){
       
    if(ans[i]== quizans[i+1]) 
        r++
   }
   if(r>3) result.style.color="yellowgreen"
   else result.style.color="red"

   result.textContent=`the score is ${r} out of ${problemset.length}`;
   result.style.textAlign="center"
   result.classList.add("result")
   f.appendChild(result)
   

   
})

f.addEventListener("reset",()=>{
    
   console.log("form reseted")
   result.remove()
})