from fastapi import FastAPI, HTTPException, Form, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from pyzbar.pyzbar import decode
from PIL import Image
import uvicorn
import io

app = FastAPI()


@app.get("/", response_class=HTMLResponse)
async def read_root():
  html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>QR Code Scanner</title>
        <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    </head>
    <body>
        <div id="reader" style="width:500px;height:500px;"></div>
        <script>
            function onScanSuccess(decodedText, decodedResult) {
                console.log(`Code matched = ${decodedText}`, decodedResult);
                alert(`Code matched = ${decodedText}`);
            }

            var html5QrcodeScanner = new Html5QrcodeScanner(
                "reader", { fps: 10, qrbox: 250 }, false);
            html5QrcodeScanner.render(onScanSuccess);
        </script>
    </body>
    </html>
    """
  return HTMLResponse(content=html_content)


@app.post("/scan-qr/")
async def scan_qr(file: UploadFile = File(...)):
  try:
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
  except IOError as e:
    raise HTTPException(
        status_code=400,
        detail="Cannot open image. Make sure the file is an image.")
  try:
    decoded_objects = decode(image)
    if decoded_objects:
      return {"data": [obj.data.decode() for obj in decoded_objects]}
    else:
      return {"data": []}
  except Exception as e:
    raise HTTPException(status_code=500, detail="Failed to decode QR code.")


if __name__ == "__main__":
  uvicorn.run(app, host="0.0.0.0", port=8000)
