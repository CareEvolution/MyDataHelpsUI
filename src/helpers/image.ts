export async function createThumbnailIfNecessary(file: File, thumbnailSize: number = 300): Promise<File | undefined> {
    const image = await loadImageFromFile(file);
    const scaleFactor = thumbnailSize / Math.max(image.height, image.width);

    if (scaleFactor < 1) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width * scaleFactor;
        canvas.height = image.height * scaleFactor;

        canvas.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height);

        return new Promise(resolve => canvas.toBlob(blob => {
            resolve(new File([blob!], file.name, { type: file.type }));
        }, file.type, 1));
    }

    return undefined;
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject();
            image.src = event.target?.result as string;
        };
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}