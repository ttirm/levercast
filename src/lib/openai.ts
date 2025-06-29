import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GenerateContentParams {
  prompt: string;
  rawContent: string;
  platform: 'LINKEDIN' | 'TWITTER';
}

export async function generateContentWithOpenAI({
  prompt,
  rawContent,
  platform,
}: GenerateContentParams): Promise<string> {
  try {
    // Create the full prompt by combining template prompt with raw content
    const fullPrompt = `${prompt}

Raw content to transform:
"${rawContent}"

Please generate content that follows the above instructions for ${platform}.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using GPT-4o-mini for cost efficiency
      messages: [
        {
          role: 'system',
          content: 'You are a professional social media content generator. You transform raw content into platform-optimized posts following specific guidelines and prompts.',
        },
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
      max_tokens: platform === 'LINKEDIN' ? 1000 : 300, // LinkedIn allows more characters
      temperature: 0.7, // Balanced creativity and consistency
    });

    const generatedContent = completion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw new Error('No content generated from OpenAI');
    }

    return generatedContent.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        throw new Error('OpenAI API key is invalid or missing');
      } else if (error.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else if (error.status === 500) {
        throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
      }
    }
    
    throw new Error('Failed to generate content. Please try again.');
  }
}

// Helper function to validate OpenAI API key
export function validateOpenAIKey(): boolean {
  return !!process.env.OPENAI_API_KEY;
} 