import {Component, OnInit} from '@angular/core';
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories : Object[] = [];
  SelectedCategory:any;

  ChangeCategory(e : any ){
    this.SelectedCategory = e.target.value;
  }

  constructor(private service: ItemService) { }

  ngOnInit(): void {

    //call service to run query to get all categories in an array.
    this.service.getCategories().subscribe(categories => this.categories = categories)
  }

}
