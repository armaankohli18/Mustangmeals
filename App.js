{
  "expo": {
    "name": "MustangMeals",
    "slug": "mustang-meals",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FFFFFF"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.mustangmeals.app",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "Used to take photos of food for reviews.",
        "NSPhotoLibraryUsageDescription": "Used to upload food photos for reviews."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.mustangmeals.app",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "YOUR_EAS_PROJECT_ID"
      }
    },
    "plugins": [
      "expo-router"
    ]
  }
}
