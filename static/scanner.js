function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('reader').style.backgroundColor = 'green';
    setTimeout(() => document.getElementById('reader').style.backgroundColor = '', 3000);
}
function onScanError(errorMessage) {
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", { 
    fps: 10, 
    qrbox: 600,
    rememberLastUsedCamera: true, 
    aspectRatio: 1.777
});
html5QrcodeScanner.render(onScanSuccess, onScanError);

function ping(timeStart) {
    const timeEnd = performance.now();
    const ping = timeEnd - timeStart;
    document.getElementById('ping-value').innerText = `Пинг: ${Math.round(ping)} мс`;
    setTimeout(() => ping(performance.now()), 2000);
}

function updateMoscowTime() {
    const moscowTimeOffset = 3;
    const localTime = new Date();
    const moscowTime = new Date(localTime.getTime() + moscowTimeOffset * 3600 * 1000);
    document.getElementById('moscow-time').innerText = `МСК время: ${moscowTime.toISOString().split('T')[1].slice(0, 8)}`;
    setTimeout(updateMoscowTime, 1000);
}

function saveScanResult(decodedText) {
    fetch('/scan-qr/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: decodedText }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('reader').style.backgroundColor = 'green';
    setTimeout(() => document.getElementById('reader').style.backgroundColor = '', 3000);
    saveScanResult(decodedText);
}

function updateCameraDetails(details) {
    const detailsElement = document.getElementById('camera-details');
    detailsElement.className = "alert alert-info";
    detailsElement.innerHTML = '<h4>Детали камеры:</h4>' + '<p id="moscow-time">МСК время: Вычисляется...</p>';
    if(details) {
        detailsElement.innerHTML += `<p>ID: ${details.id}</p>`;
        detailsElement.innerHTML += `<p>Название: ${details.label}</p>`;
        detailsElement.innerHTML += `<p>Разрешение: ${details.resolution.width} x ${details.resolution.height}</p>`;
        detailsElement.innerHTML += '<p id="ping-value">Пинг: Вычисляется...</p>';
        ping(performance.now());
        updateMoscowTime();
    } else {
        detailsElement.innerHTML += '<p>Детали недоступны</p>';
    }
}

Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        const camera = devices[0];
        updateCameraDetails({
            id: camera.id,
            label: camera.label,
            resolution: { width: 'N/A', height: 'N/A' },
        });
    }
}).catch(err => {
    console.error("Ошибка получения камер:", err);
    const detailsElement = document.getElementById('camera-details');
    detailsElement.className = "alert alert-danger";
    detailsElement.innerHTML = `<h4>Ошибка:</h4> <p>Запрашиваемое устройство не найдено. Пожалуйста, убедитесь, что к вашему устройству подключена камера и предоставлены разрешения на доступ к камере.</p>`;
});
