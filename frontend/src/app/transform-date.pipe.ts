import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  transform(date: Date): string {
    return new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo'}).substring(0, 17);
  }

}
