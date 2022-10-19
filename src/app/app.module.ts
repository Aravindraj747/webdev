import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgentAuthGuardService } from './services/Agent-auth-guard.service';
import { UserAuthGuardService} from './services/user-auth-guard.service';

//Firebase 
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat'; 
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage} from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; 

// Material
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
// import { MatdialogAction} from '@angular/material/dialog';

import { FlexLayoutModule} from '@angular/flex-layout';

// Components
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { BuyComponent } from './user/buy/buy.component';
import { RentComponent } from './user/rent/rent.component';
import { PlotComponent } from './user/plot/plot.component';
import { CommercialComponent } from './user/commercial/commercial.component';
import { LeaseComponent } from './user/lease/lease.component';
import { PgComponent } from './user/pg/pg.component';
import { AgentHomeComponent } from './agent/agent-home/agent-home.component';
import { SellnowComponent } from './agent/sellnow/sellnow.component';
import { LeadComponent } from './agent/lead/lead.component';
import { InsuranceComponent } from './agent/insurance/insurance.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AgentComponent } from './admin/agent/agent.component';
import { AgentCreationComponent } from './admin/agent-creation/agent-creation.component';
import { LeadsComponent } from './admin/leads/leads.component';
import { AdminsidenavComponent } from './admin/adminsidenav/adminsidenav.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AgentloginComponent } from './agent/agentlogin/agentlogin.component';
import { SafePipe } from './safe.pipe';
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import { DialogComponent } from './admin/dialog/dialog.component';
import { AgentProfileComponent } from './agent/agent-profile/agent-profile.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { UserpolicyComponent } from './user/userpolicy/userpolicy.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import { ClaimComponent } from './agent/claim/claim.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    SidenavComponent,
    UserHomeComponent,
    BuyComponent,
    RentComponent,
    PlotComponent,
    CommercialComponent,
    LeaseComponent,
    PgComponent,
    AgentHomeComponent,
    SellnowComponent,
    LeadComponent,
    InsuranceComponent,
    AdminHomeComponent,
    AgentComponent,
    AgentCreationComponent,
    LeadsComponent,
    AdminsidenavComponent,
    AdminhomeComponent,
    AgentloginComponent,
    SafePipe,
    DialogComponent,
    AgentProfileComponent,
    UserprofileComponent,
    UserpolicyComponent,
    ClaimComponent
  ],
  entryComponents: [DialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatTableModule,
        MatSliderModule,
        MatDialogModule,
        MatSnackBarModule,
        AngularFireAuthModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        FlexLayoutModule,
        AngularFireModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        AngularFireModule.initializeApp(environment.firebase),
        provideStorage(() => getStorage()),
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule
    ],
  providers: [
    AgentAuthGuardService,
    UserAuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
