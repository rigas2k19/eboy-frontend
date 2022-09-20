import {Component, OnInit} from '@angular/core';
import {ItemService} from "../services/item.service";
import {Item} from "../model/item";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  items: Item[] = [];
  categories : Object[] = [];
  disp_cat: [string, number][] = [];
  SelectedCategory:any;
  searchText!: string;

  ChangeCategory(e : any ){
    this.SelectedCategory = e.target.value;
  }

  constructor(private service: ItemService) { }

  ngOnInit(): void {

    //call service to run query to get all categories in an array.
    this.service.getCategories().subscribe(
      categories =>
      {
        this.categories = categories;
        for (let cat of this.categories){
          let var1: string =  cat[ '0' as keyof typeof cat] as unknown as string;
          let var2 : number = cat[ '1' as keyof typeof cat] as unknown as number;
          let tuple : [string, number] = [var1, var2];
          this.disp_cat.push(tuple);
        }
      }
    )
    this.service.getItems().subscribe(items => this.items = items ) ;
  }

}
