# 🔐 Security Setup Guide

## ⚠️ URGENT: API Key Security

Your OpenAI API key was shared publicly and needs to be secured immediately.

### Step 1: Revoke Compromised Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Find the key starting with `sk-proj-F73o67Vharg1u0ApEZpa9kQA...`
3. Click "Revoke" to disable it immediately

### Step 2: Create New API Key
1. Click "Create new secret key"
2. Give it a name like "Smart Recipe Generator"
3. Copy the new key (starts with `sk-`)
4. **Keep it private and secure**

### Step 3: Set Up Environment Variables

#### Local Development:
\`\`\`bash
# Create .env.local file (this file is ignored by git)
OPENAI_API_KEY=sk-your-new-key-here
\`\`\`

#### Vercel Production:
1. Vercel Dashboard → Your Project → Settings
2. Environment Variables → Add New
3. Name: `OPENAI_API_KEY`
4. Value: Your new API key
5. Environments: All (Production, Preview, Development)

### Step 4: Verify Setup
1. Restart your dev server: `npm run dev`
2. Check the AI status indicator shows "AI Powered"
3. Test recipe generation

## 🛡️ Security Best Practices

- ✅ Never share API keys in chat, code, or public spaces
- ✅ Use environment variables only
- ✅ Add `.env.local` to `.gitignore`
- ✅ Revoke keys immediately if compromised
- ✅ Use descriptive names for API keys
- ✅ Monitor API usage regularly

## 🔍 How to Check if Setup is Working

### Success Indicators:
- 🟢 AI Status shows "AI Powered"
- 🟢 Recipes are unique and creative
- 🟢 No console errors about API keys

### Troubleshooting:
- 🟡 "Demo Mode" = API key not found or invalid
- 🔴 Console errors = Check key format and spelling
- 🔴 Rate limits = Check OpenAI usage dashboard
