export default function convertToReadableDate(isoDateStr: string): string {
    const date = new Date(isoDateStr);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, 
    };

    const readableDate = date.toLocaleDateString('en-US', options);

    return readableDate;
}