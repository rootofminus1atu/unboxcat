import { Component } from '@angular/core';
import { CatApiService } from '../../services/cat-api.service';
import { Result } from 'neverthrow';
import { Cat } from '../../interfaces/cat';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  cats!: Result<Cat[], string>
  filters: string[] = ['COMMON', 'RARE', 'LEGENDARY', 'MYTHIC']
  selectedFilters = [...this.filters]
  // selectedCats = // i think itd be easier if cats was a stream, and so we could pipe the filters through it

  constructor(private catApiService: CatApiService) {}

  ngOnInit() {
    this.fetchCats()
  }

  fetchCats() {
    this.catApiService.getAllCats().subscribe(data => this.cats = data)
  }

  updateFilters(filter: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    if (isChecked) {
      this.selectedFilters.push(filter);
    } else {
      this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
    }
    console.log(this.selectedFilters)
  }

}
