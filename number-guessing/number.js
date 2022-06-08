/* 
Game Rules 
-Player must guess a number between min and max
-Player has 3 Guesses
*/

let min = 1,
    max = 10,
    winningNum = randomNumBetweenMinMax(min,max);
    guessesLeft =3;

function randomNumBetweenMinMax(min,max) {

    return (Math.floor((Math.random()*( max-min+1)))+min)
}
console.log(winningNum);
//UI Elements

const gameWrapper= document.querySelector('#game'),
        submitBtn = document.querySelector('#guess-btn'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessInput = document.querySelector('#guess'),
        uiMessage = document.querySelector('#message-span')

//Game rules assignment
minNum.textContent=min;
maxNum.textContent=max;

//set message
const setMessage = (message, color) => {
    uiMessage.style.backgroundColor = color;
    uiMessage.textContent = message;
}

//submit handler
const submitHandler = () => {
    let guess = parseInt(guessInput.value)

    if ( isNaN(guess) || guess < min || guess > max) {
        setMessage(`Enter a number between ${min} and ${max}`,'red')  
    } else {
        
            if (guess === winningNum) {
                // guessInput.disabled = true; 
                // guessInput.style.borderColor='green'
                // setMessage(`You won! The number was ${winningNum}`, 'green')
                gameOver(true,`You won! The number was ${winningNum}`)

            } else {
                guessesLeft -= 1  ;
                //you lost
                if (guessesLeft === 0) {
                    // guessInput.disabled = true; 
                    // guessInput.style.borderColor='red'
                    // setMessage(`Sorry you ran out of guesses. The correct number was ${winningNum}`, 'red')
                    gameOver(false,`Sorry you ran out of guesses. The correct number was ${winningNum}`)
                } else {
                    //remaining guesses
                    setMessage(`${guess} Is Wrong. ${guessesLeft} Guess Left`,'blue')
                    guessInput.value = ''
                }
            }
    }

    
}

//Game Over Function

const gameOver = (winBool,message) => {
    guessInput.disabled = true; 
    
    let color;
    winBool? color= 'green' : color ='red';
    
    guessInput.style.borderColor= color
    setMessage(message,color)

    //playing again
    submitBtn.value = 'Play Again?'
    submitBtn.className += 'play-again'
    
}

const playAgainPress = (e) => {
    
    if (e.target.classList.contains('play-again')){
        window.location.reload()
    }
}


//listen for submit
gameWrapper.addEventListener('mousedown',playAgainPress)
submitBtn.addEventListener('click',submitHandler)
