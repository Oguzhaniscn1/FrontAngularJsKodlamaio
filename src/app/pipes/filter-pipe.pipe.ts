import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  //değişime uğramasını istediğimiz data product[] product gelecek filter texteki ürünün kendisi
  
  transform(value: Product[],filterText:string): Product[] {
    filterText=filterText?filterText.toLocaleLowerCase():"" //filtertext varsa küçült yoksa bişey verme  
    return filterText?value
    .filter((p:Product)=>p.productName.toLocaleLowerCase()
    .indexOf(filterText)!==-1):value;//filter array e uygulanan bir fonk. herbir ürünü küçük harf yap.index of içinde var mı diye bakar boolean türünde geri dönüş yapar eğer varsa ona göre filtre yapacak
  }

}
