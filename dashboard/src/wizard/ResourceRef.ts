export class ResourceReference {
  path: string;
  revision: string;
  name?: string;

  constructor(path: string, rev: string, name?: string) {
    this.path = path;
    this.revision = rev;
    this.name = name;
  }

  key(): string {
    return `${this.path}:${this.revision}`;
  }
}
