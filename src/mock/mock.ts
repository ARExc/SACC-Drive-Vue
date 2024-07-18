import Mock from 'mockjs';
Mock.mock('http://localhost:3000/api/disk', 'get', {
  'records|1-10': [{
    'id|+1': 1
  }]
});
Mock.mock('http://localhost:3000/api/getFileList', 'get', {
  'code': 200,
  'errMessage': 'success',
  'data': {
    'total': 100,
    'records|4-6': [{
      'id|+1': 1,
      'filePid': '@guid',
      'fileName': '文件@integer(1, 10)',
      'fileSize': '@integer(1024, 10240)',
      'fileCover': '@integer(0, 1)',
      'fileUrl': '@url',
      'lastUpdateTime': '@datetime',
      'folderType': '@integer(0, 1)',
      'fileCategory': '@integer(0, 5)',
      'status': '@integer(0, 1)'
    }]
  }
});
//上传文件
Mock.mock(RegExp('/api/priv/file/startUpload'), 'post', {
  "code": 1,
  "errorMsg": "string",
  "data": {
    "code": 1111
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

Mock.mock('/api/login', 'post', {
  "code": 1,
  "errorMsg": "null",
  "data": {

  }
})
