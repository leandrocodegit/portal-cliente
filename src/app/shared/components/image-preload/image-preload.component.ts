import { Component, Input } from '@angular/core';
import { LoadComponent } from '../load/load.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image-preload',
  imports: [
    LoadComponent,
    NgIf
  ],
  templateUrl: './image-preload.component.html',
  styleUrl: './image-preload.component.scss'
})
export class ImagePreloadComponent {

  @Input() url!: string;
  protected loaded = false;

  ngOnInit(): void {
    const img = new Image();
    img.src = this.url;
    img.onload = () => {
      this.loaded = true;
    };
  }

}
