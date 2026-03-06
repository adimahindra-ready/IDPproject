
function uploadImage(){

let file = document.getElementById("imageInput").files[0]

let formData = new FormData()
formData.append("image", file)

fetch("/upload",{
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{

document.getElementById("result").innerHTML =
`Crop: ${data.crop}<br>
Disease: ${data.disease}<br>
Confidence: ${data.confidence}<br>
Treatment: ${data.treatment}`

speak(data.treatment)

})

}

function startVoice(){

const recognition = new webkitSpeechRecognition()

recognition.onresult = function(event){

let text = event.results[0][0].transcript
document.getElementById("question").value = text

}

recognition.start()

}

function speak(text){

let speech = new SpeechSynthesisUtterance(text)
speech.lang = "en-IN"
speechSynthesis.speak(speech)

}

function getWeather(){

fetch("https://api.open-meteo.com/v1/forecast?latitude=26.2&longitude=73.0&current_weather=true")
.then(res=>res.json())
.then(data=>{

document.getElementById("weather").innerHTML =
"Temperature: " + data.current_weather.temperature + "°C"

})

}

function askQuestion(){

let q = document.getElementById("question").value

fetch("/ask",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({question:q})
})
.then(res=>res.json())
.then(data=>{

document.getElementById("answer").innerHTML = data.answer
speak(data.answer)

})

}
