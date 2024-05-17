//poor man's seeded javascript rng
//just for generating a relatively large random integer from a string seed
export async function predicatableRandomNumber(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hash)).map(t => t.toString());
    return parseInt(hashArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, ""));
}