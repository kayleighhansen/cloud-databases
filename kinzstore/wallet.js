// set the functionality of the clock in button
function clockIn() {
    myTimer = setInterval(myClock, 1000);
    var c = 0;

    // starts the timer, increase one second at a time
    function myClock() {
        document.getElementById("demo").innerHTML = ++c;
    }
}

// set the functionality of the clockout button
function clockOut(myTimer) {
    // stop the clock
    clearInterval(myTimer);

    // check to see how long you worked, convert to number
    var time = parseInt(document.querySelector("#demo").innerHTML);

    wallet += time;
    // set the contents of the wallet to reflect $1 every second of work
    document.querySelector("#wallet-contents").innerHTML = wallet;

    // push earnings to localStorage
    localStorage.setItem('wallet', wallet);
}

// set up the funationality of the wallet/timer
var myTimer;
var wallet = localStorage.getItem('wallet');
document.querySelector("#wallet-contents").innerHTML = wallet;

// check localStorage to see how much money you have
if (wallet) {
    console.log("Wallet Retrieved from LocalStore");
} else {
    console.log("Wallet Not Retrieved");
}