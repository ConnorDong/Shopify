import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { inventory } from '../models/inventory.model';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {
  list_inventory: inventory[] = []
  selectedInventory?: inventory;
  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.get_inventory('inventory').subscribe((list_inventory: inventory[])=>{
      this.list_inventory = list_inventory
    })
  }
  onSelect(inventory: inventory): void {
    this.selectedInventory = inventory
  }
  deleteInventory(): void {
    if(!this.selectedInventory) {
      alert("Please select an item")
      return 
    }
    this.inventoryService.delete_inventory('inventory', this.selectedInventory.id).subscribe((response: string)=>{
      this.selectedInventory = undefined
      this.ngOnInit()
    })
  }
  editInventory(price: string, stock: string): void {
    if(!this.selectedInventory) {
      alert("Please select an item")
      return 
    }
    if(!price || !stock){
      alert("Fill out all feilds")
      return 
    }
    if(!Number(stock) || !Number(price)){
      alert("Enter valid numbers for stock and price")
      return
    }
    price = parseFloat(price).toFixed(2);
    this.selectedInventory.price = price
    this.selectedInventory.stock = Number(stock)
    this.inventoryService.edit_inventory('inventory', this.selectedInventory.id, this.selectedInventory).subscribe((response: inventory)=>{
      this.selectedInventory = undefined
      this.ngOnInit()
    })
    

  }

  getCSV() {
    this.inventoryService.get_csv().subscribe((response)=>{
      this.downLoadFile(response, "text/csv")
    })
  }
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
}

}
