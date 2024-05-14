import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { CatApiService } from '../../services/cat-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  countdown: number = 0
  catImageUrl: string = ''
  fetchingImage: boolean = false
  catRevealed: boolean = false

  constructor(private catApiService: CatApiService) { }

  // have a countdown simulataneously, and whn its over set catRevealed to true

  unbox() {
    this.fetchingImage = true
    this.catRevealed = false
    this.startCountdown()
    this.catApiService.getRandomCatMock().pipe( 
      finalize(() => { 
        console.log('finalize')
        this.fetchingImage = false;
      }) 
    ).subscribe(c => {
      c.match(
        ({ url }) => { 
          console.log('got url', url)
          this.catImageUrl = url
        },
        (err) => { console.error(err) } 
      )
    })
  }

  private startCountdown() {
    this.countdown = 3
    const countdownInterval = setInterval(() => {
      this.countdown--
      console.log(this.countdown)
      if (this.countdown === 0) {
        clearInterval(countdownInterval)
        console.log('we revealing')
        this.catRevealed = true
      }
    }, 1000)
  }
}
