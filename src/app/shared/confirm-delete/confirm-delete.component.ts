import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent implements OnInit {
  visible = true;
  @Input() itemToDelete!: string;
  @Input() message!: string;
  @Output() confirmDelete = new EventEmitter();

  loading = false;

  ngOnInit(){
  }

    showDialog() {
        this.visible = true;
    }

    onDelete() {
      this.confirmDelete.emit();
    }

}
