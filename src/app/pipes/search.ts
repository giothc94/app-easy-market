import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(value: any, args: string) {
        if (!value) {
            return null;
        }
        if(!args){
            return value;
        }
        return value.filter((item)=>{
            return JSON.stringify(item).includes(args)
        });
    }

}