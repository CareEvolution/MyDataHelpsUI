// poor man's seeded javascript rng
// just for generating a relatively large random integer from a string seed
//
// the hash must be sliced to 13 hex digits (52 bits) so that it can safely
// be stored in an int without losing precision.  Loss of precision can cause
// issues with using % downstream.
//
// The radix of 16 should be specified since we are parsing hex, but with
// a string that does not start with "0x".
export async function predictableRandomNumber(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hash)).map(t => t.toString());
    return Number.parseInt(hashArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, '').slice(0, 13), 16);
}