import { stampFile } from './stamp-file';

export function stampFiles(files, stamp=new Date()) {
    return files.map(f => stampFile(f, stamp));
}
