import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public', 'images');
const outputDir = path.join(process.cwd(), 'public', 'webp-images');

if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

const convertImages = async (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await convertImages(filePath); // Llamada recursiva para subdirectorios
        } else {
            const ext = path.extname(file).toLowerCase();

            if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                // Generar la ruta de salida
                const relativePath = path.relative(inputDir, filePath);
                const outputPath = path.join(outputDir, relativePath.replace(ext, '.webp'));

                const outputFolder = path.dirname(outputPath);

                // Crear el directorio de salida para la imagen convertida si no existe
                if (!fs.existsSync(outputFolder)) {
                    fs.mkdirSync(outputFolder, { recursive: true });
                }

                try {
                    await sharp(filePath).webp({ quality: 90 }).toFile(outputPath);
                    console.log(`Convertido: ${filePath} a ${outputPath}`);
                } catch (error) {
                    console.error(`Error al convertir ${filePath}:`, error);
                }
            }
        }
    }
};

// Iniciar la conversión de imágenes
convertImages(inputDir);