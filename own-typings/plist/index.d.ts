declare module Plist {
  function parse(s: string): any;
}

declare module "plist" {
  export = Plist;
}
