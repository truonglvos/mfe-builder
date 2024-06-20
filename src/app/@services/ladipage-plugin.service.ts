import { Injectable } from '@angular/core';
import { SECTION_DEFAULT_DATA } from '@constants/elements/section-const';

@Injectable({
  providedIn: 'root',
})
export class LadipagePluginService {
  constructor() {}
  getPlugin(plugin: string, a?: any, b?: any, c?: any): any {
    // console.log('plugin: ' + plugin);

    if (plugin === 'section') {
      return {
        default_data: SECTION_DEFAULT_DATA,
      };
    }
    if (plugin === 'carousel') {
      return {
        default_data: {
          ...SECTION_DEFAULT_DATA,
          type: 'carousel',
        },
      };
    }
    if (plugin === 'shape') {
      return {
        default_data: {
          SECTION_DEFAULT_DATA,
          type: 'shape',
        },
      };
    }
    if (plugin === 'banner') {
      return {
        default_data: {
          SECTION_DEFAULT_DATA,
          type: 'banner',
        },
      };
    }
    return {
      default_data: SECTION_DEFAULT_DATA,
    };
  }
}
