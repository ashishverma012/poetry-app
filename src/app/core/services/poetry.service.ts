import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
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
    rhymeValues = [];
    prevAuthor = '';
    private poetryArray = 'Poetry';

    getAuthorData(): Observable<any> {
        return this.authorValues.length ? of(this.authorValues) :
        this.http.get<any>('https://poetrydb.org/author').pipe(tap(data => this.authorValues = data.authors),
        map(data => {
            return data.authors;
       }));
    }
    getTitleData(selectedAuthor): Observable<any> {
        if (this.prevAuthor !== selectedAuthor) {
            this.titleValues = [];
            this.prevAuthor = selectedAuthor;
        }
        const titleUrl = 'https://poetrydb.org/author/' + selectedAuthor + '/title';
        return this.titleValues.length ? of(this.titleValues) : this.http.get<any>(titleUrl).pipe(tap(data => this.titleValues = data));
    }
    searchPoetry(selectedAuthor, selectedTitle): Observable<any> {
        const poetryUrl = 'https://poetrydb.org/author,title/' + selectedAuthor + ';' + selectedTitle;
        return this.http.get<any>(poetryUrl);
    }
    savePoetryData(poetryData): any {
        localStorage.setItem(this.poetryArray, JSON.stringify(poetryData));
    }
    getPoetryData(): any {
        const poetryResults = localStorage.getItem(this.poetryArray);
        return JSON.parse(poetryResults);
    }
}
