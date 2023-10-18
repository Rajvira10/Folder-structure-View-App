export interface Folder {
  _id: string;
  name: string;
  isRoot: boolean;
  parent?: string;
}
