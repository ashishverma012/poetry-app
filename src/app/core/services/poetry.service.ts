import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PoetryService {

    constructor(private http: HttpClient) {}

    authorValues = [];
    titleValues = [];
    poetryValues = [];
    prevAuthor = '';
    sharePoetryData: any;

    getAuthorData() {
        return this.authorValues.length ? of(this.authorValues) :
        this.http.get<any>('https://poetrydb.org/author').pipe(tap(data => this.authorValues = data.authors),
        map(data => {
            return data.authors;
       }));
    }
    getTitleData(selectedAuthor) {
        if (this.prevAuthor !== selectedAuthor) {
            this.titleValues = [];
            this.prevAuthor = selectedAuthor;
        }
        const titleUrl = 'https://poetrydb.org/author/' + selectedAuthor + '/title';
        return this.titleValues.length ? of(this.titleValues) : this.http.get<any>(titleUrl).pipe(tap(data => this.titleValues = data));
    }
    searchPoetry(selectedAuthor, selectedTitle) {
        const poetryUrl = 'https://poetrydb.org/author,title/' + selectedAuthor + ';' + selectedTitle;
        return this.poetryValues.length ? of(this.poetryValues) : this.http.get<any>(poetryUrl).pipe(tap(data => this.poetryValues = data));
    }
    savePoetryData(poetryData): any {
        this.sharePoetryData = poetryData;
    }
    getPoetryData(): any {
        return this.sharePoetryData;
    }
}
