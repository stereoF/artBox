import * as fs from 'fs';
import * as Hash from 'ipfs-only-hash'; 


function readImgContent(path: string) {
    // const base64Image = fs.readFileSync(path, { encoding: 'base64' });
    // return base64Image;
    const content = fs.readFileSync(path);
    return content;
}

async function getCID(path: string) {
    const base64Image = readImgContent(path);
    const cid = await Hash.of(base64Image);
    return cid
}


export function useFileOperation() {

    return {
        readImgContent,
        getCID
    }
}