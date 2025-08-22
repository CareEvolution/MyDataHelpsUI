export async function createThumbnailIfNecessary(file: File, thumbnailSize: number = 300): Promise<File | undefined> {
    const image = await loadImageFromFile(file);
    const scaleFactor = thumbnailSize / Math.max(image.height, image.width);
    return scaleFactor < 1 ? createNewFileFromImage(image, file.name, file.type, scaleFactor) : undefined;
}

export async function stripExifTags(file: File): Promise<File> {
    const image = await loadImageFromFile(file);
    return createNewFileFromImage(image, file.name, file.type);
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

function createNewFileFromImage(image: HTMLImageElement, fileName: string, fileType: string, scaleFactor: number = 1): Promise<File> {
    const canvas = document.createElement('canvas');
    canvas.width = image.width * scaleFactor;
    canvas.height = image.height * scaleFactor;

    canvas.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height);

    return new Promise(resolve => canvas.toBlob(blob => {
        resolve(new File([blob!], fileName, { type: fileType }));
    }, fileType, 1));
}