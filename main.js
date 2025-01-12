const defualtAttributeScores = [15,14,13,12,10,8]

class Player {

    constructor(characterName = "Ash"){
        this.name = characterName;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }

        let shuffledResult = shuffleArray(defualtAttributeScores)
        for (const [key,value] of Object.entries(this.attributes)){
            let attributeValue = shuffledResult.pop()
            this.attributes[key] = attributeValue
        }
    }

    rollAttributes(){
        for(const key in this.attributes){
            //console.log("rolling for " + key)
            let results = diceRoller(4, 6)
            results.sort(function(a,b){return a - b})
            results.shift()
            let sum = sumArray(results)
            this.attributes[key] = sum
        }
    }

    printPlayer(){
        console.log(`Name: ${this.name}`)
        for(const [key, value] of Object.entries(this.attributes)){
            console.log(`${key.slice(0,3).toUpperCase()}: ${value}`)
        }
    }
}

// Fisher-Yates algorithm for randomly sorting an array
// from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to return a new (non-mutated) array
function shuffleArray(target){
    let shuffled = Array.from(target)
    for(let i = shuffled.length - 1; i>0; i--){
        const j = Math.floor(Math.random()* (i+1))
        const temp = shuffled[i]
        shuffled[i] = shuffled[j]
        shuffled[j] = temp
    }
    return shuffled
}

function diceRoller(times, sides){
    let results = []
    for (let i = 0; i < times; i++) {
        results.push(Math.floor(Math.random()* sides + 1))
    }
    return results
}

function sumArray(array){
    return array.reduce((total, currentNum) => total + currentNum)
}

const player01 = new Player()
player01.printPlayer()
const player02 = new Player('Vegeta')
player02.rollAttributes()
player02.printPlayer()

