# Build Instructions for PhotoPizza Remote Control

This document provides instructions on how to build and run the PhotoPizza Remote Control Android application.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Android Studio** - Download and install the latest version from [developer.android.com](https://developer.android.com/studio)
2. **Java Development Kit (JDK)** - Android Studio will prompt you to install it if not already installed

## Building the Application

### Opening the Project

1. Launch Android Studio
2. Select "Open an Existing Project"
3. Navigate to the `android` folder of this repository and click "Open"
4. Wait for Android Studio to sync the project with Gradle files

### Running on an Emulator

1. Click on "Run" in the toolbar or press Shift+F10
2. Select "Create New Virtual Device" if you don't have an emulator set up
3. Follow the instructions to create a new virtual device
4. Select the virtual device and click "OK" to run the application

### Running on a Physical Device

1. Enable Developer Options on your Android device:
   - Go to Settings > About Phone
   - Tap "Build Number" seven times to enable Developer Options
2. Enable USB Debugging in Developer Options
3. Connect your device to your computer via USB
4. Allow USB debugging when prompted on your device
5. In Android Studio, click on "Run" in the toolbar or press Shift+F10
6. Select your device from the list and click "OK"

### Building an APK

If you want to build an APK file that can be installed on any Android device:

1. In Android Studio, select "Build" > "Build Bundle(s) / APK(s)" > "Build APK(s)"
2. Wait for the build process to complete
3. Click on the "locate" link in the notification to find the APK file
4. The APK file will be located at `android/app/build/outputs/apk/debug/app-debug.apk`

## Installing the APK

To install the APK on an Android device:

1. Transfer the APK file to your Android device
2. On your device, navigate to the APK file using a file manager
3. Tap on the APK file to install it
4. You may need to allow installation from unknown sources in your device settings

## Troubleshooting

If you encounter any issues during the build process:

1. Make sure you have the latest version of Android Studio
2. Try invalidating caches and restarting Android Studio (File > Invalidate Caches / Restart)
3. Make sure your Android SDK is up to date (Tools > SDK Manager)
4. Check that you have the correct build tools installed (Tools > SDK Manager > SDK Tools tab) 