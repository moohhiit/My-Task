# App Name - My Task
### Author: Mohit Sharma
## 📱 Description

The **Todo Reminder App** is a simple yet powerful task manager built with **React Native** using the latest **Expo Router** architecture.

- Add tasks with ease
- Swipe to delete
- Tap to mark as done
- Automatically sort pending tasks above completed ones
- Set **daily reminders** with Expo Notifications to never miss a task

---

## Get started
1. Copy Repo
   ```bash
   git clone  https://github.com/moohhiit/My-Task.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## 💡 Challenges & Design Choices

### 🧱 1. Expo Router Learning Curve  
Adopting the new **Expo Router (app directory structure)** required rethinking the navigation flow. Unlike traditional React Navigation, screens and modals are automatically registered based on the file system. We had to carefully place files like `_layout.js`, `index.js`, and `modal.js` to ensure the stack and modals behaved correctly.

### 🎯 2. Swipe-to-Delete with Gesture Handler  
Implementing swipe-to-delete using `react-native-gesture-handler` caused an error (`PanGestureHandler must be a descendant of GestureHandlerRootView`). This required wrapping the entire app in `GestureHandlerRootView`, which was tricky to integrate with the Expo Router layout.

### 🧼 3. Floating Add Button with Scroll Animation  
We wanted the Add button (FAB) to hide on scroll down and reappear on scroll up for a cleaner UI. This required using the `Animated` API with scroll interpolation and absolutely positioning the button without taking up layout space.

### 🔔 4. Platform-Specific Notification Behavior  
Expo Notifications work differently on Android and iOS. For example, `trigger: { seconds: 10, repeats: true }` works on Android but **not on iOS**. To achieve reliable daily reminders on both platforms, we had to switch to `trigger: { hour, minute, repeats: true }`, which ensures notifications fire every day at a set time.

### 💾 5. Keeping the UI Minimal  
We chose to use simple components like `TouchableOpacity` and native `Text` to maintain performance and readability instead of bringing in heavy UI libraries.







