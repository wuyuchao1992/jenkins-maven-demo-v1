中文描述

Summary (标题):
前端数据加载及版本控制错乱问题

Description (描述):

问题1：前端数据加载失败

背景
在性能测试中发现，当同一对象类型数据量超过5万条（不同的source path）时，通过菜单查询对象数据会导致前端加载失败。

复现步骤

	•	Given 数据库中包含超过5万条同类型对象数据，且每条数据的source path不同。
	•	When 用户通过菜单查询该类型的对象数据。
	•	Then 前端页面无法正常加载数据，页面长时间无响应或显示加载失败。

期望结果
前端页面应能加载大量数据，或提供合理的提示并支持分页加载。

问题2：版本控制错乱

背景
在并发测试中，发现同时提交相同source path时，版本号的叠加出现错乱，未达到预期的版本控制要求。

复现步骤

	•	Given 两个用户并发执行相同的操作，每个用户向相同source path提交100次。
	•	When 系统处理并发请求，并对同一个source path更新版本号。
	•	Then 预期结果是版本号叠加到200，但实际结果低于200，出现版本号错乱。

期望结果
系统应正确管理并发情况下的版本控制，确保提交次数与版本号叠加一致。

优先级 (Priority): High

English Description

Summary:
Frontend Data Load and Version Control Discrepancy Issues

Description:

Issue 1: Frontend Data Load Failure

Background
During performance testing, it was found that when the data volume of the same object type exceeds 50,000 entries (with different source paths), querying objects by menu causes the frontend to fail to load data.

Steps to Reproduce

	•	Given there are over 50,000 entries of the same object type in the database, each with a unique source path.
	•	When the user queries this object type through the menu.
	•	Then the frontend fails to load the data properly, either freezing or displaying a loading error.

Expected Result
The frontend should be able to load large volumes of data or provide a reasonable message and support pagination.

Issue 2: Version Control Discrepancy

Background
In concurrency testing, it was observed that when submitting the same source path concurrently, the version number aggregation becomes incorrect, failing to meet the expected version control requirements.

Steps to Reproduce

	•	Given two users perform the same operation concurrently, each submitting 100 times to the same source path.
	•	When the system processes concurrent requests and updates the version number for the same source path.
	•	Then the expected result is an accumulated version number of 200, but the actual result is less than 200, indicating version discrepancies.

Expected Result
The system should handle version control accurately under concurrent conditions, ensuring the version number matches the total submissions.

Priority: High