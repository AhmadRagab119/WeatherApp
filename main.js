
let addCity =document.querySelector(".add-city");
let getLocation =document.querySelector(".get-location");
let conatiner =document.querySelector(".container");
let tempmain = document.querySelector(".weather-part .temp .number")
let Mainweather = document.querySelector(".weather-part .wather")
let loc = document.querySelector(".weather-part .location span")
let back = document.querySelector("header i")
let Feels = document.querySelector(".weather-part .column-feels  .number")
let Humidity = document.querySelector(".weather-part .column-humidity  .number")
let webIcon = document.querySelector(".weather-part img ")


let api;
let apiKey =`98dd7a87659809144048457650852078`

addCity.addEventListener("keyup",(e)=>{
    if(e.key ==="Enter" && addCity.value !=""){
        FetchApi(addCity.value)
         addCity.value ="";
    }
   
})

getLocation.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucces,onError)
    } else {
        alert("Your browser not Support geolocation api ")
    }
})

function onSucces (position){
    let {latitude ,longitude} = position.coords
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
     FitchData()
}


function onError (error){
}

function FetchApi(city){
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
     FitchData()
}

function FitchData(){
    fetch(api).then(res=>res.json()).then((result)=> weatherDetailes(result))
}
function weatherDetailes(info){
    if(info.cod == "404"){
        alert("this Not vaild City")
    } else {
    conatiner.classList.add("active")
    let city = info.name
    let country = info.sys.country
    let {description,id} = info.weather[0]
    let {feels_like,humidity,temp} = info.main
         if(id == 800){
            webIcon.src = "clear.svg";
        }else if(id >= 200 && id <= 232){
            webIcon.src = "storm.svg";  
        }else if(id >= 600 && id <= 622){
            webIcon.src = "snow.svg";
        }else if(id >= 701 && id <= 781){
            webIcon.src = "haze.svg";
        }else if(id >= 801 && id <= 804){
            webIcon.src = "cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            webIcon.src = "rain.svg";
        }


        tempmain.innerText =Math.floor(temp)
        Mainweather.innerText =description
        loc.innerText =`${city},${country}`
        
        Feels.innerText=Math.floor(feels_like)
        Humidity.innerHTML = `${humidity}%`

    }
    console.log(info)
}


back.addEventListener("click",()=>{
    conatiner.classList.remove("active")
})