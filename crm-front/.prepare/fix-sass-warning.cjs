// import { readFile, writeFile } from 'node:fs'
const {readFile, writeFile } = require("node:fs")
const filePath = 'node_modules\\element-ui\\packages\\theme-chalk\\src\\tag.scss'
const targetStr = '0, '
const replaceStr = '0%, '
readFile(filePath, (err, data) => {
  if (err) {
    return console.error(err)
  }
  console.log(data);
  
  let str = data.toString()
  str = str.replaceAll(targetStr, replaceStr)
  writeFile(filePath, str, (err) => {
    if (err) {
      return console.error(err)
    }
  })
})