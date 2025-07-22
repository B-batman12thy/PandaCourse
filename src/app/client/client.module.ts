// src/app/client/client.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ClientRoutingModule],
})
export class ClientModule {}
