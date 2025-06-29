# Levercast Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/levercast"

# OpenAI API (Required for content generation)
OPENAI_API_KEY=your_openai_api_key_here

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## OpenAI API Setup

1. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in to your account
   - Navigate to "API Keys" in your dashboard
   - Click "Create new secret key"
   - Copy the generated key

2. **Add to Environment:**
   - Add your OpenAI API key to the `.env.local` file
   - Set `OPENAI_API_KEY=your_actual_api_key_here`

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

## Template System

The template system now uses OpenAI to generate content based on your prompts:

1. **Create Templates:** Go to the Templates page and create platform-specific templates
2. **Write Prompts:** Define how you want content transformed for each platform
3. **Generate Content:** Use the "Generate" buttons to create platform-optimized content

## Features

- **Real-time Generation:** Content is generated using GPT-4o-mini for cost efficiency
- **Platform Optimization:** Different prompts for LinkedIn and Twitter
- **Error Handling:** Comprehensive error messages for API issues
- **Loading States:** Visual feedback during content generation
- **Template Management:** Create and manage custom templates

## Troubleshooting

### OpenAI API Errors

- **401 Unauthorized:** Check your API key is correct
- **429 Rate Limited:** Wait a moment and try again
- **500 Server Error:** OpenAI service may be temporarily unavailable

### Content Generation Issues

- Ensure you have selected a template for each platform
- Make sure you have entered raw content to transform
- Check that your OpenAI API key is properly configured

## Cost Considerations

- Using GPT-4o-mini for cost efficiency
- LinkedIn posts: ~1000 tokens max
- Twitter posts: ~300 tokens max
- Monitor your OpenAI usage in the OpenAI dashboard 