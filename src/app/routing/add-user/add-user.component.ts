import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
declare var $: any

@Component
  ({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
  })
export class AddUserComponent implements OnInit
{
  formName: string = '';
  formEmail: string = '';
  formPhone: string = '';
  formState: string = '';
  formCity: string = '';
  formAddress: string = '';
  formDni: string = '';

  modalAlert: string = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void
  {

  }

  async save()
  {
    // si se aprueba el formulario se podra enviar a la DB
    if (this.validateForm())
    {
      let response = await this.accountService.registerUser(this.formName, this.formEmail, this.formPhone, this.formAddress, this.formState, this.formCity, this.formDni);
      
      this.modalAlert = response.register;
      if (response.register == 'successful registration.')
      {
        // clear form and init
        this.initForm();
      }
      
      // open modal
      $('#modal').modal('show');
    }
  }

  private initForm()
  {
    this.formName = '';
    this.formEmail = '';
    this.formPhone = '';
    this.formState = '';
    this.formCity = '';
    this.formAddress = '';
    this.formDni = '';

    this.setFormInit('formName');
    this.setFormInit('formEmail');
    this.setFormInit('formPhone');
    this.setFormInit('formState');
    this.setFormInit('formCity');
    this.setFormInit('formAddress');
    this.setFormInit('formDni');
  }
  /**
   * Validacion de los campos del formulario
   */
  private validateForm(): boolean
  {
    let formValidate = true;
    if (this.formName.trim() == '')
    {
      this.setFormError('formName', 'No empty value');
      formValidate = false;
    }
    else if (this.formName.trim().length < 6)
    {
      this.setFormError('formName', 'Use full name!');
      formValidate = false;
    }
    else
    {
      this.setFormFine('formName', 'Look Good');
    }
    // ----------------------------------------------------------------
    if (!this.formEmail.includes('@') || !this.formEmail.includes('.'))
    {
      this.setFormError('formEmail', 'Invalid email.');
      formValidate = false;
    }
    else
    {
      this.setFormFine('formEmail', 'Look Good');
    }
    // ----------------------------------------------------------------
    if (this.formState.trim() == '')
    {
      this.setFormError('formState', 'No empty value');
      formValidate = false;
    }
    else if (this.formState.trim().length < 3)
    {
      this.setFormError('formState', 'Use full state!');
      formValidate = false;
    }
    else
    {
      this.setFormFine('formState', 'Look Good');
    }
    // ----------------------------------------------------------------
    if (this.formCity.trim() == '')
    {
      this.setFormError('formCity', 'No empty value');
      formValidate = false;
    }
    else if (this.formCity.trim().length < 3)
    {
      this.setFormError('formCity', 'Use full state!');
      formValidate = false;
    }
    else
    {
      this.setFormFine('formCity', 'Look Good');
    }
    // ----------------------------------------------------------------
    if (this.formAddress.trim() == '')
    {
      this.setFormError('formAddress', 'No empty value');
      formValidate = false;
    }
    else if (this.formAddress.trim().length < 6)
    {
      this.setFormError('formAddress', 'Use full address!');
      formValidate = false;
    }
    else
    {
      this.setFormFine('formAddress', 'Look Good');
    }
    // ----------------------------------------------------------------
    if (this.formPhone.trim() == '')
    {
      this.setFormError('formPhone', 'No empty value');
      formValidate = false;
    }
    else if (this.formPhone.trim().length < 6)
    {
      this.setFormError('formPhone', 'invalid phone!');
      formValidate = false;
    }
    else if (isNaN(Number(this.formPhone)))
    {
      this.setFormError('formPhone', 'phone cant container char, use only numbers!');
      formValidate = false;
    }
    else
    {
      this.setFormFine('formPhone', 'Look Good');
    }
    // ----------------------------------------------------------------
    if (this.formDni.trim() == '')
    {
      this.setFormError('formDni', 'No empty value');
      formValidate = false;
    }
    else if (this.formDni.trim().length < 6)
    {
      this.setFormError('formDni', 'invalid dni!');
      formValidate = false;
    }
    else if (isNaN(Number(this.formDni)))
    {
      this.setFormError('formDni', 'DNI cant container char, use only numbers!');
      formValidate = false;
    }
    else
    {
      this.setFormFine('formDni', 'Look Good');
    }
    return formValidate;
  }

  private setFormError(elementId: string, message: string): void
  {
    let formControl = document.getElementById(elementId).parentElement.parentElement;
    let small = formControl.querySelector('small');
    small.className = 'small-error';
    small.innerHTML = message;

    let input = formControl.querySelector('input');
    input.classList.remove('border-fine');
    input.classList.add('border-error');
  }

  private setFormFine(elementId: string, message: string): void
  {
    let formControl = document.getElementById(elementId).parentElement.parentElement;
    let small = formControl.querySelector('small');
    small.className = 'small-fine';
    small.innerHTML = message;

    let input = formControl.querySelector('input');
    input.classList.remove('border-error');
    input.classList.add('border-fine');
  }

  private setFormInit(elementId: string): void
  {
    let formControl = document.getElementById(elementId).parentElement.parentElement;
    let small = formControl.querySelector('small');
    small.className = 'small-hidden';
    small.innerHTML = '.';

    let input = formControl.querySelector('input');
    input.classList.remove('border-error');
    input.classList.remove('border-fine');
  }

}
