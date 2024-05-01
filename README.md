<div align="center">
  <img src="https://github.com/Solrikk/QRScan/blob/main/assets/pictures/props-ar-app-and-digital-innovation-1.png" width="40%"/>
</div>

<div align="center">
  <h3> <a href="https://github.com/Solrikk/QRScan/blob/main/README.md"> English | <a href="https://github.com/Solrikk/QRScan/blob/main/README_RU.md">Русский</a> | <a href="https://github.com/Solrikk/QRScan/blob/main/README_GE.md"> Deutsch </a> | <a href="https://github.com/Solrikk/QRScan/blob/main/README_JP.md"> 日本語 </a> | <a href="README_KR.md">한국어</a> | <a href="README_CN.md">中文</a> </h3>
</div>

-----------------

# QRScan

**_QRScan_** is an advanced, responsive web application that offers a seamless experience for decoding QR codes. Built with Python and leveraging the FastAPI framework, QRScan combines the efficiency of pyzbar for QR code detection and PIL (Pillow) for image processing, making it one of the most effective tools available for QR code scanning. This application is perfect for users and developers looking for a reliable, fast, and easy-to-use QR code scanning solution.


## Features ⚙️
- `Efficient QR Code Scanning`: Provides rapid and accurate decoding of QR codes from uploaded images.
- `User-Friendly Web Interface`: Features a minimalist yet powerful web interface for straightforward QR code uploading and decoding.
- `Comprehensive REST API`: Includes a REST API endpoint /scan-qr/ for integrating QR code scanning capabilities into your own applications or services.
- `Support for Various Image Formats`: Accepts a wide range of image formats, ensuring compatibility with most QR code images.
- `Cross-Platform Compatibility`: Being a web-based application, QRScan can be accessed and used on any device with an internet connection and a web browser.
- `Open Source`: QRScan is open source, welcoming contributions, improvements, and feedback from the community.

## ⚠️ Getting Started: ⚠️
Prerequisites
Before installing QRScan, ensure you have Python 3.8 or later installed on your system. Additionally, having pip and virtualenv is recommended for managing project dependencies.

_**Installation**_
1. Clone the repository:
```ShellScript
git clone https://github.com/Solrikk/QRScan.git
cd QRScan
```
2. Install the required Python packages:
```ShellScript
pip install -r requirements.txt
```

## Pyzbar
Pyzbar is a Python library that provides a straightforward way to decode and recognize barcodes and QR codes from images or video streams. It serves as a wrapper for the ZBar bar code reader library, a low-level C library designed for barcode recognition from various sources, including images and live cameras. Pyzbar enables leveraging the full power of ZBar without the need to directly interact with C code, offering a convenient Python API instead.

_**Key Features:***_

1. Decode Various Types of Barcodes: Pyzbar supports a plethora of barcodes, including EAN, UPC, Code 128, Code 39, among many others, alongside QR codes.
2. Work with Images and Video: Through integration with the PIL (Python Imaging Library), Pyzbar can directly work with images loaded or created using PIL. It can also be used with camera feeds by integrating with OpenCV or other video capture libraries.
3. Ease of Use: Decoding an image to retrieve barcode/QR code data can be done with just a few lines of code. Pyzbar automatically processes the image and returns the decoding results.
