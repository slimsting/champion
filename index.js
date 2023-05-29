import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-76a3a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("textarea-el")
const buttonEl = document.getElementById("btn")
const endorsementListEl = document.getElementById("ul-el")


buttonEl.addEventListener("click", function(){
    
    let inputValue = inputFieldEl.value
    
    push(endorsementsInDB, inputValue)
    // appendEndorsementToList(inputValue)
    
    clearInputField()
    
})

onValue(endorsementsInDB, function(snapshot){
    // retreive all endorsements from the db as an object (if they exist)then convert it to an array to make it easy to work with
    if (snapshot.exists()){
        clearUlEl()
        let endorsementsArray = Object.entries(snapshot.val())
        //iterate through the array and append the value of each endorsement to endorsementListEl
        for (let i = 0; i < endorsementsArray.length; i++ ){
            let currentEndorsement = endorsementsArray[i]
            let currentEndorsementID = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]
            
            appendEndorsementToList(currentEndorsement) 
        }  
    }else{
        endorsementListEl.innerHTML = "No endorsements yet!!"
    }
      
})

function clearUlEl(){
    endorsementListEl.innerHTML = ""
}

function clearInputField(){
    inputFieldEl.value = ""
}

function appendEndorsementToList(item){
    let itemValue = item[1]
    let itemID = item[0]
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue    
    endorsementListEl.append(newEl)
    
    newEl.addEventListener("dblclick", function(){
        
        let exactLocationOfEndorsementInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationOfEndorsementInDB)
    })
}