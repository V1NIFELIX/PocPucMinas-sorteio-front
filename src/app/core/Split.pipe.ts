import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'split'
  })
  export class SplitPipe implements PipeTransform {
    transform(val:any, params:string[]):string[] {
      return val.split(" ")[0];
    }
  }