import { Component, forwardRef, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective,
         FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent implements ControlValueAccessor, OnInit {
  value: string[] = [];
  control: FormControl | null;
  injector: any;

  ngOnInit(): void {
    this.setFormControl();
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective).form as FormControl;
          break;
      }
    } catch (_error) {
      this.control = new FormControl();
    }
  }

  onChange = (value: string[]) => {};
  onTouch = () => {};

  // Allow Angular to set the value on the component
  writeValue(value: string[]): void {
    this.value = value;
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form control
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  toggleValue(selectedValue: string) {
    const index = this.value.indexOf(selectedValue);

    if (index > -1) {
      this.value = [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1),
      ];
    } else {
      this.value = [...this.value, selectedValue];
    }

    this.onChange(this.value);
    this.onTouch();
  }

  isSelected(valueToCheck: string) {
    return this.value.includes(valueToCheck);
  }

  getErrorClass() {
    if (this.control) {
    // this always returns false
    console.log(this.control?.invalid, this.control?.touched, this.control?.dirty);
    return this.control?.invalid && this.control?.touched && this.control?.dirty ? 'border-error' : 'border-field';
    }
  }
}
