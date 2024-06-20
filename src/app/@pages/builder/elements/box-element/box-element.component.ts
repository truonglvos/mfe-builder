import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-box-element',
  templateUrl: './box-element.component.html',
  styleUrls: ['./box-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxElementComponent {
  @Input() styleString: string = '';
}
