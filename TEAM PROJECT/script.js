const quotes = [
    "Believe in yourself and all that you are.",
    "Your only limit is your mind.",
    "Every day is a new opportunity to grow and improve.",
    "Stay positive, work hard, and make it happen.",
    "Dream big, work hard, stay focused, and surround yourself with good people.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Do what you can, with what you have, where you are.",
    "Don't watch the clock; do what it does. Keep going.",
    "You are capable of amazing things!",
    "Great things never come from comfort zones."
];

function getRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").textContent = quotes[randomIndex];

    // Save quote to localStorage so it stays the same for the day
    localStorage.setItem("dailyQuote", quotes[randomIndex]);
    localStorage.setItem("quoteDate", new Date().toDateString());
}

// Load stored quote or generate a new one for the day
document.addEventListener("DOMContentLoaded", function () {
    let storedQuote = localStorage.getItem("dailyQuote");
    let storedDate = localStorage.getItem("quoteDate");
    let todayDate = new Date().toDateString();

    if (storedQuote && storedDate === todayDate) {
        document.getElementById("quote").textContent = storedQuote;
    } else {
        getRandomQuote();
    }
});
