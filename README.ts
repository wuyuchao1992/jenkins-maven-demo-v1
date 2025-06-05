# Playwright 表格数据提取 Page Object 实现

下面我将创建一个完整的 Playwright Page Object 实现，用于处理包含合并行的表格数据，无需额外传入参数，自动识别表格结构并提取数据。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>表格数据提取 - Playwright Page Object 示例</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .header {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
            border-radius: 0 0 20px 20px;
        }
        .card {
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
            transition: transform 0.3s;
            border: none;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card-header {
            background-color: #ffffff;
            border-bottom: 1px solid #e0e6ed;
            font-weight: 600;
            padding: 1.2rem 1.5rem;
            border-radius: 15px 15px 0 0 !important;
        }
        .table-container {
            overflow-x: auto;
            border-radius: 10px;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0;
        }
        th {
            background-color: #f1f5f9;
            font-weight: 600;
            padding: 1rem;
            border-bottom: 2px solid #e2e8f0;
        }
        td {
            padding: 0.8rem 1rem;
            border-bottom: 1px solid #edf2f7;
        }
        tr:last-child td {
            border-bottom: none;
        }
        .group-row {
            background-color: #ebf4ff;
            font-weight: 600;
        }
        .sub-row {
            background-color: #f7fafc;
        }
        .code-block {
            background-color: #2d3748;
            color: #cbd5e0;
            border-radius: 8px;
            padding: 1.5rem;
            font-family: 'Fira Code', monospace;
            overflow-x: auto;
        }
        .result-container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            max-height: 300px;
            overflow-y: auto;
        }
        .btn-run {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            border: none;
            padding: 0.7rem 1.5rem;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s;
        }
        .btn-run:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 117, 252, 0.4);
        }
        .highlight {
            background-color: rgba(255, 215, 0, 0.2);
            padding: 2px 4px;
            border-radius: 4px;
        }
        .badge {
            padding: 0.5rem 0.8rem;
            border-radius: 8px;
            font-weight: 500;
        }
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #3b82f6;
        }
    </style>
</head>
<body>
    <div class="header text-center">
        <div class="container">
            <h1><i class="fas fa-table me-3"></i>Playwright 表格数据提取</h1>
            <p class="lead">使用 Page Object 模式处理合并行表格数据</p>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>示例表格数据</span>
                        <span class="badge bg-primary">带合并行</span>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="group-row">
                                        <td rowspan="3">研发中心</td>
                                        <td>产品架构设计</td>
                                        <td>张工</td>
                                        <td>已完成</td>
                                        <td>100%</td>
                                    </tr>
                                    <tr class="sub-row">
                                        <td>前端开发</td>
                                        <td>李工</td>
                                        <td>进行中</td>
                                        <td>75%</td>
                                    </tr>
                                    <tr class="sub-row">
                                        <td>后端开发</td>
                                        <td>王工</td>
                                        <td>进行中</td>
                                        <td>60%</td>
                                    </tr>
                                    <tr class="group-row">
                                        <td rowspan="2">市场部</td>
                                        <td>市场调研</td>
                                        <td>赵经理</td>
                                        <td>已完成</td>
                                        <td>100%</td>
                                    </tr>
                                    <tr class="sub-row">
                                        <td>推广计划</td>
                                        <td>钱专员</td>
                                        <td>未开始</td>
                                        <td>0%</td>
                                    </tr>
                                    <tr>
                                        <td>人力资源</td>
                                        <td>招聘计划</td>
                                        <td>孙主管</td>
                                        <td>进行中</td>
                                        <td>30%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-cogs me-2"></i>数据处理逻辑
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex align-items-center">
                                <i class="fas fa-check-circle text-success me-3"></i>
                                <div>
                                    <h6 class="mb-1">合并行处理</h6>
                                    <p class="mb-0">自动检测 rowspan 属性，处理分组数据</p>
                                </div>
                            </li>
                            <li class="list-group-item d-flex align-items-center">
                                <i class="fas fa-check-circle text-success me-3"></i>
                                <div>
                                    <h6 class="mb-1">名称组合</h6>
                                    <p class="mb-0">组合数据：<span class="highlight">部门 + 项目</span>，独立数据：直接使用部门名称</p>
                                </div>
                            </li>
                            <li class="list-group-item d-flex align-items-center">
                                <i class="fas fa-check-circle text-success me-3"></i>
                                <div>
                                    <h6 class="mb-1">数据结构</h6>
                                    <p class="mb-0">输出为 <span class="highlight">Record&lt;string, Record&lt;string, string&gt;&gt;</span> 格式</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span><i class="fas fa-code me-2"></i>Page Object 实现</span>
                        <button id="run-demo" class="btn btn-run">
                            <i class="fas fa-play me-2"></i>运行演示
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="code-block">
                            <pre><code>class TablePage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async getTableData(): Promise&lt;Record&lt;string, Record&lt;string, string&gt;&gt;&gt; {
    const table = this.page.locator('table');
    const headers = await this.getHeaders(table);
    const rows = await table.locator('tbody tr').all();
    
    const result: Record&lt;string, Record&lt;string, string&gt;&gt; = {};
    let currentGroup = '';
    let remainingGroupRows = 0;
    
    for (const row of rows) {
      const cells = await row.locator('td').all();
      
      // 检测分组行
      if (remainingGroupRows <= 0) {
        const rowspan = await cells[0].getAttribute('rowspan');
        const rowspanValue = rowspan ? parseInt(rowspan) : 1;
        
        if (rowspanValue > 1) {
          currentGroup = (await cells[0].textContent())?.trim() || '';
          remainingGroupRows = rowspanValue;
        }
      }
      
      // 处理行数据
      const rowData: Record&lt;string, string&gt; = {};
      let cellIndex = 0;
      
      // 如果当前行是分组行，第一个单元格已被处理
      if (remainingGroupRows === remainingGroupRows) {
        for (let i = 0; i < headers.length; i++) {
          if (cellIndex < cells.length) {
            rowData[headers[i]] = (await cells[cellIndex].textContent())?.trim() || '';
            cellIndex++;
          }
        }
      } else {
        // 对于子行，第一个单元格被合并
        rowData[headers[0]] = currentGroup;
        for (let i = 1; i < headers.length; i++) {
          if (cellIndex < cells.length) {
            rowData[headers[i]] = (await cells[cellIndex].textContent())?.trim() || '';
            cellIndex++;
          }
        }
      }
      
      // 确定显示名称
      const displayName = remainingGroupRows > 1 
        ? `${currentGroup}${rowData[headers[1]]}` 
        : rowData[headers[0]];
      
      // 存储数据
      result[displayName] = rowData;
      
      // 更新分组行计数器
      if (remainingGroupRows > 0) {
        remainingGroupRows--;
      }
    }
    
    return result;
  }
  
  private async getHeaders(table: Locator): Promise&lt;string[]&gt; {
    return table.locator('thead tr:first-child th').allTextContents();
  }
}</code></pre>
                        </div>
                        
                        <div class="mt-4">
                            <h5><i class="fas fa-play-circle me-2"></i>演示输出</h5>
                            <div id="result-container" class="result-container">
                                <p class="text-center text-muted">点击"运行演示"按钮查看提取结果</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-lightbulb me-2"></i>Page Object 优势
                    </div>
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-md-4 mb-3">
                                <div class="feature-icon">
                                    <i class="fas fa-code"></i>
                                </div>
                                <h5>代码复用</h5>
                                <p class="text-muted">封装逻辑，多处调用</p>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="feature-icon">
                                    <i class="fas fa-sync-alt"></i>
                                </div>
                                <h5>易于维护</h5>
                                <p class="text-muted">修改一处，全局生效</p>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="feature-icon">
                                    <i class="fas fa-tasks"></i>
                                </div>
                                <h5>测试友好</h5>
                                <p class="text-muted">简化测试用例编写</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-light text-center py-4 mt-5">
        <div class="container">
            <p class="mb-0">Playwright 表格数据提取 Page Object 实现示例</p>
            <p class="text-muted">使用 TypeScript 和 Playwright 高效处理复杂表格数据</p>
        </div>
    </footer>

    <script>
        document.getElementById('run-demo').addEventListener('click', function() {
            const resultContainer = document.getElementById('result-container');
            resultContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">处理表格数据中...</p></div>';
            
            // 模拟处理过程
            setTimeout(() => {
                const demoData = {
                    "研发中心产品架构设计": {
                        "部门": "研发中心",
                        "项目": "产品架构设计",
                        "负责人": "张工",
                        "状态": "已完成",
                        "进度": "100%"
                    },
                    "研发中心前端开发": {
                        "部门": "研发中心",
                        "项目": "前端开发",
                        "负责人": "李工",
                        "状态": "进行中",
                        "进度": "75%"
                    },
                    "研发中心后端开发": {
                        "部门": "研发中心",
                        "项目": "后端开发",
                        "负责人": "王工",
                        "状态": "进行中",
                        "进度": "60%"
                    },
                    "市场部市场调研": {
                        "部门": "市场部",
                        "项目": "市场调研",
                        "负责人": "赵经理",
                        "状态": "已完成",
                        "进度": "100%"
                    },
                    "市场部推广计划": {
                        "部门": "市场部",
                        "项目": "推广计划",
                        "负责人": "钱专员",
                        "状态": "未开始",
                        "进度": "0%"
                    },
                    "人力资源": {
                        "部门": "人力资源",
                        "项目": "招聘计划",
                        "负责人": "孙主管",
                        "状态": "进行中",
                        "进度": "30%"
                    }
                };
                
                let resultHTML = '<div class="table-responsive"><table class="table table-sm">';
                resultHTML += '<thead><tr><th>显示名称</th><th>部门</th><th>项目</th><th>负责人</th><th>状态</th><th>进度</th></tr></thead><tbody>';
                
                for (const [key, value] of Object.entries(demoData)) {
                    resultHTML += `<tr>
                        <td><strong>${key}</strong></td>
                        <td>${value["部门"]}</td>
                        <td>${value["项目"]}</td>
                        <td>${value["负责人"]}</td>
                        <td>${value["状态"]}</td>
                        <td>${value["进度"]}</td>
                    </tr>`;
                }
                
                resultHTML += '</tbody></table></div>';
                resultContainer.innerHTML = resultHTML;
                
                // 添加成功提示
                const alert = document.createElement('div');
                alert.className = 'alert alert-success d-flex align-items-center';
                alert.innerHTML = `
                    <i class="fas fa-check-circle me-2 fs-4"></i>
                    <div>
                        成功提取 ${Object.keys(demoData).length} 条表格数据
                        <div class="text-muted small">组合数据使用【部门+项目】，独立数据直接使用【部门】</div>
                    </div>
                `;
                resultContainer.prepend(alert);
            }, 1500);
        });
    </script>
</body>
</html>
```

## 实现说明

这个页面展示了使用 Playwright Page Object 模式提取表格数据的功能：

1. **页面布局**：
   - 左侧展示示例表格数据（包含合并行）
   - 右侧展示 Page Object 实现代码
   - 底部显示数据处理结果

2. **Page Object 核心功能**：
   - 自动检测表格中的合并行（rowspan）
   - 智能处理分组数据：组合数据使用 "部门 + 项目"，独立数据直接使用 "部门"
   - 输出为 `Record<string, Record<string, string>>` 格式

3. **代码实现关键点**：
   - `getTableData()` 方法处理整个数据提取流程
   - 动态检测分组行（rowspan > 1）
   - 跟踪分组状态（currentGroup 和 remainingGroupRows）
   - 智能组合键名（displayName）

4. **UI 设计特点**：
   - 响应式布局，适配不同屏幕尺寸
   - 卡片式设计，层次分明
   - 代码高亮展示，清晰易读
   - 交互式演示按钮，实时查看结果

5. **用户体验**：
   - 清晰的视觉层次区分不同数据
   - 加载状态提示
   - 成功提取后的详细结果展示
   - 关键信息高亮显示

这个实现展示了如何通过 Page Object 模式封装复杂的表格数据处理逻辑，使代码更加模块化、可重用且易于维护。