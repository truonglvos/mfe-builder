import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { InjectStyleService } from 'SHELL/InjectStyleService';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
})
export class BuilderComponent implements OnInit, OnDestroy {
  constructor(@Inject(InjectStyleService) private inject: InjectStyleService) {}
  ngOnInit(): void {
    this.inject.attact(`${process.env['BUILDER_URL']}/styles.css`);
  }

  ngOnDestroy(): void {
    this, this.inject.deAttact();
  }
}
