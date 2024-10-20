import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    const startDate = new Date(control.value);
    const endDate = new Date(matchingControl.value);

    if (endDate < startDate) {
      matchingControl.setErrors({ dateRange: true });
      return { dateRange: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
