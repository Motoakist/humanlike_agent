
// openai.apiKey = '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';

// async function chatGpt() {
//     const prompt = 'Hello, how are you?';  // 質問文または会話の開始文
//     const maxTokens = 60;  // 出力される最大トークン数

//     const response = await openai.Completion.create({
//         engine: 'text-davinci-004',  // 使用するモデル
//         prompt: prompt,
//         max_tokens: maxTokens,
//     });

//     console.log(response.choices[0].text.stripLeading());
// }

// chatGpt();

const position = {
    boxWidth: 12000,
    // boxHeight: 700,
    boxHeight: 12000,
    // modelScale: 0.45,
    modelScale: 1,
    modelX: 700,
    // modelY: 500,
    modelY: 1700,
};

const serverURL = "https://a48e-2400-2651-41c2-1500-4405-5e59-5c98-3b57.jp.ngrok.io";
const debug = false;
const modelPath = "https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@39f3aed18d17f3ff893b842a2c5bef6e19af406e/Resources/Hiyori_free_2/hiyori_free_t08_2.model3.json";

const requiredResources = [
    "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
    "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
    "https://cdn.jsdelivr.net/gh/Motoakist/humanlike_agent@2fbbffa19e3d4af80d64c1c888c93d2eaa57937d/indexLibrary/indexLibrary.js",

];

const loadScript = (idx) => {
    console.log("Loading ", requiredResources[idx]);
    jQuery.getScript(requiredResources[idx], function () {
        if (idx + 1 < requiredResources.length) {
            loadScript(idx + 1);
        } 
        else {
            initExp();
        }
    });
};

const initExp = () => {
    //インスタンス作成＆DOMLoad操作
    console.log("ロード");
    indexLibrary = new IndexLibrary(debug, serverURL, modelPath, position);
    indexLibrary.onload();
    indexLibrary.set_limit(limit);
    
};

loadScript(0);




// https://q-az.net/elements-drag-and-drop/
// https://developer.mozilla.org/ja/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations

// const draggableElement = document.querySelector('p[draggable="true"]');

// draggableElement.addEventListener("dragstart", (event) =>
// event.dataTransfer.effectAllowed = "move"
// );


// https://blog.asial.co.jp/3739/
// DOM
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatSend = document.querySelector('#chat-send');
const messageContainer = document.querySelector('.messages');
const sendImg = document.querySelector('#send-img');
const loader = document.querySelector('.loader');

// OpenAI API
const OPENAI_MODEL = 'gpt-3.5-turbo'; // gpt-3.5-turbo, gpt-3.5-turbo-0301
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
// Input Your OpenAI API Key Here. 
// You can sign up and get API Key from here 
// https://platform.openai.com/account/api-keys
let apiKey = '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';
const messages = []; // store previous messages to remember whole conversation

// Function to add a chat message to the container
function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    // Scroll to the bottom of the chat container
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


// Function to handle user input
function handleUserInput(event) {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (message !== '') {
        messages.push({
            'role': 'user',
            'content': message
        });
        addMessage(message, true);
        chatInput.value = '';
        showLoader();
        // Other request body from here https://platform.openai.com/docs/api-reference/chat/create
        fetch(OPENAI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({ 
                'model': OPENAI_MODEL,
                'messages': messages
            })
        })
        .then(response => response.json())
        .then(data => {
            hideLoader();
            const responseMessage = data.choices[0].message;
            addMessage(responseMessage.content, false);
            messages.push(responseMessage);
        })
        .catch(() => {
            hideLoader();
            addMessage('Oops! Something went wrong. Please try again later.', false);
        });
    }
}


// Function to show the loader icon
function showLoader() {
    loader.style.display = 'inline-block';
    chatSend.disabled = true;
}

// Function to hide the loader icon
function hideLoader() {
    loader.style.display = 'none';
    chatSend.disabled = false;
}

// Ask user to input his/her API Key
function checkAPIKey() {
    if (!apiKey) apiKey = prompt('Please input OpenAI API Key.');
    if (!apiKey) alert('You have not entered the API Key. The application will not work.');
}

// Add an event listener to the form
chatForm.addEventListener('submit', handleUserInput);

// check
checkAPIKey();