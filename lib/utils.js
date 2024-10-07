import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Initialize the S3 client with the credentials from the environment variables
const s3Client = new S3Client({
  region: "eu-west-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(file, userId) {
  const bufferFile = Buffer.from(await file.arrayBuffer());
  const uniqueId = uuidv4();
  const filename = `${uniqueId}-${file.name}`;
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: filename, // Path and filename in S3
      Body: bufferFile,
      ContentType: file.type, // File type (e.g., application/pdf)
      Metadata: {
        userId,
      },
    });

    await s3Client.send(command);
    return filename;
  } catch (error) {}
}
export const formatDateToYYYYMMDD = (dateString) => {
  if (!dateString) return ""; // Handle empty or undefined dateString
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return ""; // Return empty string for invalid dates

  return date.toISOString().split("T")[0];
};
