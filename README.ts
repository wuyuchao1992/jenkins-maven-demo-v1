import { Given } from '@cucumber/cucumber';
import { DataTable } from '@cucumber/cucumber';

// 定义一个接口来表示数据行
interface FileData {
  file: string;
  fileType: string;
}

// 处理DataTable并将数据传递到其他方法
Given('I have the following data', function (dataTable: DataTable) {
  // 获取DataTable的所有行
  const rows = dataTable.raw();
  
  // 忽略表头并处理每一行数据
  const data: FileData[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const fileData: FileData = {
      file: row[0],
      fileType: row[1]
    };
    data.push(fileData);
  }

  // 传递数据到其他方法
  this.processData(data);
});

// 示例方法来处理数据
Given('processData', function (data: FileData[]) {
  data.forEach(item => {
    console.log(`File: ${item.file}, FileType: ${item.fileType}`);
  });
});
