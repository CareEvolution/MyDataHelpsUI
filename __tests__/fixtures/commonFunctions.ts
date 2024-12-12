export function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0; // Random 0-15
        const v = c === 'x' ? r : (r & 0x3) | 0x8; // Ensure "y" is 8, 9, A, or B
        return v.toString(16); // Convert to hex
    });
}