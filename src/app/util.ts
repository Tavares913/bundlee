import { Collection } from './components/collections/my-collections/my-collections.component';

export class Util {
  static capitalizeEachWord(text: string | null | undefined) {
    if (!text) return '';
    const words = text.split(' ');
    let retval = '';
    for (let word of words)
      retval += word[0].toUpperCase() + word.substring(1) + ' ';
    return retval.substring(0, retval.length - 1);
  }
  static listIndividuals(c: Collection) {
    const retval: string =
      c.individuals.length > 0
        ? c.individuals.reduce((acc, cur, i) => {
            if (i === c.individuals.length - 1) {
              return acc + cur.title;
            }
            return acc + cur.title + ', ';
          }, '')
        : 'Empty';
    return retval;
  }
}
