# PhotoPizza Remote Control

PhotoPizza Remote Control is an Android application for controlling the PhotoPizza device - an automatic turntable for product photography.

## Features

- Connect to PhotoPizza device via WiFi
- Control rotation direction (clockwise/counterclockwise)
- Set number of frames for shooting
- Configure speed, pause, and delay settings
- Start/stop rotation
- Save configuration settings

## Technical Details

This application is a conversion of the original web-based PhotoPizza Remote Control to a native Android application. It maintains the same functionality while providing a native mobile experience.

## Development Setup

### Prerequisites

- Android Studio Arctic Fox (2020.3.1) or newer
- Android SDK 21+
- Gradle 7.0+
- Java Development Kit (JDK) 8 or newer

### Building the Project

1. Clone the repository
2. Open the `android` folder in Android Studio
3. Sync Gradle files
4. Build and run the application on your device or emulator

#### Command Line Build

If you prefer to build from the command line, you can use the following commands:

```bash
cd android
export JAVA_HOME="/path/to/your/jdk"  # Set your JDK path
./gradlew assembleDebug               # Build debug APK
./gradlew assembleRelease             # Build release APK (requires signing configuration)
```

The built APK files will be located in `android/app/build/outputs/apk/` directory.

For detailed build instructions, see [BUILD_INSTRUCTIONS.md](android/BUILD_INSTRUCTIONS.md).

## Usage

### Quick Start

For quick installation, you can use the pre-built APK file included in this repository:

1. Download [PhotoPizza.apk](https://github.com/PhotoPizza/remote/raw/master/PhotoPizza.apk) directly from GitHub
2. Install it on your Android device
3. Allow installation from unknown sources if prompted

### First Connection Guide

The initial setup of the Android application involves the following steps:

1. **Create a Hotspot on Your Phone:**  
   * Create a mobile hotspot with SSID `PhotoPizza` and password `9992030360`.  
   * This will allow the control unit to connect to your phone directly.

2. **Power On the Control Unit:**  
   * Turn on the PhotoPizza control unit.  
   * During startup, the control unit will automatically connect to the hotspot you created.

3. **Connect Through the App:**  
   * Open the PhotoPizza Remote app on your Android device.  
   * The app will automatically detect and connect to the control unit.

4. **Optional: Configure for Home Network:**  
   * You can continue using the hotspot method, or configure the system to use your home Wi-Fi network.  
   * To use your home network, go to the app settings.  
   * Enter your home Wi-Fi network parameters (SSID and password).  
   * Save the settings.  
   * Restart the control unit, and it will connect to your home network instead.  
   * Your phone, when connected to the same home network, will be able to control the turntable without creating a hotspot.

### Using the App

1. Connect your Android device to the same WiFi network as your PhotoPizza device
2. Enter the IP address of your PhotoPizza device (default is 192.168.4.1)
3. Configure your settings (frames, speed, pause, delay)
4. Use the control buttons to operate your PhotoPizza device

## Testing

### WebSocket Test Server

The project includes a WebSocket test server that emulates the PhotoPizza device for testing purposes. To use it:

1. Install Node.js dependencies:
   ```bash
   cd websocket-server
   npm install
   ```

2. Start the WebSocket server:
   ```bash
   node server.js
   ```

3. In the Android app, connect to your computer's IP address (port 8000)

The test server emulates all the functionality of the PhotoPizza device, allowing you to test the app without an actual device.

## Related Projects

- [PhotoPizza DIY](https://github.com/MakerDrive/PhotoPizza) - The original open-source project for building the PhotoPizza turntable hardware. This repository contains all the necessary information, drawings, and firmware to build your own 360° product photography turntable.

## Project Structure

- `android/` - Android application source code
- `websocket-server/` - Test WebSocket server for development and testing
- `uilib/` - Original web UI library (for reference)
- `remote.js` - Original JavaScript code (for reference)
- `index.html` - Original HTML interface (for reference)
- `PhotoPizza.apk` - Pre-built Android application package

## License

This project is licensed under the MIT License - see the LICENSE file for details.