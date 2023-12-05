// confirm-dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class ConfirmDialogService {
    constructor(private dialog: MatDialog) { }

    openConfirmDialog(data: ConfirmDialogData): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data,
        });

        return dialogRef.afterClosed();
    }
}
