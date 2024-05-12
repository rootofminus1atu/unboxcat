import { Component } from '@angular/core';
import { CatApiService } from '../../services/cat-api.service';
import { Result } from 'neverthrow';
import { Cat } from '../../interfaces/cat';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  filters: string[] = ['COMMON', 'RARE', 'LEGENDARY', 'MYTHIC']
  selectedFilters = [...this.filters]
  cats$: Observable<Result<Cat[], string>> = this.catApiService.getAllCats()
  selectedCats$ = this.cats$.pipe(
    map(res => res.map(cats => cats.filter(cat => this.selectedFilters.includes(cat.rarity))))
  )

  constructor(private catApiService: CatApiService) {}

  updateFilters(filter: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    if (isChecked) {
      this.selectedFilters.push(filter);
    } else {
      this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
    }
    console.log(this.selectedFilters)

    // adding this seems to be working, but that causes a re-fetch which i dont want
    this.selectedCats$ = this.cats$.pipe(
      map(res => res.map(cats => cats.filter(cat => this.selectedFilters.includes(cat.rarity))))
    )
  }

}
