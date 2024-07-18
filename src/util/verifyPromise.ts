import uploadPromise from "@/util/uploadPromise.ts";
import md5Promise from "@/util/md5Promise.ts";
import {check} from "@/api/upload/check.ts";

const verifyPromise = async (file: File, uuid: string) => {

  try {
    const valueArr = await Promise.all([
      md5Promise(file)
          .then((r) => {
            console.log("文件MD5计算成功");
            return r;//确保结果可以继续传递到Promise.all中
          })
          .catch(err => {
            console.log('md5值计算失败' + err.message)
            setTimeout(() => {
              console.log('刷新');
              // window.location.reload();
            }, 500);
            return err;
          }),
      uploadPromise(file, uuid)
          .then((r) => {
            console.log("文件上传成功", r);
            return r;
          }).catch(err => {
            console.log('文件上传失败' + err.message)
            setTimeout(() => {
              console.log('刷新');
              // window.location.reload();
            }, 500);
            return err;
          })
    ]);//返回的是一个包含了所有已兑现的值的数组

    const [md5, identifier] = valueArr;
    console.log(valueArr)
    if (typeof md5 === "string" && md5 && typeof identifier === "string") {
      console.log('文件MD5:', md5);

      //上传第三步：校验文件完整性
      const checkRes = await check(md5, identifier);
      if (checkRes.data.data.status !== 1) {
        console.log('File integrity check failed');
        throw new Error(checkRes.data.errorMsg);
      }
      console.log('File integrity check succeeded');
      return ;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export default verifyPromise;
