import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-collection',
  templateUrl: './image-collection.component.html',
  styleUrls: ['./image-collection.component.css']
})
export class ImageCollectionComponent implements OnInit {

  @Input() public images: any[] = [];
  @Input() public touched:boolean = false;


  constructor(private imageService:ImageService) { }

  ngOnInit() {
  }

  incrementOrDecrementPage(value:number) {
    this.imageService.pageIncrementorObs$.next(value);
  }

}
