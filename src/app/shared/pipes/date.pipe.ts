import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
    transform(timestamp: { seconds: number, nanoseconds: number } | Date | undefined, format: string = 'yyyy-MM-dd HH:mm:ss zzzz'): string {
        if (!timestamp) {
            return 'Fecha no disponible';
        }

        if (timestamp instanceof Date) {
            // Si es un objeto de tipo Date, usarlo directamente
            return this.formatDate(timestamp, format);
        } else {
            // Si es un objeto de tipo { seconds: number, nanoseconds: number }, convertirlo a Date
            const { seconds, nanoseconds } = timestamp;
            const date = new Date(seconds * 1000 + nanoseconds / 1000000);
            return this.formatDate(date, format);
        }
    }

    private formatDate(date: Date, format: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZoneName: 'short' // Cambiado a 'short' para obtener la abreviatura de la zona horaria
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);


    }
}
