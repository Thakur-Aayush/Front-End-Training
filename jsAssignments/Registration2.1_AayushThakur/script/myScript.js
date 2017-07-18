var flagGender = false, flagEmpty = true ,Skills = document.getElementsByClassName("Skills");
var parentId,institute,university,percent;
var diploma = document.getElementById("diplomaLabel");
var graduation = document.getElementById("graduationLabel");
var postGraduation = document.getElementById("postGraduationLabel");
var errorArea = document.getElementById ("error-area");
var inputs = document.querySelectorAll("input");

function removeErrorArea(inputField){
    if(errorArea.style.display == "inline-block"){
        errorArea.innerHTML = "";
        errorArea.style.display = "none";
        document.getElementById(inputField.id).focus(); 
    }
}
diploma.addEventListener("click",function () {
    if(diploma.checked){
        diploma.setAttribute("class","getValue");
        addFields("Diploma");
    }else{
        removeFields(institute,university,percent);
    }
})
graduation.addEventListener("click",function () {
    if(graduation.checked){
        graduation.setAttribute("class","getValue");
        addFields("Graduation");
    }else{
        removeFields(institute,university,percent);
    }
})
postGraduation.addEventListener("click",function () {
    if(postGraduation.checked){
        postGraduation.setAttribute("class","getValue");
        addFields("PostGraduation");
    }else{
        removeFields(institute,university,percent);
    }
})

for(var i=0;i<Skills.length;i++){
    Skills[i].addEventListener("blur",function(){
        var pattern = /^[a-zA-Z][a-zA-Z+{0,2}#{0,1}(\.){0,1}]+(,[0-9a-zA-Z]+)*$/;
        if(!pattern.test(this.value)){
            errorArea.style.color = "red";
            errorArea.innerHTML = "Skills must be seperated through comma(,) only.";
            errorArea.style.display = "inline-block";
        }
    })
}

for(var i=0;i<inputs.length;i++){
    inputs[i].addEventListener("keydown",function(event){
        if(event.keyCode == 08 ){
            removeErrorArea(this);
        }
        removeErrorArea(this);
    })
}

document.getElementById("fName").addEventListener("blur",textValidation);       //Name validation
document.getElementById("lName").addEventListener("blur",textValidation);       //Name validation
document.getElementById("age").addEventListener("blur",ageValidate);            //Age validation
document.getElementById("mobile").addEventListener("blur",mobileValidation);    //Mobile Number validation
document.getElementById("pinCode").addEventListener("blur",pinValidation);      //Pin Code Validation
document.getElementById("exp").addEventListener("blur",expValidate);            //Experience is not valid
document.getElementById("ssc").addEventListener("blur",percentValidation);      //SSC Validation
document.getElementById("hsc").addEventListener("blur",percentValidation);      //HSC Validation
document.getElementById("emailId").addEventListener("blur",emailValidation);    //EMAIL Validation
document.getElementById("joiningYear").addEventListener("blur",yearValidation);
document.getElementById("form").addEventListener("submit",function(event){objectCreation(event)},);


function addFields(parentId){
    var parentTag = document.getElementById(parentId);
    institute = document.createElement("input");
    university = document.createElement("input");
    percent = document.createElement("input");
    institute.setAttribute("class","getValue");
    institute.setAttribute("id",parentId+"Institute");
    institute.setAttribute("type","text");
    institute.setAttribute("name",parentId+" Institute");
    university.setAttribute("class","dAlign getValue");
    university.setAttribute("id",parentId+"University");
    university.setAttribute("type","text");
    university.setAttribute("name",parentId+" University");
    percent.setAttribute("class","getValue dAlign");
    percent.setAttribute("id",parentId+"Percent");
    percent.setAttribute("type","number");
    percent.setAttribute("name",parentId+" Percent");
    percent.setAttribute("min","0");
    percent.setAttribute("max","100");
    percent.addEventListener("blur",percentValidation);
    parentTag.appendChild(institute);
    parentTag.appendChild(university);
    parentTag.appendChild(percent);
    return (institute,university,percent);
}
function removeFields(institute,university,percent){
    var instituteId = document.getElementById(institute.getAttribute("id"));
    var universityId = document.getElementById(university.getAttribute("id"));
    var percentId = document.getElementById(percent.getAttribute("id"));
    instituteId.parentNode.removeChild(instituteId);
    universityId.parentNode.removeChild(universityId);
    percentId.parentNode.removeChild(percentId);
}
function textValidation(){
    var pattern = /^[a-zA-Z][a-zA-Z\\s]+$/;
    if(!pattern.test(this.value)){
        if(this.value == ""){
            errorArea.innerHTML = this.name + " cannot be blank.";
        }else{
            errorArea.innerHTML = this.name + " must contain Characters only.";
        }
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }
}
function pinValidation(){
    var pattern = /^[1-9][0-9]{5}$/;
    if(!pattern.test(this.value)){
        if(this.value.length != 6){
            errorArea.innerHTML = this.name + " must be 6 digits in length.";
        }
        else{
            errorArea.innerHTML = this.name+ " should not start with 0.";
        }
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }
}
function mobileValidation(){
    var pattern = /^[7-9][0-9]{9}$/;
    if(!pattern.test(this.value)){
        if(this.value.length < 10){
            errorArea.innerHTML = this.name + " number is less than 10 digits.";
        }else if(this.value.length > 10){
            errorArea.innerHTML = this.name + " number more than 10 digits.";
        }else{
            errorArea.innerHTML = this.name + " number must start with 7-9 only.";
        }
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }
}
function percentValidation(){
    if(this.value < 33 || this.value > 100){
        if(this.value < 33){
            errorArea.innerHTML = "Percentage cannot be less than 33 as it means FAIL.";
        }else{
            errorArea.innerHTML = "Percentage must be in range 33 to 100.";
        }        
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }     
} 
function ageValidate(){
    if(this.value == "" || this.value < 20 || this.value > 70){
        if(this.value < 20){
            if(this.value<20 && this.value>0){
                errorArea.innerHTML = "Please make sure you are 20+";
            }else if(this.value == ""){
                errorArea.innerHTML = "Age should be in numeric format.";
            }else if(this.value == 0){
                errorArea.innerHTML = "Age cannot be 0";
            }
        }
        if(this.value > 70){
            errorArea.innerHTML = "Age can not be greater than 70.";
        }
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }
}
function emailValidation(){
    var pattern = /^[\w]+([\.]?[\w]+)?@[\w]+\.(com|net|org)$/; 
    if(!pattern.test(this.value)){
        if(this.value == ""){
            errorArea.innerHTML = "Email cannot be blank.";
        }else{
            errorArea.innerHTML = "Email is not valid. Email must contain @ and .com/.net/.org and start with alphabet.";
        }
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }
}
function yearValidation(){
    var age = document.getElementById("age").value;
    var year = new Date(this.value);
    var currentDate = new Date();
    currentDate = currentDate.getFullYear();
    year = currentDate - year.getFullYear();
    if(year > (age-18) || age < year || isNaN(year)){
        if(age < year){
            errorArea.innerHTML = "Entered value is greater than your Age.";
        }
        if(isNaN(year)){
            errorArea.innerHTML = "Year is not Valid.";
        }
        if(year > (age-18)){
            errorArea.innerHTML = "Please make sure Joining Year is valid.";
        }
        else{
            errorArea.innerHTML = "Please enter valid data.";
        }
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }
}
function expValidate(){
    var currentDate = new Date();
    currentDate = currentDate.getFullYear();
    var joinDate = document.getElementById("joiningYear").value;
    var exp = Math.round(currentDate-joinDate);
    if(this.value < exp){
        errorArea.innerHTML = "Please make sure you entered valid Experience";
        errorArea.style.display = "inline-block";
        document.getElementById(this.id).focus();
    }
}
function compulsaryFeilds(){
    var mandatory = document.getElementsByTagName("input");
    for(var i=0;i<mandatory.length;i++){
        if(mandatory[i].value == ""){
            flagEmpty = false;
            mandatory[i].focus();
            break;
        }
    }
}
function genderSelection() {
    var gender = document.getElementsByClassName("genderValue");
    for(var i=0;i<gender.length;i++){
        if(gender[i].checked){
            gender[i].setAttribute("class","getValue");
            flagGender = true;
        }
    }
}
function objectCreation(event) {
    genderSelection();
    compulsaryFeilds();
    if(flagGender == true && flagEmpty == true){                        
        var values = document.getElementsByClassName("getValue");
        var employee = {};
        for(var i=0;i<values.length;i++){
            key = values[i].getAttribute("name");
            val = values[i].value;
            employee[key] = val;
        }
        errorArea.style.display = "none";
        localStorage.setItem("employee",JSON.stringify(employee));
        window.location = "profile.html";
    }else{
        errorArea.innerHTML = "All Fields are mandatory.";
        errorArea.style.display = "inline-block";     
        document.getElementById("fName").focus();  
    }
    event.preventDefault();
}