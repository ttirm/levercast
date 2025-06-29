# Template System Guide

## Overview

The new template system in Levercast uses **prompt-based templates** instead of static content. This allows users to define custom prompts that guide LLMs to transform raw content according to specific social media platforms and desired tones.

## How It Works

### 1. **Template Structure**
Each template contains:
- **Name**: Descriptive name for the template
- **Description**: What the template does
- **Platform Prompts**: Platform-specific prompts for LinkedIn and Twitter

### 2. **Prompt-Based Generation**
Instead of storing static content, templates store **prompts** that instruct the LLM how to transform raw content. For example:

**LinkedIn Prompt Example:**
```
Transform the following content into a professional LinkedIn post.

Guidelines:
- Use a professional, business-focused tone
- Include industry insights and thought leadership
- Keep it engaging but authoritative
- Use bullet points or numbered lists when appropriate
- End with a call-to-action or question to encourage engagement
- Maximum 1300 characters

Content to transform:
```

### 3. **Content Generation Process**
1. User enters raw content
2. User selects a template
3. System applies platform-specific prompts to the raw content
4. LLM generates platform-optimized content
5. User sees previews for each platform

## Creating Templates

### Step 1: Access Templates
Navigate to the Templates page in the sidebar.

### Step 2: Create New Template
1. Click "Create Template"
2. Enter a descriptive name (e.g., "Professional LinkedIn", "Casual Twitter")
3. Add a description explaining what the template does
4. Write platform-specific prompts for LinkedIn and Twitter

### Step 3: Write Effective Prompts
Good prompts should include:
- **Tone instructions** (professional, casual, educational, etc.)
- **Format guidelines** (bullet points, hashtags, character limits)
- **Engagement strategies** (questions, call-to-actions)
- **Platform-specific requirements**

### Example Prompts

#### Professional Template
**LinkedIn:**
```
Transform the following content into a professional LinkedIn post.

Guidelines:
- Use a professional, business-focused tone
- Include industry insights and thought leadership
- Keep it engaging but authoritative
- Use bullet points or numbered lists when appropriate
- End with a call-to-action or question to encourage engagement
- Maximum 1300 characters

Content to transform:
```

**Twitter:**
```
Transform the following content into a professional Twitter post.

Guidelines:
- Use a professional but conversational tone
- Focus on key insights and takeaways
- Use relevant hashtags (2-3 max)
- Keep it concise and impactful
- Include a call-to-action when appropriate
- Maximum 280 characters

Content to transform:
```

#### Casual Template
**LinkedIn:**
```
Transform the following content into a casual, friendly LinkedIn post.

Guidelines:
- Use a warm, approachable tone
- Make it conversational and relatable
- Include personal anecdotes or examples when relevant
- Use emojis sparingly but effectively
- Ask engaging questions to spark conversation
- Keep it authentic and human
- Maximum 1300 characters

Content to transform:
```

## Using Templates

### Step 1: Create Content
1. Go to "New Post"
2. Enter your raw content in the text area
3. Select a template from the dropdown

### Step 2: Generate Content
1. Click "Generate Content"
2. The system will apply your template's prompts to the raw content
3. Generated content appears in the preview panels

### Step 3: Review and Edit
1. Review the generated content for each platform
2. Make any necessary adjustments
3. The content is ready for publishing

## Best Practices

### Writing Effective Prompts
1. **Be Specific**: Clearly define the tone, style, and format
2. **Include Constraints**: Specify character limits and platform requirements
3. **Add Examples**: Include examples of desired output when helpful
4. **Consider Audience**: Tailor prompts to your target audience

### Template Organization
1. **Name Clearly**: Use descriptive names that indicate the template's purpose
2. **Group by Purpose**: Create templates for different content types (educational, promotional, personal)
3. **Test and Iterate**: Refine prompts based on generated content quality

### Content Strategy
1. **Consistent Voice**: Use templates that align with your brand voice
2. **Platform Optimization**: Create different prompts for different platforms
3. **A/B Testing**: Try different templates to see what works best

## Technical Implementation

### Database Schema
- **Template**: Stores template metadata
- **PlatformTemplate**: Stores platform-specific prompts
- **One-to-Many**: Each template can have multiple platform prompts

### API Endpoints
- `GET /api/templates`: Fetch user's templates
- `POST /api/templates`: Create new template
- `PATCH /api/templates/[id]`: Update template
- `DELETE /api/templates/[id]`: Delete template
- `POST /api/generate-content`: Generate content using template prompts

### LLM Integration
The system is designed to integrate with any LLM service:
- OpenAI GPT models
- Anthropic Claude
- Google Gemini
- Custom models

## Future Enhancements

### Planned Features
1. **Template Categories**: Organize templates by type
2. **Template Sharing**: Share templates with team members
3. **Performance Analytics**: Track which templates generate the best engagement
4. **A/B Testing**: Test different prompts automatically
5. **Custom Variables**: Add dynamic content placeholders
6. **Multi-language Support**: Templates for different languages

### Advanced Prompt Features
1. **Conditional Logic**: Different prompts based on content type
2. **Dynamic Length**: Adjust prompts based on content length
3. **Brand Guidelines**: Integrate brand voice and style guides
4. **Industry-specific**: Pre-built templates for different industries 

-- New table to link posts with platform-specific templates
CREATE TABLE "PostTemplate" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "generatedContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostTemplate_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "unique_post_platform" UNIQUE ("postId", "platform")
); 

// Updated Template interface
interface Template {
  id: string;
  name: string;
  description: string | null;
  platform: Platform;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

// New PostTemplate interface
interface PostTemplate {
  id: string;
  postId: string;
  templateId: string;
  platform: Platform;
  generatedContent: string | null;
  createdAt: string;
  updatedAt: string;
  template: Template;
}

// Updated Post interface
interface Post {
  id: string;
  title: string;
  content: string;
  formattedContent: string | null;
  status: PostStatus;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  userId: string;
  postTemplates: PostTemplate[];
} 