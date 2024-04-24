// 引入mock.js模块
import Mock from 'mockjs';

// 使用Mock.mock方法模拟数据
Mock.mock('http://localhost:8080/api/priv/file/getFileList', 'get', {
    "code": 1,
    "errorMsg": "null",
    "data": {
        "total": 88,
        "records|5": [ // 生成5个记录，如需更多可调整数字
            {
                "id|1-100": 1, // 使用Mock.js的@guid方法生成唯一ID
                "status|1-60": 1, // 随机生成1到60之间的整数
                "folderType|0-1": 1,// 0：文件 1：文件夹
                "createTime": "@datetime", // 生成随机日期时间
                "lastUpdateTime": "@datetime",
                "fileCover": "@image('200x100', '#50B347', '#FFF', 'Mock.js')", // 生成示例图片
                "fileName": "test@integer(1, 5)", // 生成文件名后跟随1到5之间的数字
                "fileSize": "@integer(20, 100)", // 随机生成20到100之间的整数
                "filePid": "@guid",
                "fileCategory|1-5": 1 //1：视频 2：音频 3：文档 4：图片 5：其他
            }
        ]
    }
});
Mock.mock(RegExp('/api/priv/file/startDownload/*'), 'get', {
    // console.log('url:',options.url);
    "code": 1,
    "errorMsg": "null",
    "data": {
        "chunkTotal": 0,
        "fileName": "string",
        "fileSize": 0,
        "code": "string"
    }
});
Mock.mock(RegExp('/api/priv/file/download/*'), 'get', {
    "code": 1,
    "errorMsg": "null",
    "data": {}
});
Mock.mock(RegExp('/api/priv/file/newFolder'), 'post', {
    "code": 1,
    "errorMsg": "null",
    "data": {}
});


//上传文件
Mock.mock(RegExp('/api/priv/file/startUpload'), 'post', {
    "code": 1,
    "errorMsg": "string",
    "data": {
        "status": 0
    }
});
Mock.mock(RegExp('/api/priv/file/upload'), 'post', {
    "code": 1,
    "errorMsg": "string",
    "data": {
        "status": 0
    }
});
Mock.mock(RegExp('/api/priv/file/check'), 'post', {
    "code": 1,
    "errorMsg": "null",
    "data": {
        "id": 2,
        "status": 1,
        "fileMd5": "asdfcasfcew213r2cd31534121c2ercx12431",
        "chunkNumber": 2,
        "chunkSize": "10MB",
        "fileName": "文件1",
        "chunkTotal": 15
    }
});

//回收站
Mock.mock(RegExp('/api/priv/file/delFiles/*'), 'delete', {
    "code": 0,
    "errorMsg": "string",
    "data": {
        "status": 0
    }
});
Mock.mock(
    RegExp('/api/recycle/getRecycleList'), 'get', {
        "code": 1,
        "errorMsg": "null",
        "data": {
            "total": 88,
            "records|5": [ // 生成5个记录，如需更多可调整数字
                {
                    "id": "@guid", // 使用Mock.js的@guid方法生成唯一ID
                    "status|1-60": 1, // 随机生成1到60之间的整数
                    "folderType|0-1": 1,// 0：文件 1：文件夹
                    "createTime": "@datetime", // 生成随机日期时间
                    "lastUpdateTime": "@datetime",
                    "fileCover": "@image('200x100', '#50B347', '#FFF', 'Mock.js')", // 生成示例图片
                    "fileName": "test@integer(1, 5)", // 生成文件名后跟随1到5之间的数字
                    "fileSize": "@integer(20, 100)", // 随机生成20到100之间的整数
                    "filePid": "@guid",
                    "fileCategory|1-5": 1 //1：视频 2：音频 3：文档 4：图片 5：其他
                }
            ]
        }
    }
)


// 输出模拟的数据，实际使用时可以根据需要进行调用
// console.log(JSON.stringify(data, null, 2));

