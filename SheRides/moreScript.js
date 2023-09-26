const textbox = document.getElementById('text');
textbox.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) { 
        event.preventDefault(); // prevent the form from submitting normally
        const text = textbox.value;
        const url = `map.html?text=${encodeURIComponent(text)}`;
        window.location.href = url;
    }
});
