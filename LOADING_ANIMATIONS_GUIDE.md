# 🎬 Loading & Error Animations Guide

## 📁 Current GIF Files Setup

Your loading and error system is now fully implemented! Here's what needs to be done:

### 🔄 Replace These GIF Files

To use your custom animations, replace the following files in the `public/` folder:

1. **Page Loading Animation** (`public/loading.gif`)
   - Replace with: `computer-burst-line-animation (2).gif`
   - Used for: Initial page load and route transitions
   - Current size: Any (will be displayed at 384x384px)

2. **Offline/No Internet** (`public/offline.gif`)
   - Replace with: `original-8bba0c8bc1e6088bb365c2d0172fc0a0.gif`
   - Used for: When internet connection is lost
   - Current size: Any (will be displayed at 320x320px)

3. **404 & Server Errors** (`public/Girl-biking--animation-with-stop-motion-effect.gif`)
   - ✅ Already in place!
   - Used for: 404 Not Found and 500 Server Error pages
   - Current size: Any (will be displayed at 384x384px)

### 📋 How to Replace

#### Option 1: Using File Explorer
1. Navigate to your `public/` folder
2. Delete or rename the old GIF files
3. Copy your new GIF files
4. Rename them to match:
   - `loading.gif`
   - `offline.gif`
   - Keep `Girl-biking--animation-with-stop-motion-effect.gif` as is

#### Option 2: Using PowerShell (in your project directory)
```powershell
# Replace loading.gif
Copy-Item "path\to\computer-burst-line-animation (2).gif" -Destination "public\loading.gif" -Force

# Replace offline.gif
Copy-Item "path\to\original-8bba0c8bc1e6088bb365c2d0172fc0a0.gif" -Destination "public\offline.gif" -Force
```

---

## 🎯 What's Been Implemented

### ✅ Components Created

1. **LoadingScreen** (`components/LoadingScreen.tsx`)
   - Beautiful loading screen with animated dots
   - Shows during initial page load and route changes
   - Customizable message

2. **OfflineScreen** (`components/OfflineScreen.tsx`)
   - Detects when internet connection is lost
   - Shows retry button
   - Auto-dismisses when connection is restored

3. **404 Page** (`app/not-found.tsx`)
   - Custom 404 error page with girl-biking animation
   - "Go Back" and "Home" buttons

4. **Error Page** (`app/error.tsx`)
   - Handles server crashes and runtime errors
   - Shows error details in development mode
   - "Try Again" and "Home" buttons

5. **GlobalLoadingProvider** (`components/GlobalLoadingProvider.tsx`)
   - Manages all loading states globally
   - Automatically shows loading on route changes
   - Detects online/offline status

### ✅ Features

- **Automatic Loading**: Shows loading screen on initial page load (1.5s)
- **Route Transitions**: Smooth loading between pages (800ms)
- **Offline Detection**: Automatically shows offline screen when internet is lost
- **Error Handling**: Beautiful error pages for 404 and 500 errors
- **Smooth Animations**: All screens use Framer Motion for silky transitions

---

## 🚀 Usage Examples

### Automatic Loading (Already Working!)
```typescript
// Loading automatically shows on route changes
// No code needed - it's already integrated!
```

### Manual Loading for Async Operations
```typescript
import { useLoadingState } from "@/hooks/useLoadingState";

function MyComponent() {
  const { withLoading } = useLoadingState();

  const handleSubmit = async () => {
    await withLoading(async () => {
      // Your async operation
      await fetch('/api/endpoint');
    });
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

### Test Offline Mode
1. Open DevTools (F12)
2. Go to Network tab
3. Select "Offline" from the throttling dropdown
4. See the offline screen appear!

### Test Error Page
1. Create an intentional error in your code
2. Or navigate to a non-existent route for 404

---

## 🎨 Customization

### Change Loading Duration
Edit `components/GlobalLoadingProvider.tsx`:
```typescript
// Initial load duration (line ~52)
setTimeout(() => {
  setIsInitialLoad(false);
}, 1500); // Change this value (milliseconds)

// Route change duration (line ~60)
setTimeout(() => {
  setIsLoading(false);
}, 800); // Change this value (milliseconds)
```

### Change Animation Sizes
Edit the component files and modify the `w-` and `h-` classes:
- `LoadingScreen.tsx`: `w-96 h-96` → change to your preferred size
- `OfflineScreen.tsx`: `w-80 h-80` → change to your preferred size
- `not-found.tsx` & `error.tsx`: `w-96 h-96` → change to your preferred size

---

## 🐛 Troubleshooting

### GIFs Not Showing?
1. Make sure GIF files are in `public/` folder
2. Check file names match exactly
3. Refresh your browser (Ctrl + F5)
4. Check browser console for errors

### Loading Screen Not Appearing?
1. Check that `GlobalLoadingProvider` is in `app/layout.tsx`
2. Make sure you're using Next.js Link components for navigation
3. Clear browser cache

### Offline Detection Not Working?
1. Make sure you're testing in a real browser (not preview)
2. Use DevTools Network tab to simulate offline mode
3. Check browser console for errors

---

## 📝 Notes

- All GIFs use `unoptimized` prop for Next.js Image to ensure they animate properly
- Loading states are managed globally to prevent multiple loading screens
- Offline detection uses the browser's Navigator API
- Error boundary catches runtime errors automatically

**Enjoy your beautiful loading and error animations! 🎉**

