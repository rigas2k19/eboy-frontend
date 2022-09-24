import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Bid} from "../../model/bid";
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

    this.itemservice.getUsersLastBids().subscribe(userBids => {
      this.userBids = userBids;
      for(let id in this.userBids){
        this.itemservice.getItem(this.userBids[id]).subscribe(itemsBought => {
          this.itemsBought.push(itemsBought);
        })
      }
    });
  }
  goToMessages():void{
    /* Mporoume na valoume to username to seller sto local storage
    * kai na ginetai to redirect sta /messages/sent opote kai sth forma
    * na exoume hdh sumplhrwmeno to seller username gia to message */
    this.router.navigate(["/messages/sent"]);
  }

}
