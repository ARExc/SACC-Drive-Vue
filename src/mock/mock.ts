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
      'fileType': '@integer(0, 1)',
      'fileCategory': '@integer(0, 5)',
      'status': '@integer(0, 1)'
    }]
  }
});

