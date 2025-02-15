## INSTALATION

```sh
npm install @er-npm/scraper --save
```

## CARA PENGGUNAAN

```js
// Menggunakan ES6 module syntax
import {
  ermp3,
  ermp4,
  yts,
  alldl,
  playstore,
  samehadakuDL,
  samehadakuSearch,
  ai,
  ttdl,
  khodam,
} from '@er-npm/scraper'

// Menggunakan CommonJS modules
const {
  ermp3,
  ermp4,
  yts,
  alldl,
  playstore,
  samehadakuDL,
  samehadakuSearch,
  ai,
  ttdl,
  khodam,
} = require('@er-npm/scraper')
```

> [!TIP]
> Jangan lupa import/definisikan dahulu functionnya sebelum mengeksekusi kodenya

```js
const name = 'sri'
khodam(name).then((forget) => console.log(forget)) //output ini akan menghasilkan khodam secara deskriptif
```

> **Full Dokumentasi Ke:** > [Read The Docs](http://er-npm.rtfd.io/)

## FEATURES

1. **Ai** - Berbagai Module Ai tersedia termasuk summary ai text to image
2. **YtMp3/YtMp4/YtSearch** - Mp3/MP4, Search/Download juga ada
3. **Samehadaku Search** - Search Anime Dari Samehadaku
4. **Samehadaku Download** - Download Link From Samehadaku
5. **PlayStore Search** - Cari Aplikasi Playstore
6. **Tiktok Downloder** - Download Konten Dari Link Tiktok
7. **Khodam** - Fitur cek khodam yang lebih deskriptif

> [!WARNING]
> Untuk Library Ini Update Sangat Slow! Silahkan Pakai Rest Apis Kami Jikalau Ada Eror Di @er-npm/scraper kami. [Er-APIs](https://er-api.biz.id/testing)

## SPECIAL THANKS

<!-- readme: contributors,collaborators,bots -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/ErRickow">
                    <img src="https://avatars.githubusercontent.com/u/172886759?v=4" width="100;" alt="ErRickow"/>
                    <br />
                    <sub><b>Just R</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/hiudyy">
                    <img src="https://avatars.githubusercontent.com/u/153995129?v=4" width="100;" alt="hiudyy"/>
                    <br />
                    <sub><b>hiudyy</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/ErNewDev0">
                    <img src="https://avatars.githubusercontent.com/u/190163315?v=4" width="100;" alt="ErNewDev0"/>
                    <br />
                    <sub><b>ErNewDev0</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/actions-user">
                    <img src="https://avatars.githubusercontent.com/u/65916846?v=4" width="100;" alt="actions-user"/>
                    <br />
                    <sub><b>actions-user</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/dependabot[bot]">
                    <img src="https://avatars.githubusercontent.com/in/29110?v=4" width="100;" alt="dependabot[bot]"/>
                    <br />
                    <sub><b>dependabot[bot]</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors,collaborators,bots -end -->

## SUPPORT ME 💖

<a href="https://trakteer.id/er_rickow/tip">
    <img src="https://edge-cdn.trakteer.id/images/embed/trbtn-red-1.png?v=24-01-2025" height="40" alt="Trakteer Saya" />
</a>

> This Project is Licensed under the [Unlicense License](https://raw.githubusercontent.com/ErRickow/npm-yt/master/license.txt)
