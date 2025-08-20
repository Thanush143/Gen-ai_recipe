# 🔑 OpenAI API Key Setup Instructions

## How to Set Up Your OpenAI API Key

### Step 1: Get Your API Key
The API key you provided appears to be a URL endpoint, not an actual API key. Here's how to get your real OpenAI API key:

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign in to your account
3. Navigate to "API Keys" in the left sidebar
4. Click "Create new secret key"
5. Copy the key (it starts with `sk-`)

### Step 2: Set Up Environment Variables

#### For Local Development:
1. Create a `.env.local` file in your project root
2. Add your API key:
\`\`\`bash
OPENAI_API_KEY=sk-your-actual-api-key-here
\`\`\`

#### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add a new variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-your-actual-api-key-here`
   - **Environment**: Production, Preview, Development

### Step 3: Verify Setup
1. Restart your development server: `npm run dev`
2. Check the AI status indicator in your app
3. Try generating recipes with ingredients

## 🔒 Security Notes

- **Never commit API keys to version control**
- **Never share API keys publicly**
- **Use environment variables only**
- **The URL you provided is not a valid API key**

## 💡 API Key Format

✅ **Correct format**: `sk-proj-abc123...` (starts with `sk-`)
❌ **Incorrect**: `https://api.openai.com/v1/responses` (this is a URL)

## 🧪 Testing

Once set up correctly, you should see:
- ✅ "AI Powered" status indicator
- ✅ Real AI-generated recipes
- ✅ Creative, unique recipe variations

Without the API key:
- ⚠️ "Demo Mode" status indicator  
- ✅ Enhanced mock recipes (still great!)
- ✅ All features work normally
