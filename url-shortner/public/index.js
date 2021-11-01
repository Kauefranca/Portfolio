document.addEventListener("DOMContentLoaded", function() {
    setListeners();
});

function setListeners() {
    var btn = document.querySelector('.btn');
    document.querySelector('input.text-box').addEventListener('input', () => {
    var url = document.querySelector('input.text-box').value;
        if (!url) return btn.disabled = true;
        if (!isValidHttpUrl(url)) return btn.disabled = true;
        btn.disabled = false;
    });
}

function isValidHttpUrl(string) {
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
