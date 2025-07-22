import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {
  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const parent = inject(CoreModule, { optional: true, skipSelf: true })!;

    if (parent) throw new Error('CoreModule is already loaded.');
  }
}
