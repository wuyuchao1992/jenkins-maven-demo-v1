中文描述

Summary (标题):
查询接口响应时间过慢问题

Description (描述):

问题3：查询接口响应时间过慢

背景
在数据库包含5万条实体（entities）记录的情况下，通过查询接口（object by list）获取对象数据时，响应时间非常慢。

复现步骤

	•	Given 数据库中存在5万条实体记录。
	•	When 用户通过object by list接口进行查询操作。
	•	Then 响应时间超过10秒，影响用户体验和查询效率。

期望结果
object by list接口的响应时间应在合理范围内（例如低于3秒），即使在数据量较大的情况下也应保持较快的查询速度。

优先级 (Priority): High

English Description

Summary:
Slow Query Response Time for object by list Interface

Description:

Issue 3: Slow Query Response Time

Background
With 50,000 entity records in the database, querying object data through the object by list interface results in a very slow response time, exceeding 10 seconds.

Steps to Reproduce

	•	Given the database contains 50,000 entity records.
	•	When the user queries objects using the object by list interface.
	•	Then the response time exceeds 10 seconds, impacting user experience and query efficiency.

Expected Result
The object by list interface should have a reasonable response time (e.g., under 3 seconds), maintaining fast query performance even with large datasets.

Priority: High