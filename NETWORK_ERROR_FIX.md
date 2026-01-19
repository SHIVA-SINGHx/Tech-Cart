# CRITICAL FIX INSTRUCTIONS

## Problem: Network Error on Login/Logout/Product Fetch

Your frontend and backend are deployed separately:
- **Frontend**: https://tech-cart-delta.vercel.app
- **Backend**: https://tech-cart-onc2.vercel.app

## What Was Fixed:

### 1. Backend CORS (server.js) ✅
- Removed trailing slash from CORS origin
- Added multiple allowed origins
- Now allows both frontend URLs and local dev

### 2. Frontend API URLs ✅
All files now use:
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'https://tech-cart-onc2.vercel.app'
const res = await axios.post(`${apiUrl}/api/v1/user/login`, formData)
```

Files updated:
- Login.jsx
- SignUp.jsx
- Product.jsx
- Cart.jsx
- ProductCard.jsx
- VerifyEmail.jsx
- Navbar.jsx
- Profile.jsx

### 3. Environment Variables ✅
Created: `.env.local` with correct backend URL

## What You MUST Do NOW:

### Step 1: Backend Environment Variables on Vercel
Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables

Add these if they don't exist:
```
FRONTEND_URL=https://tech-cart-delta.vercel.app
PORT=5000
```

### Step 2: Frontend Build & Deploy
In your frontend folder:
```bash
npm run build
git add .
git commit -m "Fix API URLs and CORS"
git push
```

Vercel should auto-deploy, but if not, manually trigger deployment.

### Step 3: Backend Build & Deploy  
In your backend folder:
```bash
git add .
git commit -m "Fix CORS trailing slash"
git push
```

### Step 4: Clear Browser Cache
After deploying:
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Close and reopen browser

## Verify It Works:
1. ✅ Go to https://tech-cart-delta.vercel.app
2. ✅ Try to Sign Up
3. ✅ Try to Login
4. ✅ Load Products Page
5. ✅ Try to Logout

## If Still Getting Network Error:

Check browser DevTools → Network tab → Find failed request:
- Look at the "Headers" tab
- Check "Request URL" - it should be `https://tech-cart-onc2.vercel.app/api/v1/...`
- Check "Response Headers" for CORS error

If you see CORS error, the backend CORS needs adjustment.
