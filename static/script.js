const startButton = document.getElementById('start_button');
const stopButton = document.getElementById('stop_button');
const textarea = document.getElementById('text_input');
let recognition;

// Initialize SpeechRecognition
try {
    recognition = new window.webkitSpeechRecognition();
} catch (e) {
    console.error('Speech recognition not supported.', e);
}

if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        console.log('Speech recognition started.');
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
    };

    recognition.onend = function() {
        console.log('Speech recognition stopped.');
        startButton.style.display = 'inline-block';
        stopButton.style.display = 'none';
    };

    recognition.onresult = function(event) {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('\n');

        textarea.value = transcript;
    };

    startButton.addEventListener('click', function() {
        recognition.start();
    });

    stopButton.addEventListener('click', function() {
        recognition.stop();
    });
}

// Function to toggle popup table visibility
function togglePopup() {
    const popup = document.getElementById('popupTable');
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

function closePopup() {
    document.getElementById("popupTable").style.display = "none";
}

