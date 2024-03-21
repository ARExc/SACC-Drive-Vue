function createIconSrc(item){
    if (item.folderType === 1) {
        return require('@/assets/icon/folder.png')//这里的require函数调用告诉构建工具（比如Webpack），它需要处理（即包含在最终的构建结果中）这些图片资源。
    } else if (item.folderType === 0) {
        //1：视频 2：音频 3：文档 4：图片 5：其他
        if (item.fileCategory === 1) {
            return require('@/assets/icon/video.png')
        } else if (item.fileCategory === 2) {
            return require('@/assets/icon/music.png')
        } else if (item.fileCategory === 3) {
            return require('@/assets/icon/document.png')
        } else if (item.fileCategory === 4) {
            return require('@/assets/icon/picture.png')
        } else {
            return require('@/assets/icon/file.png')
        }
    } else {
        return require('@/assets/icon/file.png')
    }}
export default createIconSrc;