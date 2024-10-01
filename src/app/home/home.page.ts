import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public myForm = this.fb.group({
    toppings: [[], Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log('form values: ', this.myForm);
  }
}
