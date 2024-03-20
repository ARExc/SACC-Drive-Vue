function createFileDto(file) {
    const newFile = {
        fileName: file.name,
        folderType: 0,
        fileCategory: 5,
        fileSize: file.size,
    };
    const result = file.type;
    // console.log(result);
    //1：视频 2：音频 3：文档 4：图片 5：其他
    if (/^video\//.test(result)) {
        newFile.fileCategory = 1;
    } else if (/^audio\//.test(result)) {
        newFile.fileCategory = 2;
    } else if (/^text\//.test(result)) {
        newFile.fileCategory = 3;
    } else if (/^image\//.test(result)) {
        newFile.fileCategory = 4;
    }
    return newFile;
}
export default createFileDto;