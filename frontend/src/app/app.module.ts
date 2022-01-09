import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

import { AddInventoryComponent } from './add-inventory/add-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryDetailComponent,
    AddInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
