import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected isDisclaimerDismissed = false;

  protected enableSound(video: HTMLVideoElement): void {
    video.muted = false;
    video.volume = 0.55;
    void video.play();
  }

  protected dismissDisclaimer(event: MouseEvent): void {
    event.stopPropagation();
    this.isDisclaimerDismissed = true;
  }
}
