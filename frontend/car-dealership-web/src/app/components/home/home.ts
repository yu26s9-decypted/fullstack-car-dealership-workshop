import { Component } from '@angular/core';
import { VehicleList } from "../vehicle-list/vehicle-list";

@Component({
  selector: 'app-home',
  imports: [VehicleList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
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
