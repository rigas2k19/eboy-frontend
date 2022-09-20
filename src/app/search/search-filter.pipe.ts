import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!keyword){
      return items;
    }
    return items.filter(item => {
      var itemFound: Boolean = false;
      for (let i = 0; i < properties.length; i++) {
        if (item[properties[i]].toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }

/*
  transform(list: any[], value: [], key: []): any {
    value.forEach((name, index) => {
      if (name) {
        list = list.filter((item) => {
          return (item[key[index]]
            .toString()
            .toLowerCase()
            .indexOf(name.toString().toLowerCase()) !== -1)
        });
      }
    });
    return list;
  }


  transform(value: any[], filters:any):any {
    return value.filter(item =>{
      return (item.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0
      && filters.category.toLowerCase().indexOf(filters.))
    })
  }
*/
}
