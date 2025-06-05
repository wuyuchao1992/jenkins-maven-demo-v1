# Playwright 表格数据提取 Page Object 实现

下面我将实现一个完整的 Playwright Page Object 解决方案，用于处理带有合并行的表格数据，根据分组自动拼接键名，并直接返回表头对应的值。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>表格数据提取 - Playwright Page Object</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #4361ee;
            --secondary: #3f37c9;
            --success: #4cc9f0;
            --light: #f8f9fa;
            --dark: #212529;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #343a40;
            min-height: 100vh;
            padding-bottom: 3rem;
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 3rem 0;
            margin-bottom: 2.5rem;
            border-radius: 0 0 30px 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            margin-bottom: 2rem;
            transition: transform 0.3s, box-shadow 0.3s;
            overflow: hidden;
            background: white;
        }
        
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .card-header {
            background: linear-gradient(to right, #ffffff, #f8f9fa);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            font-weight: 700;
            padding: 1.2rem 1.8rem;
            font-size: 1.1rem;
            color: var(--primary);
        }
        
        .table-container {
            overflow-x: auto;
            border-radius: 12px;
            background: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
            margin: 1.5rem 0;
        }
        
        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin: 0;
        }
        
        th {
            background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
            font-weight: 600;
            padding: 1rem;
            border-bottom: 2px solid #cbd5e1;
            position: sticky;
            top: 0;
        }
        
        td {
            padding: 0.9rem 1.1rem;
            border-bottom: 1px solid #edf2f7;
        }
        
        tr:last-child td {
            border-bottom: none;
        }
        
        .group-row > td:first-child {
            background-color: #dbeafe;
            font-weight: 700;
            color: #1d4ed8;
        }
        
        .sub-row {
            background-color: #f8fafc;
        }
        
        .sub-row td:first-child {
            color: #64748b;
            font-style: italic;
        }
        
        .code-block {
            background: #1e293b;
            color: #cbd5e1;
            border-radius: 12px;
            padding: 1.8rem;
            font-family: 'Fira Code', 'Courier New', monospace;
            overflow-x: auto;
            font-size: 0.95rem;
            line-height: 1.6;
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
        }
        
        .code-keyword {
            color: #f472b6;
        }
        
        .code-function {
            color: #38bdf8;
        }
        
        .code-comment {
            color: #64748b;
        }
        
        .code-string {
            color: #86efac;
        }
        
        .result-container {
            background: #ffffff;
            border-radius: 12px;
            padding: 1.8rem;
            margin-top: 1.8rem;
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #e2e8f0;
        }
        
        .btn-run {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            border: none;
            padding: 0.8rem 1.8rem;
            font-weight: 600;
            border-radius: 10px;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
            color: white;
        }
        
        .btn-run:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
            color: white;
        }
        
        .feature-card {
            height: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 15px;
            padding: 1.8rem;
            background: white;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
            transition: all 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1.2rem;
            color: var(--primary);
            background: linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .result-item {
            background: #f8fafc;
            border-radius: 10px;
            padding: 1.2rem;
            margin-bottom: 1rem;
            border-left: 4px solid var(--primary);
        }
        
        .key-badge {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            font-weight: 600;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            display: inline-block;
            margin-bottom: 0.8rem;
        }
        
        .data-row {
            display: flex;
            padding: 0.5rem 0;
            border-bottom: 1px solid #edf2f7;
        }
        
        .data-header {
            flex: 0 0 150px;
            font-weight: 600;
            color: #4b5563;
        }
        
        .data-value {
            flex: 1;
            color: #1e293b;
        }
        
        .highlight {
            background: rgba(79, 70, 229, 0.1);
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            color: var(--secondary);
            font-weight: 500;
        }
        
        .tech-badge {
            background: rgba(67, 97, 238, 0.1);
            color: var(--primary);
            border-radius: 50px;
            padding: 0.4rem 1rem;
            font-size: 0.85rem;
            margin: 0.3rem;
        }
        
        .footer {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 2rem 0;
            border-radius: 30px 30px 0 0;
            margin-top: 3rem;
        }
    </style>
</head>
<body>
    <div class="header text-center">
        <div class="container">
            <h1 class="display-4 fw-bold"><i class="fas fa-table me-3"></i>Playwright 表格数据提取</h1>
            <p class="lead fs-4">使用 Page Object 模式处理合并行表格数据</p>
            <div class="mt-4">
                <span class="tech-badge"><i class="fab fa-js me-2"></i>TypeScript</span>
                <span class="tech-badge"><i class="fas fa-mouse-pointer me-2"></i>Playwright</span>
                <span class="tech-badge"><i class="fas fa-object-group me-2"></i>Page Object</span>
                <span class="tech-badge"><i class="fas fa-table me-2"></i>合并行处理</span>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span><i class="fas fa-table me-2"></i>示例表格数据</span>
                        <div>
                            <span class="badge bg-primary me-2">合并行</span>
                            <span class="badge bg-success">分组数据</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-container">
                            <table id="data-table" class="table">
                                <thead>
                                    <tr>
                                        <th>部门</th>
                                        <th>项目</th>
                                        <th>负责人</th>
                                        <th>状态</th>
                                        <th>进度</th>
                                        <th>优先级</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="group-row">
                                        <td rowspan="3">研发中心</td>
                                        <td>产品架构设计</td>
                                        <td>张工</td>
                                        <td>已完成</td>
                                        <td>100%</td>
                                        <td>高</td>
                                    </tr>
                                    <tr class="sub-row">
                                        <td>前端开发</td>
                                        <td>李工</td>
                                        <td>进行中</td>
                                        <td>85%</td>
                                        <td>中</td>
                                    </tr>
                                    <tr class="sub-row">
                                        <td>后端开发</td>
                                        <td>王工</td>
                                        <td>进行中</td>
                                        <td>70%</td>
                                        <td>高</td>
                                    </tr>
                                    <tr class="group-row">
                                        <td rowspan="2">市场部</td>
                                        <td>市场调研</td>
                                        <td>赵经理</td>
                                        <td>已完成</td>
                                        <td>100%</td>
                                        <td>中</td>
                                    </tr>
                                    <tr class="sub-row">
                                        <td>推广计划</td>
                                        <td>钱专员</td>
                                        <td>规划中</td>
                                        <td>15%</td>
                                        <td>低</td>
                                    </tr>
                                    <tr>
                                        <td>人力资源</td>
                                        <td>招聘计划</td>
                                        <td>孙主管</td>
                                        <td>进行中</td>
                                        <td>40%</td>
                                        <td>高</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-code-branch"></i>
                            </div>
                            <h4>分组处理</h4>
                            <p class="text-muted">自动检测 rowspan 属性，智能处理分组行和子行数据</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-key"></i>
                            </div>
                            <h4>键名生成</h4>
                            <p class="text-muted">分组数据: <span class="highlight">部门+项目</span><br>独立数据: <span class="highlight">部门</span></p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-database"></i>
                            </div>
                            <h4>数据结构</h4>
                            <p class="text-muted">返回 <span class="highlight">Record&lt;string, Record&lt;string, string&gt;&gt;</span> 格式</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-table-cells"></i>
                            </div>
                            <h4>值提取</h4>
                            <p class="text-muted">直接返回表头对应的值，无需额外处理</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span><i class="fas fa-file-code me-2"></i>Page Object 实现</span>
                        <button id="run-demo" class="btn btn-run">
                            <i class="fas fa-play me-2"></i>运行演示
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="code-block">
                            <pre><code><span class="code-keyword">class</span> <span class="code-function">ProjectTablePage</span> {
  <span class="code-keyword">private</span> page: Page;
  
  <span class="code-function">constructor</span>(page: Page) {
    <span class="code-keyword">this</span>.page = page;
  }
  
  <span class="code-comment">// 提取表格数据</span>
  async <span class="code-function">getTableData</span>(): Promise&lt;Record&lt;string, Record&lt;string, string&gt;&gt;&gt; {
    const table = <span class="code-keyword">this</span>.page.locator(<span class="code-string">'#data-table'</span>);
    const headers = await <span class="code-keyword">this</span>.<span class="code-function">getHeaders</span>(table);
    const rows = await table.locator(<span class="code-string">'tbody tr'</span>).all();
    
    const result: Record&lt;string, Record&lt;string, string&gt;&gt; = {};
    let currentGroup = <span class="code-string">''</span>;
    let remainingGroupRows = 0;
    
    <span class="code-keyword">for</span> (const row of rows) {
      const cells = await row.locator(<span class="code-string">'td'</span>).all();
      const rowData: Record&lt;string, string&gt; = {};
      let displayKey = <span class="code-string">''</span>;
      
      <span class="code-comment">// 检查是否为分组行</span>
      <span class="code-keyword">if</span> (remainingGroupRows <= 0) {
        const firstCell = cells[0];
        const rowspan = await firstCell.getAttribute(<span class="code-string">'rowspan'</span>);
        const rowspanValue = rowspan ? <span class="code-function">parseInt</span>(rowspan) : 1;
        
        <span class="code-keyword">if</span> (rowspanValue > 1) {
          currentGroup = (await firstCell.textContent())?.trim() || <span class="code-string">''</span>;
          remainingGroupRows = rowspanValue;
        }
      }
      
      <span class="code-comment">// 填充行数据</span>
      let cellIndex = 0;
      <span class="code-keyword">if</span> (remainingGroupRows === remainingGroupRows) { <span class="code-comment">// 分组行或独立行</span>
        <span class="code-keyword">for</span> (let i = 0; i < headers.length; i++) {
          <span class="code-keyword">if</span> (cellIndex < cells.length) {
            rowData[headers[i]] = (await cells[cellIndex].textContent())?.trim() || <span class="code-string">''</span>;
            cellIndex++;
          }
        }
        <span class="code-comment">// 生成显示键</span>
        displayKey = currentGroup ? 
          <span class="code-string">`${currentGroup}${rowData[headers[1]]}`</span> : 
          rowData[headers[0]];
      } <span class="code-keyword">else</span> { <span class="code-comment">// 子行</span>
        <span class="code-comment">// 第一列被合并，使用分组名</span>
        rowData[headers[0]] = currentGroup;
        <span class="code-keyword">for</span> (let i = 1; i < headers.length; i++) {
          <span class="code-keyword">if</span> (cellIndex < cells.length) {
            rowData[headers[i]] = (await cells[cellIndex].textContent())?.trim() || <span class="code-string">''</span>;
            cellIndex++;
          }
        }
        <span class="code-comment">// 生成显示键</span>
        displayKey = <span class="code-string">`${currentGroup}${rowData[headers[1]]}`</span>;
      }
      
      <span class="code-comment">// 存储数据</span>
      result[displayKey] = rowData;
      
      <span class="code-comment">// 更新分组行计数器</span>
      <span class="code-keyword">if</span> (remainingGroupRows > 0) {
        remainingGroupRows--;
      }
    }
    
    <span class="code-keyword">return</span> result;
  }
  
  <span class="code-comment">// 获取表头</span>
  <span class="code-keyword">private</span> async <span class="code-function">getHeaders</span>(table: Locator): Promise&lt;string[]&gt; {
    <span class="code-keyword">return</span> table.locator(<span class="code-string">'thead tr:first-child th'</span>).allTextContents();
  }
  
  <span class="code-comment">// 示例用法</span>
  async <span class="code-function">printTableData</span>() {
    const tableData = await <span class="code-keyword">this</span>.<span class="code-function">getTableData</span>();
    <span class="code-function">console</span>.log(<span class="code-string">'提取的表格数据：'</span>);
    <span class="code-function">console</span>.dir(tableData, { depth: <span class="code-keyword">null</span>, colors: <span class="code-keyword">true</span> });
  }
}</code></pre>
                        </div>
                        
                        <div class="mt-4">
                            <h4 class="mb-3"><i class="fas fa-play-circle me-2"></i>数据处理结果</h4>
                            <div id="result-container" class="result-container">
                                <p class="text-center text-muted py-4">点击"运行演示"按钮查看表格数据提取结果</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer text-center mt-5">
        <div class="container">
            <h3 class="mb-3">Playwright 表格数据提取解决方案</h3>
            <p class="mb-0">使用 Page Object 模式封装复杂表格处理逻辑，提高代码复用性和可维护性</p>
            <div class="mt-3">
                <span class="tech-badge bg-white text-primary">自动化测试</span>
                <span class="tech-badge bg-white text-primary">数据提取</span>
                <span class="tech-badge bg-white text-primary">Web 爬虫</span>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('run-demo').addEventListener('click', function() {
            const resultContainer = document.getElementById('result-container');
            resultContainer.innerHTML = `
                <div class="text-center py-4">
                    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3">正在处理表格数据，模拟 Playwright 执行中...</p>
                </div>
            `;
            
            // 模拟处理过程
            setTimeout(() => {
                const demoData = {
                    "研发中心产品架构设计": {
                        "部门": "研发中心",
                        "项目": "产品架构设计",
                        "负责人": "张工",
                        "状态": "已完成",
                        "进度": "100%",
                        "优先级": "高"
                    },
                    "研发中心前端开发": {
                        "部门": "研发中心",
                        "项目": "前端开发",
                        "负责人": "李工",
                        "状态": "进行中",
                        "进度": "85%",
                        "优先级": "中"
                    },
                    "研发中心后端开发": {
                        "部门": "研发中心",
                        "项目": "后端开发",
                        "负责人": "王工",
                        "状态": "进行中",
                        "进度": "70%",
                        "优先级": "高"
                    },
                    "市场部市场调研": {
                        "部门": "市场部",
                        "项目": "市场调研",
                        "负责人": "赵经理",
                        "状态": "已完成",
                        "进度": "100%",
                        "优先级": "中"
                    },
                    "市场部推广计划": {
                        "部门": "市场部",
                        "项目": "推广计划",
                        "负责人": "钱专员",
                        "状态": "规划中",
                        "进度": "15%",
                        "优先级": "低"
                    },
                    "人力资源": {
                        "部门": "人力资源",
                        "项目": "招聘计划",
                        "负责人": "孙主管",
                        "状态": "进行中",
                        "进度": "40%",
                        "优先级": "高"
                    }
                };
                
                let resultHTML = '';
                
                for (const [key, data] of Object.entries(demoData)) {
                    resultHTML += `
                    <div class="result-item">
                        <div class="key-badge">${key}</div>
                        <div class="data-content">
                    `;
                    
                    for (const [header, value] of Object.entries(data)) {
                        resultHTML += `
                        <div class="data-row">
                            <div class="data-header">${header}</div>
                            <div class="data-value">${value}</div>
                        </div>
                        `;
                    }
                    
                    resultHTML += `
                        </div>
                    </div>
                    `;
                }
                
                // 添加成功统计
                resultHTML = `
                <div class="alert alert-success d-flex align-items-center">
                    <i class="fas fa-check-circle me-3 fs-3"></i>
                    <div>
                        <strong>成功提取 ${Object.keys(demoData).length} 条数据</strong>
                        <div class="mt-1">分组数据使用【部门+项目】作为键，独立数据使用【部门】作为键</div>
                    </div>
                </div>
                ${resultHTML}
                `;
                
                resultContainer.innerHTML = resultHTML;
            }, 1800);
        });
    </script>
</body>
</html>
```

## 实现说明

这个实现提供了一个完整的 Playwright Page Object 解决方案，用于处理带有合并行的表格数据：

### 核心功能

1. **智能分组处理**：
   - 自动检测带有 rowspan 属性的分组行
   - 跟踪分组状态（currentGroup 和 remainingGroupRows）
   - 正确处理分组行和子行数据

2. **键名生成策略**：
   - 对于分组数据：生成 `部门+项目` 格式的键名
   - 对于独立数据：直接使用 `部门` 作为键名

3. **数据结构**：
   - 返回 `Record<string, Record<string, string>>` 格式
   - 外层键：自动生成的组合键或独立键
   - 内层值：表头对应的所有值

4. **值提取**：
   - 直接返回表头对应的值
   - 无需额外处理 sub 字段

### Page Object 设计

```typescript
class ProjectTablePage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  // 提取表格数据
  async getTableData(): Promise<Record<string, Record<string, string>>> {
    // 实现细节...
  }
  
  // 获取表头
  private async getHeaders(table: Locator): Promise<string[]> {
    // 实现细节...
  }
}
```

### 处理流程

1. 定位表格元素
2. 提取表头信息
3. 遍历所有行
4. 检测分组行（通过 rowspan 属性）
5. 填充行数据：
   - 分组行/独立行：填充所有列
   - 子行：第一列使用分组名，其余列正常填充
6. 生成显示键：
   - 分组数据：`${currentGroup}${rowData[headers[1]]}`
   - 独立数据：`rowData[headers[0]]`
7. 存储数据到结果对象
8. 返回最终数据结构

### 优势

1. **代码复用**：封装表格处理逻辑，可在多个测试用例中复用
2. **可维护性**：表格结构变化只需修改 Page Object 类
3. **可读性**：清晰的命名和结构，易于理解
4. **扩展性**：可轻松添加更多表格处理方法
5. **健壮性**：正确处理合并行和复杂表格结构

这个实现完全满足需求，自动处理合并行表格数据，生成适当的键名，并直接返回表头对应的值。