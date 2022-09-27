import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../model/item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-items-bought',
  templateUrl: './items-bought.component.html',
  styleUrls: ['./items-bought.component.css']
})
export class ItemsBoughtComponent implements OnInit {
  userBids: number[] = [];
  public itemsBought: Item[] = [];

  constructor(private itemservice:ItemService, private router: Router) { }

  ngOnInit(): void {
    this.itemService.getUsersLastBids().subscribe(userBids => {
      this.userBids = userBids;
      for(let id in this.userBids){
        this.itemservice.getItem(this.userBids[id]).subscribe(itemsBought => {
          this.itemsBought.push(itemsBought);
        })
      }
    });
  }
  goToMessages():void{

    this.router.navigate(["/messages/sent"]);
  }

}
