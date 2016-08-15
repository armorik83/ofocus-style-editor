/* tslint:disable */
declare namespace Plist {
  function parse(s: string): any;
  function build(s: any): string;
}

declare module 'plist' {
  export = Plist;
}
