export default class Asset {
  public filePath: string
  public fileName: string

  constructor(filePath: string) {
    this.filePath = `/src/assets/${filePath}`

    const directories = filePath.split('/')
    this.fileName = directories[directories.length - 1] ?? filePath
  }
}
