export function maxFileSize(value, size = 200) {
  let fileSize = value / 1024 / 1024;
  if (fileSize > size) {
    return false;
  }
}
