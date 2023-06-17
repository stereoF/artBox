import * as fs from 'fs';
import * as Hash from 'ipfs-only-hash';


function readImgContent(path: string) {
    // const base64Image = fs.readFileSync(path, { encoding: 'base64' });
    // return base64Image;
    const content = fs.readFileSync(path);
    return content;
}

async function getCID(content: string) {
    const cid = await Hash.of(content);
    return cid;
}

export function useFileOperation() {
    return {
        readImgContent,
        getCID
    }
}
