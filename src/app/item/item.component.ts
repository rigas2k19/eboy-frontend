import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Item} from "../model/item";
import {ItemService} from "../services/item.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],

})
export class ItemComponent implements OnInit {
  items: Item[] = [];

  constructor(private service: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.service.getItems().subscribe(items => this.items = items);
  }

  showitem(item: Item):void {
    //call service to store item
    this.service.storeItem(item);
    this.router.navigate(["/items/show"]);
  }
}
