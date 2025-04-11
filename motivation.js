let quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "The hard days are what make you stronger.",
    "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
    "Dream it. Wish it. Do it."
  ];
  
  function getRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote").textContent = quote;
  }
  
  function speakQuote() {
    const quote = document.getElementById("quote").textContent;
    const utterance = new SpeechSynthesisUtterance(quote);
  
    // Get available voices and pick a female one if available
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice =>
      voice.name.toLowerCase().includes("female") ||
      voice.name.toLowerCase().includes("samantha") ||
      voice.name.toLowerCase().includes("karen") ||
      voice.name.toLowerCase().includes("zira")
    );
  
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
  
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  }
  
  // Ensure voices are loaded
  window.speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
  
  function likeQuote() {
    const quote = document.getElementById("quote").textContent;
    let liked = JSON.parse(localStorage.getItem("likedQuotes")) || [];
  
    if (!liked.includes(quote)) {
      liked.push(quote);
      localStorage.setItem("likedQuotes", JSON.stringify(liked));
      alert(" Quote liked!");
    } else {
      alert("You've already liked this quote.");
    }
  }
  
  function submitCustomQuote() {
    const newQuote = prompt("Enter your motivational quote:");
    if (newQuote) {
      quotes.push(newQuote);
      alert("Thanks! Your quote has been added.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", getRandomQuote);