var time = 30
var liflines = 10
var ans
var operations = ["+", "-", "*"]
function show() {
    setInterval(() => {
        time -= 1
        document.getElementById('time').innerHTML = time
    }, 1000)
    liflines = localStorage.getItem("lifelines") || 10
    localStorage.setItem("lifelines", liflines)
    document.getElementById("lifeline").innerHTML = localStorage.getItem("lifelines") || 10
    var first = Math.ceil(Math.random() * 50) + 1
    var sec = Math.ceil(Math.random() * 50) + 1
    var op = Math.floor(Math.random() * 3)
    document.getElementById("firstNum").innerHTML = first
    document.getElementById("secondNum").innerHTML = sec
    document.getElementById("operation").innerHTML = operations[op]
    ans = `${first} ${operations[op]} ${sec}`
    console.log(eval(ans));
}
show()


var enteredName = sessionStorage.getItem("enteredName");

if (!enteredName) {
    const namePopup = document.getElementById('namePopup');
    const userNameInput = document.getElementById('userName');
    const greet = document.getElementById('greet');

    function setName() {
        const userName = userNameInput.value;
        if (userName.trim() !== '') {
            greet.innerText = `Hello, ${userName} 👋`;
            greet.classList.remove('greet-hidden');
            namePopup.style.display = 'none';
            sessionStorage.setItem("enteredName", userName); // Store the name for this session
        }
    }

    const submitButton = document.querySelector('#namePopup button');
    submitButton.addEventListener('click', setName);

    namePopup.style.display = 'flex'; // Show the name popup initially
} else {
    // If the name has been entered previously, display it
    const greet = document.getElementById('greet');
    greet.innerText = `Hello, ${enteredName} 👋`;
    greet.classList.remove('greet-hidden');
}


function check(ans) {
    if (liflines > 0) {
        if (time > 0) {

            if (document.getElementById("answer").value.length > 0) {
                if (document.getElementById("answer").value == ans) {
                    liflines = Number(liflines) + 1
                    localStorage.setItem("lifelines", liflines)
                    Swal.fire('Correct Answer', '', 'success').then(()=>{
                        location.reload()
                    })
                }
                else {
                    liflines -= 1
                    localStorage.setItem("lifelines", liflines)
                    Swal.fire('Wrong', `The Correct answer was ${eval(ans)}`, 'error').then(()=>{
                        location.reload()
                    })
                }
            }
            else {
                Swal.fire('Type Something', '', 'info')
            }
        }
        else {
            Swal.fire('Time is Over', '', 'info')
        }
    }
    else {
        Swal.fire('Life Lines Finished', 'Got no more Life line Get some by watching ad', 'info')
    }
}

function skip() {
    if (liflines > 0) {
        liflines -= 1
        localStorage.setItem("lifelines", liflines)
        location.reload()
    }
    else {
        Swal.fire('Life Lines Finished', 'Got no more Life line Get some by watching ad', 'info')

    }
}


function upd() {
    if (liflines < 5) {
        let timerInterval
        Swal.fire({
            title: 'Dont Close',
            html: 'You will be rewarded in <b></b> seconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft() / 1000
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                localStorage.setItem("lifelines", 10)
                Swal.fire('+10', 'Life line increased successfully', 'success').then(() => {
                    location.reload()
                })
            }
        })
    }
    else{
        Swal.fire('YOu can do it', 'You can only use this option once your lifeline gets below 5', 'info')
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const namePopup = document.getElementById('namePopup');
    const userNameInput = document.getElementById('userName');
    const greet = document.getElementById('greet');

    function showPopup() {
        namePopup.style.display = 'flex';
    }

    function setName() {
        const userName = userNameInput.value;
        if (userName.trim() !== '') {
            greet.innerText = `Hello, ${userName} 👋`;
            greet.classList.remove('greet-hidden');
            namePopup.style.display = 'none';
            namePopupShown = true;
        }
    }

    const submitButton = document.querySelector('#namePopup button');
    submitButton.addEventListener('click', setName);
});


function checkTime() {
    if (time <= 0) {
        time = 30
        Swal.fire('Time is Over', '', 'info').then(() => {
            location.reload()
        })
    }
}
setInterval(checkTime, 1000)