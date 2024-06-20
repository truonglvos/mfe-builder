import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgEventBus } from 'ng-event-bus';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SourceEffect } from '@states/source/source.effect';
import { BuilderEffect } from '@states/builder/builder.effect';
import { MenuEffect } from '@states/menu/menu.effect';
import { reducers } from './@states';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from 'src/environments/environment';

import * as menuReducer from './@states/menu/menu.reducer';
import * as sourceReducer from './@states/source/source.reducer';
import * as builderReducer from './@states/builder/builder.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forFeature('menu', menuReducer.reducer),
    StoreModule.forFeature('source', sourceReducer.reducer),
    StoreModule.forFeature('builder', builderReducer.reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
    }),
    EffectsModule.forFeature([SourceEffect, BuilderEffect, MenuEffect]),

    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [NgEventBus],
  bootstrap: [AppComponent],
})
export class BuilderModule {}
