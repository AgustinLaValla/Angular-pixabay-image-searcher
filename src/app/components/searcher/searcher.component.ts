import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  
  constructor(private imageService:ImageService) { }

  ngOnInit() {
  }

  submitHandler(search:string) {
    this.imageService.searchSender.emit(search);
  }

}
