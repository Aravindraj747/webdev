import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminsidenavComponent } from './admin/adminsidenav/adminsidenav.component';
import { AgentCreationComponent } from './admin/agent-creation/agent-creation.component';
import { AgentComponent } from './admin/agent/agent.component';
import { LeadsComponent } from './admin/leads/leads.component';
import { AgentHomeComponent } from './agent/agent-home/agent-home.component';
import { InsuranceComponent } from './agent/insurance/insurance.component';
import { LeadComponent } from './agent/lead/lead.component';
import { SellnowComponent } from './agent/sellnow/sellnow.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SignupComponent } from './components/signup/signup.component';
import { BuyComponent } from './user/buy/buy.component';
import { CommercialComponent } from './user/commercial/commercial.component';
import { LeaseComponent } from './user/lease/lease.component';
import { PgComponent } from './user/pg/pg.component';
import { PlotComponent } from './user/plot/plot.component';
import { RentComponent } from './user/rent/rent.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent
  },
  {path:'login',component:LoginComponent,},
  {path:'sign-up',component:SignupComponent,},
  {path:'home',component:HomeComponent,
    // canActivate:[AuthGuardService]
  },
// Admin
  {path:'admin',component:AdminComponent},
  {path:'admin-home',component:AdminHomeComponent},
  {path:'agent',component:AgentComponent},
  {path:'agent-create',component:AgentCreationComponent},
  {path:'leads',component:LeadsComponent},  
  {path:'adminsidenav',component:AdminsidenavComponent},
// Users
  {path:'userhome',component:UserHomeComponent},
  {path:'buy',component:BuyComponent},
  {path:'rent',component:RentComponent},
  {path:'lease',component:LeaseComponent},
  {path:'commercial',component:CommercialComponent,},
  {path:'plot',component:PlotComponent},
  {path:'pg',component:PgComponent},
// Agents
  {path:'sidenav',component:SidenavComponent},
  {path:'agenthome',component:AgentHomeComponent},
  {path:'sellnow',component:SellnowComponent},
  {path:'agent',component:AgentHomeComponent},
  {path:'lead',component:LeadComponent},
  {path:'insurance',component:InsuranceComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
