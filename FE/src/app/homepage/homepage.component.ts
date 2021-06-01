import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  searchForm = new FormGroup({
    inputText: new FormControl('')
  });

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  searchInputText(): void {
    let value = this.searchForm.value.inputText;
    this.router.navigateByUrl('/properties?city=' + value);
  }
}
