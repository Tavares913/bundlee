export class Util {
  static capitalizeEachWord(text: string) {
    const words = text.split(' ');
    let retval = '';
    for (let word of words)
      retval += word[0].toUpperCase() + word.substring(1) + ' ';
    return retval.substring(0, retval.length - 1);
  }
}
