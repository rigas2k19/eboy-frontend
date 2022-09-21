import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], value: string[], key: string []): any {
    value.forEach((name: any, index) => {
      console.log(value);
      console.log(name);
      console.log(key[index]);
      if(key[index] != 'description' && key[index] != 'name'){
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
