import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map, switchMapTo } from 'rxjs/operators';
import { PoetryService } from '../core/services/poetry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poetry-content',
  templateUrl: './poetry-content.component.html',
  styleUrls: ['./poetry-content.component.scss']
})
export class PoetryContentComponent implements OnInit {

  authorControl = new FormControl();
  titleControl = new FormControl();
  filteredAuthorOptions: Observable<any[]>;
  filteredTitleOptions: Observable<any[]>;
  isButtonDisable:boolean = true;

  constructor(private poetryService: PoetryService, private router: Router) {
    this.filteredAuthorOptions = this.authorControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filterAuthorData(val || '')
       }) 
    )
    this.titleControl.disable();
   }

  ngOnInit() {
  }

  filterAuthorData(search: string): Observable<any[]> {
    return this.poetryService.getAuthorData()
     .pipe(
      map(response => response.filter(option => { 
         return option.toLowerCase().indexOf(search.toLowerCase()) === 0
       }))
     )
   }

   selectAuthor(event) {
     if(event.source.selected) {
      this.titleControl.enable();
      this.titleControl.setValue('');
      this.filteredTitleOptions = this.titleControl.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
              return this.filterTitleData(val || '', event.source.value)
         }) 
      )
    }
   }
   
   handleEmptyAuthor(value: any){
    if(value === '') {
      this.titleControl.setValue('');
      this.titleControl.disable();
      this.isButtonDisable = true;
    }
  }

  handleEmptyTitle(value: any){
    if(value === '') {
      this.isButtonDisable = true;
    }
  }

   selectTitle(event) {
    if(event.source.selected) {
      this.isButtonDisable = false;
    }
   }

   filterTitleData(val: string, selectedAuthor): Observable<any[]> {
    return this.poetryService.getTitleData(selectedAuthor)
     .pipe(
       map(response => response.filter(option => { 
         return option.title.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }

   getPoemData() {
     this.poetryService.searchPoetry(this.authorControl.value, this.titleControl.value).subscribe((results) => {
      this.poetryService.savePoetryData(results[0].lines); 
      this.router.navigate(['result']);
    })
   }
}
