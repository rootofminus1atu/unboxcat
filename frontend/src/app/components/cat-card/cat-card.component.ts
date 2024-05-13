import { Component, Input } from '@angular/core';
import { Cat } from '../../interfaces/cat';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.css'
})
export class CatCardComponent {
  @Input() cat!: Cat
  showFullName = false

  showModal(catId: any) {
    const modalId = 'my_modal_' + catId;
    // maybe if I coded my own modals I wouldn't have to do it but that's how it's done with this ui library
    const modal = document.getElementById(modalId);
    if (modal) {
      (modal as any).showModal();
    }
  }

  getCatClass() {
    return 'cat-' + this.cat.rarity.toLowerCase()
  }
}
