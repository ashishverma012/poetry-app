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
  rhymePattern = 'not found';

  constructor(private poetryService: PoetryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.poetryData =  this.poetryService.getPoetryData();
    for (let i = 0; i < this.poetryData.length - 4; i += 4) {
      let line = this.poetryData[i];
      if (line.length === 0) {
        i++;
      }
      line = this.poetryData[i];
      let word1 = this.getWord(line);

      line = this.poetryData[i + 1];
      let word2 =  this.getWord(line);
      let found = this.getRhymePattern(word1, word2);
      found = false;
      line = this.poetryData[i + 2];
      word1 = this.getWord(line);

      line = this.poetryData[i + 3];
      word2 =  this.getWord(line);
      found = this.getRhymePattern(word1, word2);
      if (found) {
        this.rhymePattern = 'AA BB';
        break;
      }
    }
  }

  getWord(line): string{
    line = line.replace(/[^a-zA-Z ]/g, '');
    const word1 = line.substring(line.lastIndexOf(' ') + 1, line.length);
    return word1;
  }

  getRhymePattern(word1, word2): boolean {
    const l1 = word1.length;
    const l2 = word2.length;
    if (l1 >= 3) {
      const word1End = word1.substring(l1 - 3, l1);
      if (word2.endsWith(word1End)) {
        return true;
      }
    }
    else if (l1 >= 2) {
      const word1End = word1.substring(l1 - 2, l1);
      if (word2.endsWith(word1End)) {
        return true;
      }
    }
    return false;
  }

}
