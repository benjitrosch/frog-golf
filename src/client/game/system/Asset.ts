export default class Asset {
  protected filePath: string
  protected fileName: string

  constructor(filePath: string) {
    this.filePath = `/assets/${filePath}`

    const directories = filePath.split('/')
    this.fileName = directories[directories.length - 1] ?? filePath
  }
}
