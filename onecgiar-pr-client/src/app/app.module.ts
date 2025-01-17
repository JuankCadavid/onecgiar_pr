import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/components/navigation-bar/navigation-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderPanelComponent } from './shared/components/header-panel/header-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilsComponentsModule } from './shared/components/utils-components/utils-components.module';
import { ExternalToolsComponent } from './shared/components/external-tools/external-tools.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent, FooterComponent, HeaderPanelComponent, ExternalToolsComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, UtilsComponentsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
