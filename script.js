

gsap.from(".logo > h1", 0.8, {
  delay: 0.2,
  opacity: 0,
  x: -20,
  ease: Expo.easeInOut
});

gsap.from("#menu-btn", 0.8, {
  delay: 0.3,
  opacity: 0,
  x: -20,
  ease: Expo.easeInOut
});

gsap.from(".nav-link > a", 1.2, {
  delay: 0.4,
  opacity: 0,
  stagger: 0.2,
  x: -20,
  ease: Expo.easeInOut
});

gsap.from(".scroll__down > span", 1.2, {
  delay: 2,
  opacity: 0,
  stagger: 0.2,
  y: 20, // Change x to y
  ease: Expo.easeInOut
});

gsap.from("img", 2.2, {
  delay: 0.6,
  opacity: 0,
  y: 80,
  ease: Power4.easeInOut
});
gsap.from(".circle", 2.2, {
  delay: 0.6,
  opacity: 0,
  y: 80,
  ease: Power4.easeInOut
});

gsap.from("p", 2.2, {
  delay: 0.8,
  opacity: 0,
  y: 80,
  ease: Power4.easeInOut
});

gsap.from(".social-media-container > *", 1, {
  delay: 1.2,
  opacity: 0,
  stagger: 0.2,
  x: -20,
  ease: Expo.easeInOut
});

gsap.from(".portfolio-text-container > *", 1.6, {
  delay: .2,
  opacity: 0,
  stagger: 0.2,
  y: 80,
  ease: Power4.easeInOut
});


$("#menu-btn").click(function(e){
  e.preventDefault();

  if ($(".nav-link").css("display") === "none") {
    $(".nav-link").css("display", "flex");
    $(this).removeClass("fa-bars").addClass("fa-times");
  }
  else{
    $(".nav-link").css("display", "none");
    $(this).removeClass("fa-times").addClass("fa-bars");
  }
});

$(window).resize(function(){
  winWidth = $(window).width();
  if(winWidth > 760){
    $(".nav-link").css("display", "flex");
  }
  if(winWidth <= 760 && ($("#menu-btn").hasClass("fa-bars"))){
    $(".nav-link").css("display", "none");
  }
});

// JavaScript code to handle the modal
$(document).ready(function() {

  $('#openModal').click(function() {
    $('#myModal').css('display', 'block');
  });

  $('.modal-close, .modal').click(function() {
    $('#myModal').css('display', 'none');
  });

  $('.modal-content').click(function(e) {
    e.stopPropagation();
  });
});

// Modal section

const section = document.querySelector("section"),
        overlay = document.querySelector(".overlay"),
        showBtn = document.querySelector(".show-modal"),
        closeBtn = document.querySelector(".close-btn");
      showBtn.addEventListener("click", () => section.classList.add("active"));
      overlay.addEventListener("click", () =>
        section.classList.remove("active")
      );
      closeBtn.addEventListener("click", () =>
        section.classList.remove("active")
      );


// preload

window.addEventListener('DOMContentLoaded', function() {
  var loader = document.getElementById('loader');

  setTimeout(function() {
    loader.style.display = 'none';
  }, 3000);
});


// Download function

function downloadPDF() {
  var link = document.createElement('a');
  link.href = 'https://drive.google.com/file/d/1fjXF51e-CzrT_CsYs0OJmZCIrcqn2Irn/view?usp=sharing';
  link.target = '_blank';
  link.download = 'IvanJoshuaMereteResume.pdf';
  link.click();
}
var downloadButton = document.getElementById('download-btn');
downloadButton.addEventListener('click', downloadPDF);



// cursor

jQuery(document).ready(function ($) {
  function Cursor(cursor, pointer) {
      cursor.css({
          opacity: 1
      });
      pointer.css({
          opacity: 1
      });
      $(document).bind('mousemove', function (e) {
        if ($(e.target).hasClass('nav-link') || $(e.target).closest('.nav-link').length > 0 || $(e.target).hasClass('social-media-container') || $(e.target).closest('.social-media-container').length > 0 || $(e.target).hasClass('chatbot-toggler') || $(e.target).closest('.chatbot-toggler').length > 0) {
              $(cursor).addClass('zoom');
          } else {
              $(cursor).removeClass('zoom');
          }
          cursor.css({
              left: e.pageX,
              top: e.pageY
          });
          pointer.css({
              left: e.pageX,
              top: e.pageY
          });
      });
  }

  function destroyCursor(cursor, pointer) {
      cursor.css('opacity', '0');
      pointer.css('opacity', '0');
      //$(document).unbind('mousemove');
  }

  $(document).mouseleave(function () {
      destroyCursor($('#cursor'), $('#pointer'));
  });

  $(document).mouseenter(function () {
      Cursor($('#cursor'), $('#pointer'));
  });

  $(document).on('click', function (e) {
      $('#cursor').css('animation', 'cursorClick 700ms');
      setTimeout(() => {
          $('#cursor').css('animation', '')
      }, 700);
  });

  Cursor($('#cursor'), $('#pointer'));

  $('.show-modal').on('click', function () {
      $(this).toggleClass('scroll');
  });
});

// chatbot

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";
const InputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and classname
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p>}</p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
}

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "this morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "this afternoon";
  } else {
    return "tonight";
  }
};

const generateResponse = (incomingChatLI) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLI.querySelector("p");

  const requestOptions = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: userMessage}]
    })
  }
//send post request to api , get response
  fetch(API_URL,  requestOptions).then(res => res.json()).then(data => {
    messageElement.textContent = data.choices[0].message.content;
  }).catch((error) => {
    messageElement.classList.add("error");
    messageElement.textContent = "Oops! Something went wrong. Please try again.";
  }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if(!userMessage) return;
  chatInput.value ="";

  //append users message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    //display typing message while response wiating
    const incomingChatLI = createChatLi("Typing...", "incoming")
    chatbox.appendChild(incomingChatLI);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLI);
  }, 600);
}


chatInput.addEventListener("input", () => {
  //adjust textarea
  chatInput.style.height = `${InputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
sendChatBtn,addEventListener("click", handleChat);

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

// Add an event listener to handle chat when the Enter key is pressed
chatInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  } else if (event.keyCode === 13 && event.shiftKey) {
    chatInput.value += "\n";
  }
});


function updateTimeGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const greetingElement = document.getElementById("greeting");
  if (currentHour >= 0 && currentHour < 12) {
    greetingElement.innerHTML = "Hi there<br>How can I help you this morning?";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingElement.innerHTML = "Hi there<br>How can I help you this afternoon?";
  } else {
    greetingElement.innerHTML = "Hi there<br>How can I help you tonight?";
  }
}

updateTimeGreeting();

// const toggle = document.getElementById('toggleDark');
// const body = document.querySelector('body');

// toggle.addEventListener('click', function(){
//   this.classList.toggle('bi-moon-fill');
//   if(this.classList.toggle('bi bi-brightness-high-fill')) {
//     body.style.background = 'white';
//     body.style.color = 'black';
//     body.style.transition = '2s';
//   }else {
//     body.style.background = 'black';
//     body.style.color = 'white';
//     body.style.transition = '2s';
//   }
// })

// Function to toggle between light and dark themes
// function toggleTheme() {
//   const body = document.body;
//   body.classList.toggle('dark');
//   const theme = body.classList.contains('dark') ? 'dark' : 'light';
//   localStorage.setItem('theme', theme); // Save the theme preference in localStorage
// }

// // Check the saved theme preference in localStorage on page load
// document.addEventListener('DOMContentLoaded', function () {
//   const savedTheme = localStorage.getItem('theme');
//   if (savedTheme) {
//     document.body.classList.add(savedTheme);
//   }
// });

// // Example: Add a button or any element to trigger the theme toggle
// const themeToggleBtn = document.getElementById('theme-toggle-btn');
// if (themeToggleBtn) {
//   themeToggleBtn.addEventListener('click', toggleTheme);
// }

document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  // Check if the user has a preference stored
  const currentTheme = localStorage.getItem("theme");

  // Set the theme based on user preference or default to light
  if (currentTheme) {
      document.body.classList.add(currentTheme);
      updateThemeIcon(currentTheme);
  } else {
      document.body.classList.add("light");
      updateThemeIcon("light");
  }

  // Function to update the theme icon
  function updateThemeIcon(theme) {
      const iconClass = theme === "dark" ? "bi-moon-fill" : "bi-brightness-high-fill";
      themeToggleBtn.classList.remove("bi-brightness-high-fill", "bi-moon-fill");
      themeToggleBtn.classList.add(iconClass);
  }

  // Toggle between light and dark themes
  themeToggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");

      // Save user preference
      const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      // Update the theme icon
      updateThemeIcon(newTheme);
  });
});
