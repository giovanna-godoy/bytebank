import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageItemComponent } from '../manage-item/manage-item.component';
import { MatDialogRef } from '@angular/material/dialog';
import { StatementItem } from '../../models/statement.model';

@Component({
  selector: 'app-modal-base',
  imports: [ManageItemComponent],
  templateUrl: './modal-base.component.html',
  styleUrl: './modal-base.component.scss'
})
export class ModalBaseComponent {
  public updatedItem!: StatementItem;

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ModalBaseComponent>);

   setUpdatedItem(item: StatementItem) {
    this.dialogRef.close(item);
  }
}
