import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
import {brandRegions} from './components/experimental/brandRegions.ts';
await mkdir('public/assets/v1/brands',{recursive:true});
for(const [x,y,width,height,name] of brandRegions){const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-');await sharp('public/brand-logos-strip.png').extract({left:x,top:y,width,height}).png().toFile(`public/assets/v1/brands/${slug}.png`);}
for(const name of ['hero-content-shoot','proof-editing','proof-planning','case-study-interview'])await sharp(`public/placeholders/${name}.jpg`).resize({width:1600,withoutEnlargement:true}).webp({quality:88}).toFile(`public/assets/v1/${name}.webp`);
