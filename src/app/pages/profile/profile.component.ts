import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  physicalUser = true;

  changeUserType(value: number) {
    if (value === 1) {
      this.physicalUser = true;
    } else {
      this.physicalUser = false;
    }
  }

  jsonIn = {
    personType: '',
    name: '',
    surname: '',
    ragSociale: '',
    inputTipoVia: '',
    inputAddress: '',
    civicNumber: '',
    inputZip: 0,
    inputCity: '',
    inputProvince: '',
    inputComune: '',
    inputLocalita: '',
    inputState: '',
    email: '',
    tel: 0,
    pec: '',
    fax: '',
    ofAge: '',
    cf: '',
    pIva: '',
  };

  printJson() {
    console.log(this.jsonIn);
  }
}
