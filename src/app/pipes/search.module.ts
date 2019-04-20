import { NgModule } from '@angular/core';
import { SearchPipe } from './search';
@NgModule({
    imports:[
        // SearchPipe
    ],
    exports:[
        SearchPipe
    ],
    declarations:[SearchPipe]
})
export class SearchPipeModule {

}