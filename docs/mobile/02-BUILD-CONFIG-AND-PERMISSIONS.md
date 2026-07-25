# Deployment Phase D06 — Part 2: Build Configuration, Keystore & App Permissions

## Executive Overview

This document details the production build configuration, Android Gradle signing pipelines, iOS Xcode provisioning profiles, Flutter build flavors (`dev`, `staging`, `prod`), and production permissions required for the **ITIS Mobile Application Suite**.

---

## 1. Android Release Signing & Keystore Placeholder Specifications

To produce signed Android release binaries (APK/AAB), Gradle requires a cryptographic release keystore. **Actual keystore files and passwords are kept in Vault/KMS and are never committed to source control.**

### 1.1 `key.properties` Placeholder Configuration
Placeholders map to CI/CD pipeline secrets during Github Actions / SITA Jenkins automated build steps:

```properties
# /mobile/parent_app/android/key.properties.example
storePassword=KEYSTORE_PASSWORD_PLACEHOLDER_IN_VAULT
keyPassword=KEY_PASSWORD_PLACEHOLDER_IN_VAULT
keyAlias=itis_mobile_release_key_alias
storeFile=/etc/secrets/itis_release.keystore
```

### 1.2 Android `app/build.gradle` Signing & Flavors Configuration

```groovy
// /mobile/parent_app/android/app/build.gradle
plugins {
    id "com.android.application"
    id "kotlin-android"
    id "dev.flutter.flutter-gradle-plugin"
}

def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    namespace "za.gov.itis.parent"
    compileSdk 34

    defaultConfig {
        applicationId "za.gov.itis.parent"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    flavorDimensions "environment"
    productFlavors {
        dev {
            dimension "environment"
            applicationIdSuffix ".dev"
            resValue "string", "app_name", "ITIS Parent (DEV)"
        }
        staging {
            dimension "environment"
            applicationIdSuffix ".staging"
            resValue "string", "app_name", "ITIS Parent (STG)"
        }
        prod {
            dimension "environment"
            resValue "string", "app_name", "ITIS Parent Safety"
        }
    }
}
```

---

## 2. Production App Permissions & Justification Inventory

Mobile apps require explicit Android Manifest & iOS `Info.plist` permissions to support real-time scholar tracking, SOS panic triggers, RFID onboarding, and biometric authentication.

### 2.1 Android Permissions (`AndroidManifest.xml`)

```xml
<!-- /mobile/parent_app/android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="za.gov.itis.parent">

    <!-- Internet & Network State -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

    <!-- High Precision GPS & Background Tracking -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION"/>

    <!-- Biometrics & Camera -->
    <uses-permission android:name="android.permission.USE_BIOMETRIC"/>
    <uses-permission android:name="android.permission.CAMERA"/>

    <!-- Push Notifications & Vibration Alerts -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
    <uses-permission android:name="android.permission.VIBRATE"/>

    <!-- Bluetooth / BLE for RFID Gateway Pairing (Technician App) -->
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation"/>
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>
</manifest>
```

### 2.2 Technical Permission Justification Table

| Permission Name | App Scope | Technical Justification / Functional Requirement |
| --------------- | --------- | ------------------------------------------------ |
| **`INTERNET` / `ACCESS_NETWORK_STATE`** | All Apps | Connects to REST APIs, WSS streams, and EMQX MQTT brokers. |
| **`ACCESS_FINE_LOCATION`** | All Apps | Plots live bus positions, geo-fenced school stops, and user location relative to transport routes. |
| **`ACCESS_BACKGROUND_LOCATION`** | Responder & Driver | Continues broadcasting bus location during active scholar journeys even when the app is minimized. |
| **`FOREGROUND_SERVICE_LOCATION`** | Responder App | Prevents Android OS memory killer from terminating active SOS emergency dispatch streams. |
| **`CAMERA`** | Parent & Tech | Scans QR code bus badges, pupil ID verification cards, and dashcam installation barcodes. |
| **`USE_BIOMETRIC`** | Parent & Admin | Secures parent access using fingerprint/FaceID before displaying sensitive pupil travel histories. |
| **`POST_NOTIFICATIONS`** | All Apps | Delivers instant SOS crash/panic push alerts, bus arrival notices, and PrDP expiry warnings. |
| **`BLUETOOTH_SCAN` / `CONNECT`** | Technician App | Pairs directly with vehicle IoT telemetry OBD-II dongles and RFID card scanners for field provisioning. |
