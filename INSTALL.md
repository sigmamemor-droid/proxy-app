# 📱 Установка и сборка APK для Proxy Manager

## ⚙️ Требования

Для сборки APK вам нужны:

1. **Node.js** (v16+) - [Скачать](https://nodejs.org/)
2. **JDK 11** или выше - [Скачать](https://www.oracle.com/java/technologies/downloads/)
3. **Android SDK** - часть Android Studio
4. **Android Studio** (рекомендуется) - [Скачать](https://developer.android.com/studio)

## 🚀 Быстрый старт

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/sigmamemor-droid/proxy-app.git
cd proxy-app

# 2. Установите зависимости
npm install

# 3. Запустите на Android устройстве
npm run android

# 4. Соберите APK
npm run build:apk-debug
```

## 📦 Сборка APK

### Debug APK (для тестирования)

```bash
npm run build:apk-debug
```

APK будет в: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (для публикации)

```bash
npm run build:apk
```

APK будет в: `android/app/build/outputs/apk/release/app-release.apk`

## 🧪 Тестирование

```bash
# На реальном устройстве (USB отладка)
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Или через команду
npm run android
```

## 🐛 Решение проблем

### JAVA_HOME not found

```bash
export JAVA_HOME=$(/usr/libexec/java_home)
```

### Android SDK not found

Отредактируйте `android/local.properties`:

```properties
sdk.dir=/path/to/Android/sdk
```

### Приложение падает при запуске

```bash
npm install
cd android && ./gradlew clean && cd ..
npm run android
```

---

**Полная документация в README.md** 🚀