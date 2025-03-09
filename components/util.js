'use strict';

let toastActive = false;

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function decryptUrl(encryptedUrl, key) {
    const decoded = atob(encryptedUrl);
    let result = '';
    
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    
    return result;
}

function showToast(msg, icon = '') {
    if (toastActive) return;

    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerHTML = icon ? `<i class="${icon}"></i> ${msg}` : msg;
    toast.classList.add('show');
    
    toastActive = true;

    setTimeout(() => {
        toast.classList.remove('show');
        toastActive = false;
    }, 3000);
}
