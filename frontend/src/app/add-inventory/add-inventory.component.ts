import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { inventory } from '../models/inventory.model';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit(): void {
  }
  createInventory(name:string, price:string, stock:string){
    if(!name || !price || !stock){
      alert("Fill out all feilds")
      return 
    }
    if(!Number(stock) || !Number(price)){
      alert("Enter valid numbers for stock and price")
      return
    }
    price = parseFloat(price).toFixed(2);
    let inventoryitem : any = {name: name, price: price, stock: Number(stock)}
    this.inventoryService.add_inventory('inventory', inventoryitem).subscribe((list_inventory: inventory)=>{
      this.router.navigate([''])
    })
  }

}
