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
  filteredItems: any;

  max:number = 0;
  min:number = 0;

  categories : Object[] = [];
  disp_cat: [string, number][] = [];
  SelectedCategory! :string;
  searchText!: string;

  countries : Object[] = [];
  disp_countries: [string, number][] = [];
  SelectedCountry!: string;

  ChangeCategory(e : any ){
    this.SelectedCategory = e.target.value;
  }

  ChangeCountry(e : any){
    this.SelectedCountry = e.target.value;
  }

  ChangeMin(e : any){
    this.min = e.target.value;
  }

  ChangeMax(e : any){
    this.max = e.target.value;
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
    this.service.getCountries().subscribe(countries =>
    {
      this.countries = countries;
      for (let country of this.countries){
        let var1: string =  country[ '0' as keyof typeof country] as unknown as string;
        let var2 : number = country[ '1' as keyof typeof country] as unknown as number;
        let tuple : [string, number] = [var1, var2];
        this.disp_countries.push(tuple);
      }
    })
    this.service.getItems().subscribe(items => {this.items = items} ) ;
  }

}
