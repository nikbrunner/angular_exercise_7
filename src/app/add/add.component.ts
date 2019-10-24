import { Component, OnInit } from '@angular/core';
import { DatenService } from '../daten.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  public category;
  public subCategory;
  public index;
  public response = false;
  public articles = {};
  public categories = [];
  public games = {};
  public books = {};
  public audioBooks = {};
  public shoes = {};
  public things = {};

  constructor(
    private datenService: DatenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.subCategory = this.route.snapshot.paramMap.get('subCategory');
    this.index = this.route.snapshot.paramMap.get('i');
    this.datenService.getData().subscribe(
      values => {
        this.response = true;
        this.articles = values;
        values.forEach(value => {
          const category = {
            name: '',
            subCategories: [],
          };
          category.name = value.name;
          value.gruppe.forEach(cat => {
            category.subCategories.push(cat.name);
          });
          this.categories.push(category);
        });
        this.games = values[0].gruppe[0].artikel;
        this.books = values[0].gruppe[1].artikel;
        this.audioBooks = values[0].gruppe[2].artikel;
        this.shoes = values[1].gruppe[0].artikel;
        this.things = values[1].gruppe[1].artikel;
      },
      error => console.log(error),
      () => console.log('fertig')
    );
  }
}
