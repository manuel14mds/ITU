// confirm-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
        <button mat-button (click)="onConfirm()">Confirmar</button>
        <button mat-button (click)="onCancel()">Cancelar</button>
    </div>
    `,
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) { }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}

export interface ConfirmDialogData {
    title: string;
    message: string;
}
