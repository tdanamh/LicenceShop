import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  searchForm = new FormGroup({
    inputText: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  searchInputText(): void {
    console.log('aaa');
  }
}
