import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { CatApiService } from '../../services/cat-api.service';
import { Cat } from '../../interfaces/cat';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  countdown: number = 0
  cat: Cat | null = null 
  isFetching: boolean = false
  isHidden: boolean = true
  canUnbox: boolean = true
  errorMsg: string | null = null

  constructor(private catApiService: CatApiService) { }

  unbox() {
    this.isHidden = true
    this.canUnbox = false
    this.cat = null
    this.startCountdown()
    this.fetchCatImage()
  }

  private fetchCatImage() {
    this.isFetching = true

    this.catApiService.getRandomCatMockSuccess()
      .pipe(
        finalize(() => {
          this.isFetching = false
        })
      )
      .subscribe(c => {
        c.match(
          (cat) => { this.cat = cat },
          (err) => { 
            console.error(err) 
            this.errorMsg = err
            this.canUnbox = false
          } 
        )
      })
  }

  private startCountdown() {
    this.countdown = 3

    const countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--
      }

      if (this.countdown === 0 && !this.isFetching) {
        clearInterval(countdownInterval);
        this.canUnbox = true
        this.isHidden = false
      }

      // disabling unboxing if there is an error
      if (this.errorMsg !== null) {
        this.canUnbox = false
        this.isHidden = true
        this.countdown = 0
      }
    }, 1000);
  }

  getCatClass() {
    return 'cat-' + this.cat?.rarity.toLowerCase()
  }
}