let rowData = document.getElementById("rowData");
// loading screen
$(document).ready(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
        meals()
})
// side nav
$("#menuIcon").on("click", showMenu);
function showMenu() {
    if ($(".sidenav").css("left") == "-300px") {
        $("#menuIcon").removeClass("fa-bars").addClass("fa-close");
        $(".sidenav").animate({
            left: 0,
        });
        $(".list-links ul li").each(function(index) {
            $(this).delay(200 * index).animate({
                top: -10
            }, 300);
        });
        setTimeout(closeMenu, 2000);
    } else {
        closeMenu();
    }
}
function closeMenu() {
    $("#menuIcon").removeClass("fa-close").addClass("fa-bars");
    $(".sidenav").animate({
        left: -300,
    });

    $(".list-links ul li").each(function(index) {
        $(this).delay(200 * index).animate({
            top:0
        }, 300);
    });
}
// meals section
async function meals(){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    let dataname=await Data.json()
    displayName (dataname.meals)
}
function displayName(dataname){
    temp=""
    for (let i = 0; i <dataname.length; i++) {
        temp+=`<div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getmealbyid('${dataname[i].idMeal}')">
                <img class="w-100" src="${dataname[i].strMealThumb}">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${dataname[i].strMeal}</h3>
                </div>
            </div>
      </div>`    
    }
    rowData.innerHTML=temp;
}

async function getmealbyid(id){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let dataname=await Data.json();
    let meal=dataname.meals[0]
    displaydetails(meal)
}
function displaydetails(meal){
    let recipes = ``;

    for (let i = 1; i <= 20; i++) {
       if (meal[`strIngredient${i}`]) {
          recipes += `   
       <li class="alert alert-info m-2 p-1">
       ${meal[`strMeasure${i}`]}${meal[`strIngredient${i}`]}
     </li> `;
       }
    }
 
    if (!recipes) {
       $(".recipes-title").addClass("d-none");
    }
 
    let tagsArray = meal.strTags?.split(","); 
    if (!tagsArray) {
       $(".tags-title").addClass("d-none");
    }
    let tags = ``;
    for (let i = 0; i < tagsArray?.length; i++) {
       tags += `
       
       <li class="alert alert-danger p-1 m-2">
       ${tagsArray[i]}
     </li>
       `;
    }

    temp=`<div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h3>${meal.strMeal}</h3>
      </div>
      <div class="col-md-8">
        <h2>instructions</h2>
        <p>${meal.strInstructions}
        </p>
        <h3 class="fw-bolder">Area : <span>${meal.strArea}</span> </h3>
        <h3 class="fw-bolder">Category : <span>${meal.strCategory}</span></h3>
        <h3 class="fw-bolder">Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
         ${recipes}
         </ul>
        <h3 class="fw-bolder">Tags :</h3>
        <ul class="list-unstyled d-flex g-3">
        ${tags}</ul>
        <div> 
          <a  target="_blank" href="${meal.strSource}" class="btn btn-success">source</a>
          <a  target="_blank" href="${meal.strYoutube}" class="btn btn-danger">youtube</a>
        </div
      </div>`
    document.getElementById('rowData').innerHTML=temp;
}
 // category section
async function category(){
    let Data= await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let dataname=await Data.json()
    console.log(dataname.categories)
    displaycategory (dataname.categories)

}
function displaycategory(dataname){
    temp=""
    for (let i = 0; i <dataname.length; i++) {
        temp+=`<div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer"onclick="getmealbycategory('${dataname[i].strCategory}')">
                <img class="w-100" src="${dataname[i].strCategoryThumb}" >
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${dataname[i].strCategory}</h3>
                    <p>${dataname[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>`    
    }
    document.getElementById('rowData').innerHTML=temp;
}
async function getmealbycategory(category){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let dataname=await Data.json()
    displayName (dataname.meals)
}
document.getElementById('categorybtn').addEventListener('click', category);

 // area section
async function getArea(){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let dataname=await Data.json()
    console.log(dataname.meals)
    displayArea(dataname.meals)

}
function displayArea(dataname){
    temp=""
    for (let i = 0; i <dataname.length; i++) {
        temp+=`<div class="col-md-3 text-center text-white">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <div class="rounded-2 text-center cursor-pointer " onclick="getmealbyarea('${dataname[i].strArea}')"><h3>${dataname[i].strArea}</h3></div>
      </div>`    
    }
    document.getElementById('rowData').innerHTML=temp;
}
 // get meal by area
async function getmealbyarea(area){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let dataname=await Data.json()
    displayName (dataname.meals)
}
document.getElementById('areatbtn').addEventListener('click', getArea);
// ingradent section
async function getIngredients(){
    let Data= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let dataname=await Data.json()
    console.log(dataname.meals)
    displayIngredients(dataname.meals.slice(0, 20))
}
function displayIngredients(dataname){
    temp=""
    for (let i = 0; i <dataname.length; i++) {
        temp+=`<div class="col-md-3 text-center text-white" onclick="getmealbyingradent('${dataname[i].strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${dataname[i].strIngredient}</h3>
        <p class="text-center">${dataname[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
      </div>`    
    }
    document.getElementById('rowData').innerHTML=temp;
}
async function getmealbyingradent(ingradent){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingradent}`)
    let dataname=await Data.json()
    displayName (dataname.meals)
}
document.getElementById('ingradentbtn').addEventListener('click', getIngredients);

// search section
function search(){
    rowData.innerHTML= `<div class="row py-4 ">
        <div class="col-md-6 ">
            <input class="text-white form-control bg-transparent "onkeyup="searchbyname(this.value)" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input maxlength="1" class=" text-white form-control bg-transparent" onkeyup="searchbyfristletter(this.value)" type="text" placeholder="Search By First Letter">
        </div>
    </div> `
}
async function searchbyname(item){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
    let dataname=await Data.json()
    displayName (dataname.meals)
}
async function searchbyfristletter(item){
    let Data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
    let dataname=await Data.json()
    item = item.length > 0 ? item.slice(0, 1) : "";
    displayName (dataname.meals)
}
document.getElementById('searchbtn').addEventListener('click', search);

// contact us section
document.addEventListener('DOMContentLoaded', function() {
    function contactus() {
        let temp = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center" id="rowData" >
    <div class="container w-75 text-center">
        <div class="row g-4" >
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
  </div> `;

        document.getElementById("rowData").innerHTML = temp;

        let userName = document.getElementById("nameInput");
        let userEmail = document.getElementById("emailInput");
        let userPhone = document.getElementById("phoneInput");
        let userAge = document.getElementById("ageInput");
        let userPassword = document.getElementById("passwordInput");
        let repassword = document.getElementById("repasswordInput");
        let nameAlert = document.getElementById('nameAlert');
        let emailAlert = document.getElementById('emailAlert');
        let phoneAlert = document.getElementById('phoneAlert');
        let ageAlert = document.getElementById('ageAlert');
        let passwordAlert = document.getElementById('passwordAlert');
        let repasswordAlert = document.getElementById('repasswordAlert');
        let submit = document.getElementById("submitBtn");

        function validateForm() {
            const isNameValid = nameValidation();
            const isEmailValid = emailValidation();
            const isPhoneValid = phoneValidation();
            const isAgeValid = ageValidation();
            const isPasswordValid = passwordValidation();
            const isRepasswordValid = repasswordValidation();
            const isFormValid = isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid;
            submit.disabled = !isFormValid;
        }

        userName.addEventListener('keyup', validateForm);
        userEmail.addEventListener('keyup', validateForm);
        userPhone.addEventListener('keyup', validateForm);
        userAge.addEventListener('keyup', validateForm);
        userPassword.addEventListener('keyup', validateForm);
        repassword.addEventListener('keyup', validateForm);

        function nameValidation() {
            let validateName = /^[a-zA-Z ]+$/.test(userName.value);
            nameAlert.classList.toggle('d-none', validateName);
            return validateName;
        }

        function emailValidation() {
            let validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value);
            emailAlert.classList.toggle('d-none', validateEmail);
            return validateEmail;
        }

        function phoneValidation() {
            let validatePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value);
            phoneAlert.classList.toggle('d-none', validatePhone);
            return validatePhone;
        }

        function ageValidation() {
            let validateAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(userAge.value);
            ageAlert.classList.toggle('d-none', validateAge);
            return validateAge;
        }

        function passwordValidation() {
            let validatePassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(userPassword.value);
            passwordAlert.classList.toggle('d-none', validatePassword);
            return validatePassword;
        }

        function repasswordValidation() {
            let repasswordVal = repassword.value == userPassword.value;
            repasswordAlert.classList.toggle('d-none', repasswordVal);
            return repasswordVal;
        }
    }
    document.getElementById('contactusbtn').addEventListener('click', contactus);
});
