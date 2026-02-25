let maxSlots = 5;

// LOGIN
function login(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;
let e=document.getElementById("error");

if(u==""||p==""){
e.innerText="Enter username & password";
}else{
localStorage.setItem("playerName",u);
window.location="main.html";
}
}

// LOGOUT
function logout(){
window.location="login.html";
}

// SHOW USER
function showWelcome(){
let name=localStorage.getItem("playerName");
if(name){
document.getElementById("welcomeUser").innerText="Welcome, "+name+"!";
}
loadTeams();
}

// THEME
function toggleTheme(){
document.body.classList.toggle("light-mode");
}

// INFO
function showTournamentAlert(){
alert("RAW Esports PUBG Tournament\nMap: Erangel\nPrize Pool ₹5000");
}

// POPUP
function openPopup(){
document.getElementById("registrationPopup").style.display="flex";
}
function closePopup(){
document.getElementById("registrationPopup").style.display="none";
}

// SUBMIT REGISTRATION
function submitRegistration(){

let team=document.getElementById("teamName").value;
let p1=document.getElementById("p1").value;
let p2=document.getElementById("p2").value;
let p3=document.getElementById("p3").value;
let p4=document.getElementById("p4").value;

if(!team||!p1||!p2||!p3||!p4){
alert("Fill all details!");
return;
}

let teams=JSON.parse(localStorage.getItem("teams"))||[];

if(teams.length>=maxSlots){
alert("All slots filled!");
return;
}

let newTeam={
team:team,
players:[p1,p2,p3,p4]
};

teams.push(newTeam);
localStorage.setItem("teams",JSON.stringify(teams));

alert("✅ Registration Successful!\nTeam: "+team);

closePopup();
loadTeams();
}

// LOAD & SHOW TEAMS
function loadTeams(){

let teams=JSON.parse(localStorage.getItem("teams"))||[];
let container=document.getElementById("registeredTeams");

container.innerHTML="";

teams.forEach((t,index)=>{

let div=document.createElement("div");
div.className="team-card";

div.innerHTML=
"<b>#"+(index+1)+" "+t.team+"</b><br>"+
t.players.join("<br>");

container.appendChild(div);

});

document.getElementById("slotsLeft").innerText=
"Slots Left: "+(maxSlots-teams.length);
}

// RESET TOURNAMENT
function resetTournament(){

    let confirmReset = confirm("Are you sure you want to clear all teams?");

    if(confirmReset){
        localStorage.removeItem("teams");
        loadTeams();
        alert("All registrations cleared!");
    }
}

// ADMIN RESET SYSTEM
function adminReset() {

    let adminId = prompt("Enter Admin ID:");
    let adminPass = prompt("Enter Admin Password:");

    if (adminId === "admin" && adminPass === "admin") {

        let confirmReset = confirm("Admin verified!\nClear all registrations?");

        if (confirmReset) {
            localStorage.removeItem("teams");
            loadTeams();
            alert("✅ Tournament Reset Successfully!");
        }

    } else {
        alert("❌ Access Denied! Only Admin can reset.");
    }

} 

fetch("https://script.google.com/macros/s/AKfycbyZKxx-X_m49vVnYc9NZiWst7bhUTsW9IxYX1mklNpJbuP5BgvV7AN1Im2AVb9ScS0-/exec", {
    method: "POST",
    body: JSON.stringify({
        team: team,
        p1: p1,
        p2: p2,
        p3: p3,
        p4: p4
    })
});
