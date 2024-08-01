document.addEventListener('DOMContentLoaded', function() {
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const jsEditor = document.getElementById('js-editor');
    const renderButton = document.getElementById('render-button');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const outputContainer = document.getElementById('output-container');
    let isFullscreen = false;

    renderButton.addEventListener('click', () => {
        const outputFrame = document.createElement('iframe');
        outputFrame.style.width = "100%";
        outputFrame.style.height = "100%";
        outputFrame.style.border = "none";
        
        const htmlCode = htmlEditor.value;
        const cssCode = cssEditor.value;
        const jsCode = jsEditor.value;

        const fullHTML = `
            <html>
                <head>
                    <style>
                        ${cssCode}
                    </style>
                </head>
                <body>
                    ${htmlCode}
                    <script>
                        ${jsCode}
                    </script>
                </body>
            </html>
        `;

        outputFrame.srcdoc = fullHTML;

        outputContainer.innerHTML = '';
        outputContainer.appendChild(outputFrame);
    });

    htmlEditor.addEventListener('keydown', (e) => {
        if (e.keyCode === 9) { // Tab key
            e.preventDefault();
            const start = htmlEditor.selectionStart;
            const end = htmlEditor.selectionEnd;
            htmlEditor.value = htmlEditor.value.substring(0, start) + '\t' + htmlEditor.value.substring(end);
            htmlEditor.setSelectionRange(start + 1, start + 1);
        }
    });

    fullscreenButton.addEventListener('click', () => {
        toggleFullscreen();
    });

    function toggleFullscreen() {
        if (!isFullscreen) {
            if (outputContainer.requestFullscreen) {
                outputContainer.requestFullscreen();
            } else if (outputContainer.webkitRequestFullscreen) { /* Safari */
                outputContainer.webkitRequestFullscreen();
            } else if (outputContainer.msRequestFullscreen) { /* IE11 */
                outputContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
        isFullscreen = !isFullscreen;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const outputContainer = document.getElementById('output-container');
    let tapCount = 0;
    let tapTimeout;

    outputContainer.addEventListener('touchstart', function(event) {
        if (tapTimeout) clearTimeout(tapTimeout);
        if (tapCount === 0) {
            tapTimeout = setTimeout(function() {
                tapCount = 0;
            }, 300); // Set the timeout to clear tap count after 300 milliseconds
        }
        tapCount++;
        if (tapCount === 3) {
            exitFullscreen();
            tapCount = 0;
        }
    });

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
});
