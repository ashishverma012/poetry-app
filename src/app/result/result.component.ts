import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoetryService } from '../core/services/poetry.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  poetryData: any;

  constructor(private poetryService: PoetryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.poetryData =  this.poetryService.getPoetryData();
  }

}
