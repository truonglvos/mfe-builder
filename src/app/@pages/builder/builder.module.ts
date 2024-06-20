import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';

// Components
import { BuilderComponent } from './builder.component';
import { BuilderEditorComponent } from './layout/builder-editor/builder-editor.component';
import { ColorEditorComponent } from './layout/color-editor/color-editor.component';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { LoadingComponent } from './layout/loading/loading.component';
import { MainComponent } from './layout/main/main.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { BaseElementComponent } from './elements/base-element/base-element.component';
import { BoxElementComponent } from './elements/box-element/box-element.component';
import { ButtonElementComponent } from './elements/button-element/button-element.component';
import { HeadlineElementComponent } from './elements/headline-element/headline-element.component';
import { QuickEditorComponent } from './layout/builder-editor/quick-editor/quick-editor.component';

// Pipes
import { SafePipe } from './pipes/safe.pipe';
import { GetTypeResizePipe } from './pipes/get-type-resize.pipe';
import { ItemInArrayPipe } from './pipes/item-in-array.pipe';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { GetStylePipe } from './pipes/get-style.pipe';

// Other
import { NgEventBus } from 'ng-event-bus';

@NgModule({
  declarations: [
    BuilderComponent,
    BuilderEditorComponent,
    ColorEditorComponent,
    LeftMenuComponent,
    LoadingComponent,
    MainComponent,
    TopMenuComponent,
    QuickEditorComponent,

    // Elements
    BaseElementComponent,
    BoxElementComponent,
    ButtonElementComponent,
    HeadlineElementComponent,

    // Pipes
    GetStylePipe,
    SafePipe,
    GetTypeResizePipe,
    ItemInArrayPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuilderComponent,
      },
    ]),
    ColorPickerModule,

    // Directives
    LetDirective,
  ],
  providers: [NgEventBus],
})
export class BuilderModule {}
