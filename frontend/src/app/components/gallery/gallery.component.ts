import { Component } from '@angular/core';
import { CatApiService } from '../../services/cat-api.service';
import { Result } from 'neverthrow';
import { Cat } from '../../interfaces/cat';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, filter, map, startWith } from 'rxjs';
import { CatCardComponent } from '../cat-card/cat-card.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterModule, CommonModule, CatCardComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  filters: string[] = ['COMMON', 'RARE', 'LEGENDARY', 'MYTHIC']
  selectedFilters = new BehaviorSubject<string[]>(this.filters)

  cats$: Observable<Result<Cat[], string>> = this.catApiService.getAllCats()
  selectedCats$ = combineLatest([this.cats$, this.selectedFilters.pipe(startWith(this.filters))]).pipe(
    map(([catsRes, filters]) => catsRes.map(cats => 
      cats.filter(cat => filters.includes(cat.rarity))
    ))
  )

  constructor(private catApiService: CatApiService) {}

  updateFilters(filter: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    const filters = this.selectedFilters.value
    if (isChecked) {
      this.selectedFilters.next([...filters, filter])
    } else {
      this.selectedFilters.next(filters.filter(f => f !== filter))
    }
    console.log(this.selectedFilters.value)
  }

}
