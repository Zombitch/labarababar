import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ambiance',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ambiance.component.html',
  styleUrl: './ambiance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmbianceComponent {}
