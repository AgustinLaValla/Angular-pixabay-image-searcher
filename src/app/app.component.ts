import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from './services/image.service';
import { tap, switchMap, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public images: any[] = [];
  public touched: boolean = false;
  private searchListener = new Subscription();
  private imagesListener = new Subscription();


  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.listenSearchAndGetImages();
    this.getImagesListener();
  }

  listenSearchAndGetImages() {
    this.searchListener = this.imageService.searchSender.pipe(
      tap((search) => {
        this.imageService.page = 1;
        this.imageService.search = search;
      }),
      switchMap(() => this.getImage())
    ).subscribe(console.log);
  }

  getImagesListener() {
    this.imageService.getImagesObs$.pipe(
      mergeMap(() => this.getImage())
    ).subscribe();
  }

  getImage() {
    return this.imageService.getImages().pipe(
      tap(images => this.images = images),
      tap(() => this.touched = true)
    )
  }

  ngOnDestroy() {
    this.searchListener.unsubscribe();
    this.imagesListener.unsubscribe();
  }



}
