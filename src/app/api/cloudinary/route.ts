import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const image = data.get("file") as File;

        if (!image) {
            return NextResponse.json(
                { error: "Nenhum arquivo enviado" },
                { status: 400 }
            );
        }

        console.log("Processando imagem:", image.name, "Tamanho:", image.size);

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    format: "jpg",
                    transformation: [
                        { width: 400, crop: "scale" },
                        { quality: "auto" }
                    ],
                    public_id: image.name.replace(/\.[^/.]+$/, "")
                },
                (error, result) => {
                    if (error) {
                        console.error("Erro no Cloudinary:", error);
                        reject(error);
                        return;
                    }
                    resolve(result);
                }
            );

            uploadStream.end(buffer);
        });

        console.log("Upload concluído:", response);

        return NextResponse.json({
            url: (response as { secure_url: string }).secure_url,
            format: "jpg",
            width: 400
        });
    } catch (error) {
        console.error("Erro ao processar upload:", error);
        return NextResponse.json(
            { error: "Falha ao processar upload da imagem" },
            { status: 500 }
        );
    }
}