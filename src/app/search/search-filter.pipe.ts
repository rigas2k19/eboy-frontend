import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], value: string[], key: string []): any {
    value.forEach((name: any, index) => {
      if(key[index] == 'currently'){
        //filter for price
        let price_range: string[] = value[index].split("-", 2);
        if(price_range[1] != '0'){
          let min:number = price_range[0] as unknown as number;
          let max:number = price_range[1] as unknown as number;
          list = list.filter((item) => {
            return (item[key[index]] >= min && item[key[index]] <= max)
          });
        }

      }else if(key[index] != 'description' && key[index] != 'name'){
        if (name) {
          list = list.filter((item) => {
            return (item[key[index]]
              .toString()
              .toLowerCase()
              .indexOf(name.toString().toLowerCase()) !== -1)
          });
        }
      }else{
        if (name) {
          list = list.filter((item) => {
            return (item['name']
              .toString()
              .toLowerCase()
              .indexOf(name.toString().toLowerCase()) !== -1 || item['description']
              .toString()
              .toLowerCase()
              .indexOf(name.toString().toLowerCase()) !== -1 )
          });
        }
      }

    });
    return list;
  }

}

