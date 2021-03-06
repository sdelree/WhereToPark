import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService } from '../account.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    const spyAccount = jasmine.createSpyObj('AccountService', ['login']);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ NoopAnimationsModule, ReactiveFormsModule, MatInputModule, MatSnackBarModule ],
      providers: [
        { provide: Router, useValue: spyRouter },
        { provide: AccountService, useValue: spyAccount }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
