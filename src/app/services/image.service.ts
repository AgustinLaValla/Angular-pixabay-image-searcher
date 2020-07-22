import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ImageService {
    public searchSender = new EventEmitter<string>();
    public pageIncrementorObs$ = new EventEmitter<number>();
    public getImagesObs$ = new EventEmitter<void>();
    public page:number = 1;
    public search:string;

    constructor(private http:HttpClient) { 
        this.pageIncrementorListener();
    }
    
    getImages(): Observable<any[]> {
        const url = `https://pixabay.com/api/?key=17573744-beda57154c6bc8bb2e586dc85&q=${this.search}&per_page=30&page=${this.page}`;
        return this.http.get(url).pipe(map(result => result['hits']));
    }

    pageIncrementorListener() {
        this.pageIncrementorObs$.pipe(
            tap((value) => {
                if(this.page + value >= 1) {
                    this.page += value;
                    this.getImagesObs$.emit();
                }
            })
        ).subscribe()
    }

}