-- Drop the old PlatformTemplate table
DROP TABLE IF EXISTS "PlatformTemplate";

-- Remove templateId from Post
ALTER TABLE "Post" DROP COLUMN IF EXISTS "templateId";

-- Add platform and prompt fields to Template
ALTER TABLE "Template" ADD COLUMN IF NOT EXISTS "platform" "Platform" NOT NULL DEFAULT 'LINKEDIN';
ALTER TABLE "Template" ADD COLUMN IF NOT EXISTS "prompt" TEXT;

-- Add unique constraint for userId, platform, name
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_platform_template'
  ) THEN
    ALTER TABLE "Template" ADD CONSTRAINT unique_user_platform_template UNIQUE ("userId", "platform", "name");
  END IF;
END$$;

-- Create PostTemplate table
CREATE TABLE IF NOT EXISTS "PostTemplate" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "generatedContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PostTemplate_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "unique_post_platform" UNIQUE ("postId", "platform")
); 