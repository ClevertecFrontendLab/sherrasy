interface CroppedAreaPixels {
    width: number;
    height: number;
    x: number;
    y: number;
}

const DEFAULT_ERROR_MESSAGE = 'Image cropping error';
const IMAGE_MIME_TYPE = 'image/jpeg';

const createImage = async (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`${DEFAULT_ERROR_MESSAGE}: Failed to load image`));
    });

const setupCanvas = (
    width: number,
    height: number,
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error(`${DEFAULT_ERROR_MESSAGE}: Canvas 2D context not available`);
    }

    return { canvas, ctx };
};

const drawCroppedImage = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    cropArea: CroppedAreaPixels,
): void => {
    ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height,
    );
};

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
    new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            blob ? resolve(blob) : reject(new Error(DEFAULT_ERROR_MESSAGE));
        }, IMAGE_MIME_TYPE);
    });

export const getCroppedImage = async (
    imageSrc: string,
    croppedAreaPixels: CroppedAreaPixels,
): Promise<Blob> => {
    try {
        const image = await createImage(imageSrc);
        const { canvas, ctx } = setupCanvas(croppedAreaPixels.width, croppedAreaPixels.height);

        drawCroppedImage(ctx, image, croppedAreaPixels);
        return await canvasToBlob(canvas);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE);
    }
};
