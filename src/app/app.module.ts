import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat'; 
import {  provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage} from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getFirestore } from 'firebase/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { environment } from '../environments/environment';
import { HotToastModule } from '@ngneat/hot-toast';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { MatSidenavModule} from '@angular/material/sidenav';
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
import { FlexLayoutModule} from '@angular/flex-layout';
// import { MatCardModule} from '@angular/material/card';
// import { MatCardActions } from '@angular/material/card';
// import {MatCardContent} from '@angular/material/card';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatToolbarModule,
    // MatCardModule,
    // MatCardActions,
    // MatCardContent,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FlexLayoutModule,
    AngularFireModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    HotToastModule.forRoot(),
    provideStorage(()=> getStorage())
  ],
  providers: [
    AuthGuardService,
    AdminAuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
