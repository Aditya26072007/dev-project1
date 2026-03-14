document.addEventListener("DOMContentLoaded",()=>{
    const removebtn=document.querySelector("#removetask");
// removebtn.addEventListener("click", () => {
//     const boxhold=document.querySelector("#box-container");
// boxhold.classList.remove("hidden");
// //card appears
// //select a radio option
// const selected = document.querySelector('input[name="priority"]:checked');
// if (selected) {
//     //make a graph
// }
// //remove the list selected from todocontyainer
// });



const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const containertodo=document.querySelector(".to-do-container");
let tasks= JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) =>render(task));



const weeklyProgress = JSON.parse(localStorage.getItem("weeklyProgress")) ||{
    Sun:0,
Mon:0,
Tue:0,
Wed:0,
Thu:0,
Fri:0,
Sat:0

}
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const chartDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
addTaskBtn.addEventListener("click", () => {

const taskText = taskInput.value.trim();
if(taskText===""){
    alert("Please enter a task.");
    return;
}
if(taskText){
    const newTask = {
        
 id: Date.now(),
 text: taskText
};
tasks.push(newTask);
savetolocal();
render(newTask);
taskInput.value="";
console.log(tasks);
}

 });

removebtn.addEventListener("click", (e) => {
    e.stopPropagation();
    days.forEach((day) => {
        weeklyProgress[day] = 0;
    });
    localStorage.setItem("weeklyProgress", JSON.stringify(weeklyProgress));
    graphmaker();
});

function render(task){
    const li=document.createElement("li");
    li.innerHTML=`${task.text} <button class="delete-btn">Task-Completed</button> <button class="delete-btn1">Remove Task</button>`;
   const deleteBtn1 = li.querySelector(".delete-btn1");
deleteBtn1.style.marginLeft = "0%";

deleteBtn1.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks=tasks.filter(t=>t.id!==task.id);
    li.remove();
    savetolocal();
});
    const deleteBtn = li.querySelector(".delete-btn");
deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks=tasks.filter(t=>t.id!==task.id);


 const today = new Date()
 const dayNumber = today.getDay()
 weeklyProgress[days[dayNumber]] += 1;

localStorage.setItem("weeklyProgress", JSON.stringify(weeklyProgress));
graphmaker();

    li.remove();
    savetolocal();
});

containertodo.appendChild(li);
}
 function savetolocal(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
 }

const ctx = document.getElementById("progressChart");

let progressChart = new Chart(ctx, {
type: "bar",
data: {
 labels: chartDays,
datasets: [{
label: "Tasks Completed",
 data: chartDays.map((day) => weeklyProgress[day] ?? 0),
 backgroundColor: "#4f46e5",
 borderRadius: 5
}]
},
options:{
indexAxis:'x', 
responsive:true,
plugins:{legend:{display:false}},
scales:{
y:{beginAtZero:true}
}
}
});

function graphmaker(){
progressChart.data.datasets[0].data = chartDays.map((day) => weeklyProgress[day] ?? 0);
progressChart.update();
}




});
