import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Item} from "../model/item";
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  constructor(private service: ItemService) { }

  ngOnInit(): void {
    this.service.getItems().subscribe(items => this.items = items);
  }

}
