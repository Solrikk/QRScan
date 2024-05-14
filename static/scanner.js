function onScanSuccess(decodedText, decodedResult) {
    console.log(`Код распознан = ${decodedText}`, decodedResult);
    alert(`Код распознан = ${decodedText}`);
}
function onScanError(errorMessage) {
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: 250,
    rememberLastUsedCamera: true
});
html5QrcodeScanner.render(onScanSuccess, onScanError);

function ping(timeStart) {
    const timeEnd = performance.now();
    document.getElementById('ping-value').innerText = `Пинг: ${Math.round(timeEnd - timeStart)} мс`;
    setTimeout(() => ping(performance.now()), 2000);
}
function updateCameraDetails(details) {
    const detailsElement = document.getElementById('camera-details');
    detailsElement.className = "alert alert-info";
    detailsElement.innerHTML = '<h4>Детали камеры:</h4>' + 
        `<p>ID: ${details.id}</p>` + 
        `<p>Название: ${details.label}</p>` + 
        `<p>Разрешение: ${details.resolution.width} x ${details.resolution.height}</p>` + 
        '<p id="ping-value">Пинг: Вычисляется...</p>';
    ping(performance.now());
}

function updateScreenSizeDetails() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenSizeElement = document.getElementById('screen-size');
    screenSizeElement.innerText = `Размер экрана: ${width} x ${height}`;
}

window.onload = function() {
    updateScreenSizeDetails();
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            updateCameraDetails({
                id: devices[0].id,
                label: devices[0].label,
                resolution: { width: 'N/A', height: 'N/A' }
            });
        }
    }).catch(err => {
        console.error("Ошибка получения камер:", err);
        const detailsElement = document.getElementById('camera-details');
        detailsElement.className = "alert alert-danger";
        detailsElement.innerHTML = `<h4>Ошибка:</h4> <p>Запрашиваемое устройство не найдено. Пожалуйста, убедитесь, что к вашему устройству подключена камера и предоставлены разрешения на доступ к камере.</p>`;
    });
};

window.onresize = updateScreenSizeDetails;
