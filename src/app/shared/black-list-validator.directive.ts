import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appBlackList]',
  providers: [{provide: NG_VALIDATORS, useExisting: BlackListValidatorDirective, multi: true}]
})
export class BlackListValidatorDirective implements Validator {
  @Input('appBlackList') appBlackList: Array<string>;
  @Input() appBlackListStrict = true;

  validator: ValidatorFn;

  private blackListValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.appBlackList == null || control.value == null) {
        return null;
      }
      let isValid: boolean;
      if (this.appBlackListStrict) {
        isValid = !this.appBlackList.includes(control.value);
      } else {
        isValid = !this.appBlackList.some(item => item.trim().toLowerCase() === control.value.trim().toLowerCase());
      }
      return isValid ? null : {blackList: {valid: false}};
    };
  }

  constructor() {
    this.validator = this.blackListValidator();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }

}
