# 🚀 Git Setup & Push Commands for Ruturaj

## ✅ **Your Git Configuration**

**Email:** ruturajsonkamble29@gmail.com  
**Username:** rajj28

---

## 📋 **STEP-BY-STEP COMMANDS**

### **Step 1: Configure Git (First Time Only)**

```bash
# Set your email
git config --global user.email "ruturajsonkamble29@gmail.com"

# Set your name
git config --global user.name "rajj28"

# Verify configuration
git config --list
```

---

### **Step 2: Initialize Repository**

```bash
# Navigate to your project folder (if not already there)
cd C:\Users\Acer\website

# Initialize Git
git init

# Check status
git status
```

---

### **Step 3: Add Files**

```bash
# Add all files
git add .

# Verify what's being added
git status
```

**You should see:**
- ✅ Green files (will be committed)
- ❌ NO `.env.local` (protected by .gitignore)

---

### **Step 4: Create First Commit**

```bash
git commit -m "⚡ Initial commit: Production-ready portfolio

Features:
- Dynamic projects, certifications, achievements
- Smart Redis caching (90% optimization)
- EmailJS contact forms
- Lazy loading components
- Image optimization
- Smooth GSAP animations

Tech: Next.js 15 + TypeScript + Supabase + Redis"
```

---

### **Step 5: Create GitHub Repository**

1. **Go to:** https://github.com/new
2. **Repository name:** `portfolio` (or any name you like)
3. **Description:** "My personal portfolio with dynamic content"
4. **Visibility:** Choose Public or Private
5. **DON'T check:** "Initialize with README"
6. **Click:** "Create repository"

---

### **Step 6: Connect to GitHub**

**After creating the repo, GitHub will show commands. Use this:**

```bash
# Add remote (replace with YOUR actual GitHub repo URL)
git remote add origin https://github.com/rajj28/portfolio.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**⚠️ IMPORTANT:** Replace `portfolio` in the URL with your actual repository name if different!

---

## 🔐 **If GitHub Asks for Authentication**

### **Option 1: Personal Access Token (Recommended)**

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Portfolio Push"
4. Select scope: `repo` (Full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. When prompted for password, paste the token

### **Option 2: GitHub CLI**

```bash
# Install GitHub CLI (if needed)
winget install GitHub.cli

# Login
gh auth login

# Follow prompts
```

---

## 🎯 **Complete Command Sequence**

**Copy and paste these in order:**

```bash
# 1. Configure Git (first time only)
git config --global user.email "ruturajsonkamble29@gmail.com"
git config --global user.name "rajj28"

# 2. Initialize repository
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "⚡ Initial commit: Production-ready portfolio"

# 5. Add remote (after creating repo on GitHub)
git remote add origin https://github.com/rajj28/YOUR_REPO_NAME.git

# 6. Push
git branch -M main
git push -u origin main
```

---

## ✅ **Verification**

After pushing, check:

1. **Go to:** https://github.com/rajj28/YOUR_REPO_NAME
2. **Verify:**
   - ✅ All files are there
   - ✅ README displays correctly
   - ❌ NO `.env.local` visible
   - ✅ Commit message shows

---

## 🚀 **Next: Deploy to Vercel**

After pushing to GitHub:

1. **Go to:** https://vercel.com/
2. **Sign in** with GitHub
3. **Import** your repository
4. **Add environment variables** (from your `.env.local`)
5. **Deploy!**

---

## 🆘 **Troubleshooting**

### **"git is not recognized"**
**Download Git:** https://git-scm.com/downloads

### **"Permission denied"**
Use personal access token (see above)

### **"Updates were rejected"**
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### **".env.local appears in git status"**
```bash
# Remove from tracking
git rm --cached .env.local
git commit -m "Remove sensitive env file"
```

---

## 📝 **Your Repository Info**

**GitHub Profile:** https://github.com/rajj28  
**Email:** ruturajsonkamble29@gmail.com  
**After creating repo:** https://github.com/rajj28/portfolio

---

**Ready to push? Run the commands above!** 🚀✨

