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
removebtn.addEventListener("click", (e) => {
    e.stopPropagation();
    weeklyProgress[days[0]] =0;
    weeklyProgress[days[1]] =0;
    weeklyProgress[days[2]] =0;
    weeklyProgress[days[3]] =0;
    weeklyProgress[days[4]] =0;
    weeklyProgress[days[5]] =0;
    weeklyProgress[days[6]] =0;
    localStorage.setItem("weeklyProgress", JSON.stringify(weeklyProgress));
    graphmaker();
});
    const deleteBtn = li.querySelector(".delete-btn");
deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks=tasks.filter(t=>t.id!==task.id);


today = new Date()
dayNumber = today.getDay()
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
labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets: [{
label: "Tasks Completed",
data: [
weeklyProgress.Mon,
weeklyProgress.Tue,
weeklyProgress.Wed,
weeklyProgress.Thu,
weeklyProgress.Fri,
weeklyProgress.Sat,
weeklyProgress.Sun
],
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
progressChart.data.datasets[0].data = Object.values(weeklyProgress);
progressChart.update();
}




});