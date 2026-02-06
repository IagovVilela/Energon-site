import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param file - The file to upload (File or Blob)
 * @param folder - Optional folder path in Cloudinary
 * @returns The secure URL of the uploaded file
 */
export async function uploadToCloudinary(
    file: File,
    folder: string = 'energon-site'
): Promise<string | null> {
    try {
        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary using promise-based approach
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder,
                        resource_type: 'auto', // Automatically detect file type
                        public_id: `${Date.now()}-${file.name.replace(/\s+/g, '-')}`,
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(error);
                        } else if (result) {
                            console.log('Upload successful:', result.secure_url);
                            resolve(result.secure_url);
                        } else {
                            reject(new Error('Upload failed: no result'));
                        }
                    }
                )
                .end(buffer);
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
}

export default cloudinary;
