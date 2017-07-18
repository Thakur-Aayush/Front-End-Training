window.addEventListener("load",function(){
    emp = JSON.parse(localStorage.getItem("employee"));
    var result = document.querySelector(".wrapper");
    profilePage();
})
function profilePage(){
    fName = emp["First Name"].slice(0,1).toUpperCase()+emp["First Name"].slice(1).toLowerCase();
    lName = emp["Last Name"].slice(0,1).toUpperCase()+emp["Last Name"].slice(1);
    document.getElementById("welcome").innerHTML = "Welcome , "+ fName ;
    var profileImage = document.getElementById("profileImage");
    var imageSource = "./images/"+emp["Image"].split("\\")[2];
    profileImage.src = imageSource;
    if(emp["Gender"] == "M")
        gender = "Male";
    else
        gender = "Female";
    var subInfo = document.getElementById("subInfo");
    subInfo.innerHTML = gender +" , "+emp["Age"]; 
    personalDetails();
    academicDetails();
    skills();
    exp();
}
document.getElementById("displayPI").addEventListener("click",function(){
    hideSections("personalInfo","academicInfo","skillSet","experience");
})
document.getElementById("displayAD").addEventListener("click",function(){ 
    hideSections("academicInfo","experience","skillSet","personalInfo");
})
document.getElementById("displaySkills").addEventListener("click",function(){
    hideSections("skillSet","experience","academicInfo","personalInfo");
})
document.getElementById("displayExp").addEventListener("click",function(){
    hideSections("experience","skillSet","academicInfo","personalInfo")
})
function hideSections(section1,section2,section3,section4){
    document.getElementById(section1).style.display = "block";
    document.getElementById(section2).style.display = "none";
    document.getElementById(section3).style.display = "none";
    document.getElementById(section4).style.display = "none";
}
function personalDetails(){
    var personalInfo = document.getElementById("personalInfo");
    var name = document.createElement("h1");
    name.setAttribute("id","name");
    personalInfo.appendChild(name);
    name.innerHTML = fName + " " + lName;
    var genderAge = document.createElement("h3");
    genderAge.setAttribute("id","gender");
    personalInfo.appendChild(genderAge);
    genderAge.innerHTML = gender + " --> " + emp["Age"] + " years" ;
    var email = document.createElement("h2");
    email.setAttribute("id","email");
    personalInfo.appendChild(email);
    email.innerHTML = emp["Email"];
    var mobile = document.createElement("h2");
    mobile.setAttribute("id","mobile");
    personalInfo.appendChild(mobile);
    mobile.innerHTML = emp["Mobile"];
    var address = document.createElement("h2");
    address.setAttribute("id","address");
    personalInfo.appendChild(address);
    address.innerHTML = "Residential Address : "+emp["Address"] + " , Zip : " + emp["Pin Code"];
}
function schooling(tbody,edu,institute,university,percent){
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>"+edu+"<sup>th</sup> : </td><td>"+emp[institute].toUpperCase()+"</td><td>"+emp[university].toUpperCase()+"</td><td>"+emp[percent]+"</td>";
    tbody.appendChild(tr);
}
function postSchooling(tbody,edu,institute,university,percent){
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>"+edu+" : </td><td>"+emp[institute].toUpperCase()+"</td><td>"+emp[university].toUpperCase()+"</td><td>"+emp[percent]+"</td>";
    tbody.appendChild(tr);
}
function academicDetails(){
    var academicInfo = document.getElementById("academicInfo");
    var table = document.createElement("table");
    table.innerHTML = "<thead><th></th><th>Institute</th><th>University</th><th>Percentage</th></thead>";
    var tbody = document.createElement("tbody");
    schooling(tbody,10,"SSC Institute","SSC University","SSC Percentage");
    schooling(tbody,12,"HSC Institute","HSC University","HSC Percentage");
    if(emp["diploma"] == "on"){
        postSchooling(tbody,"Diploma","Diploma Institute","Diploma University","Diploma Percent");
    }
    if(emp["graduation"] == "on"){
        postSchooling(tbody,"Degree","Graduation Institute","Graduation University","Graduation Percent");
    }
    if(emp["postGraduation"] == "on"){
        postSchooling(tbody,"PG","PostGraduation Institute","PostGraduation University","PostGraduation Percent");
    }
    table.appendChild(tbody);
    academicInfo.appendChild(table);
}
function skills(){
    var skillSet = document.getElementById("skillSet");
    var techDiv = document.createElement("div");
    techDiv.setAttribute("class","tech");
    var Label = document.createElement("h2");
    Label.innerHTML = "Tecnical Skills : ";
    techDiv.appendChild(Label);
    var technicalSkills = document.createElement("ul");
    var technicalSkillArr = emp["technicalSkills"].split(",");
    for(var i=0;i<technicalSkillArr.length;i++){
        var techListItem = document.createElement("li");
        techListItem.innerHTML = technicalSkillArr[i].toUpperCase();
        technicalSkills.appendChild(techListItem);
    }
    techDiv.appendChild(technicalSkills);
    var nonTechDiv = document.createElement("div");
    nonTechDiv.setAttribute("class","nonTech");
    var nonTechLabel = document.createElement("h2");
    nonTechLabel.innerHTML = "Non-Technical Skills : ";
    nonTechDiv.appendChild(nonTechLabel);
    var nonTechnicalSkill = document.createElement("ul");
    var nonTechnicalSkillArr = emp["nonTecnicalSkills"].split(",");
    for(var i=0;i<nonTechnicalSkillArr.length;i++){
        var nonTechListItem = document.createElement("li");
        nonTechListItem.innerHTML = nonTechnicalSkillArr[i].toUpperCase();
        nonTechnicalSkill.appendChild(nonTechListItem);
    }
    nonTechDiv.appendChild(nonTechnicalSkill);
    skillSet.appendChild(techDiv);
    skillSet.appendChild(nonTechDiv);
}
function exp(){
    var experience = document.getElementById("experience");
    var currentYear = (new Date()).getFullYear();
    var heading = document.createElement("h1");
    heading.innerHTML = "Exprience Details : ";
    experience.appendChild(heading);
    var para = document.createElement("p");
    if(emp["Experience"] == 0 || emp["Experience"] == ""){
        para.innerHTML = "Fresher";    
    }
    else{
        para.innerHTML = emp["Experience"]+" years of Experience in "+emp["companyName"]+" from "+emp["yearOfJoining"]+" to "+currentYear+" . ";
    }
    experience.appendChild(para);
}