# Context: Uploading Large Files to Cloudflare R2 using AWS SDK v3 for Node.js

## Overview
Cloudflare R2 is S3-compatible. To upload large files (like videos over 100MB), we must use Multipart Uploads. In Node.js, we do not write this manually. We use the AWS SDK v3 `@aws-sdk/client-s3` combined with `@aws-sdk/lib-storage`.

## R2 Specific Client Configuration
When initializing the `S3Client` for Cloudflare R2, the configuration MUST look like this:
- `region`: MUST be set to `"auto"`
- `endpoint`: MUST be formatted as `https://<CLOUDFLARE_ACCOUNT_ID>.r2.cloudflarestorage.com`
- `credentials`: Requires `accessKeyId` and `secretAccessKey` generated from the Cloudflare R2 dashboard.

## Code Example: Multipart Upload via lib-storage
The `@aws-sdk/lib-storage` package provides an `Upload` class that automatically chunks large files (Streams) and uploads them in parallel.

```javascript
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";

// 1. Initialize the S3 Client for Cloudflare R2
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT, // e.g., https://<ACCOUNT_ID>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// 2. Create a read stream for the large local file
const fileStream = fs.createReadStream("/path/to/large/video.mp4");

// 3. Execute the Multipart Upload
const upload = new Upload({
  client: s3,
  params: {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: "destination-filename.mp4",
    Body: fileStream,
  },
});

upload.on("httpUploadProgress", (progress) => {
  console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
});

await upload.done();