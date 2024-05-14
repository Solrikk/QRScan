function onScanSuccess(decodedText, decodedResult) {
    console.log(`Код распознан = ${decodedText}`, decodedResult);
    alert(`Код распознан = ${decodedText}`);
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
}
function updateCameraDetails(details) {
    const detailsElement = document.getElementById('camera-details');
    detailsElement.className = "alert alert-info";
    detailsElement.innerHTML = '<h4>Детали камеры:</h4>';
    if(details) {
        detailsElement.innerHTML += `<p>ID: ${details.id}</p>`;
        detailsElement.innerHTML += `<p>Название: ${details.label}</p>`;
        detailsElement.innerHTML += `<p>Разрешение: ${details.resolution.width} x ${details.resolution.height}</p>`;
        detailsElement.innerHTML += '<p id="ping-value">Пинг: Вычисляется...</p>';
        const timeStart = performance.now();
        ping(timeStart);
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
