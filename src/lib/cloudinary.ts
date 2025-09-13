import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64Data = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'blog',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
}

export function buildImageUrl(publicId: string, transforms: string = '') {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: transforms ? transforms.split(',') : [],
  });
}