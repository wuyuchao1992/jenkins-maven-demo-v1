import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// 上传文件的函数
async function uploadFile(filePath: string, uploadUrl: string) {
  try {
    // 创建 FormData 实例
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    // 使用 axios 发送 POST 请求
    const response = await axios.post(uploadUrl, form, {
      headers: {
        ...form.getHeaders(), // 设置 multipart/form-data headers
      },
    });

    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// 调用上传函数，传入文件路径和上传 URL
const filePath = 'path/to/your/file.ext';
const uploadUrl = 'https://your-api-endpoint/upload';

uploadFile(filePath, uploadUrl);
