# 📱 Proxy Manager - Native Android APK

Полнофункциональное Android приложение на Kotlin.

## 🚀 Как собрать APK (БЕЗ ПК)

### Вариант 1: Онлайн сервис (САМЫЙ ПРОСТОЙ)

1. Открой: **https://www.apkbuilder.io/**
2. Загрузи этот репозиторий как ZIP
3. Или используй: **https://www.apkpure.com/builder**

### Вариант 2: На ПК с Android Studio

```bash
# Скачай проект
git clone https://github.com/sigmamemor-droid/proxy-app.git
cd proxy-app

# Собери Debug APK
./gradlew assembleDebug

# Или Release APK
./gradlew assembleRelease
```

APK будет в: `android/app/build/outputs/apk/debug/app-debug.apk`

### Вариант 3: GitHub Actions (автоматическая сборка)

Я настроим CI/CD чтобы APK собирался автоматически в облаке!

---

## 📦 Что в проекте

- ✅ `MainActivity.kt` - главная активность на Kotlin
- ✅ `activity_main.xml` - интерфейс приложения
- ✅ `proxy_item.xml` - список прокси
- ✅ `build.gradle` - конфигурация сборки
- ✅ `AndroidManifest.xml` - манифест приложения

## 🎯 Функционал

- ✅ Генерация 10 случайных прокси
- ✅ Подключение к прокси одним кликом
- ✅ Копирование IP в буфер обмена
- ✅ Красивый интерфейс на Android
- ✅ Работает на Android 5.0+

---

**Используй онлайн сервис если нет ПК! ☁️**