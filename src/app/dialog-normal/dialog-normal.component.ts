import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-normal',
  templateUrl: './dialog-normal.component.html',
  styleUrls: ['./dialog-normal.component.css']
})
export class DialogNormalComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogNormalComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string
  ) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  /* confirmado(): void {
    this.dialogo.close(true);
  } */

  ngOnInit() {
  }

}
