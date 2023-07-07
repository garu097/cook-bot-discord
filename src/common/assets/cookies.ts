import * as fs from 'fs'

function getCookies() {
    try {
         const data = fs.readFileSync('src/common/assets/cookies.txt', 'utf8')
         return data
      } catch (err) {
        console.error(err);
        return null
      }
}

export const cookies = getCookies()