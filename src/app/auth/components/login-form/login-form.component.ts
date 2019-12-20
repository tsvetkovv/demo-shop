import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../models/user.model';

@Component({
  selector: 'ds-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnChanges {
  @Input() set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() readonly submitted = new EventEmitter<Credentials>();

  form: FormGroup = new FormGroup({
    username: new FormControl('frank', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-z]*$/)]),
    password: new FormControl('frank123', [Validators.required]),
  });

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    } else {
      console.log(this.form);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errorMessage && this.errorMessage) {
      this.form.setErrors({ async: this.errorMessage });
    }
  }
}
