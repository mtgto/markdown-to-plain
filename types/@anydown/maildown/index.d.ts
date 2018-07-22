declare module "@anydown/maildown" {
    function convert(input: string, opts?: {lineLength?: number}): string;
    export default convert;
}
