Here is the updated Jira story translated into English:

---

**Story Title:** Fix the issue of API response time exceeding standards under concurrent conditions

**Description:**

We have identified that the system does not meet the expected API response time standards under high concurrency, affecting the performance of bulk data insertion and data queries. The issues are as follows:

- **Issue 1:** When the concurrency is **10-40**, the response time for the bulk data insertion API exceeds the expected standard (should be under 1 second).
- **Issue 2:** When the concurrency is **50-100**, the response time for the data query API exceeds the expected standard (should be under 2 seconds).

To improve the stability and response speed of the system under high concurrency, it is necessary to investigate and optimize the following issues.

**Acceptance Criteria:**

1. For the bulk data insertion API, when the concurrency is **10-40**, the response time should be between **500 milliseconds and 1 second**, and must not exceed **1 second**.
2. For the data query API, when the concurrency is **50-100**, the response time should be between **1 second and 2 seconds**, and must not exceed **2 seconds**.
3. Complete the necessary performance optimizations, including database query optimization, concurrency control mechanisms, and API load distribution strategies.
4. Provide a performance test report to ensure that after the fixes, the APIs perform as expected under high concurrency.

**Priority:** High

**Estimate:** [Fill in estimated time]

**Additional Notes:**

- Collaborate with the performance testing team and backend development team to analyze performance bottlenecks.
- Ensure that the optimization does not affect existing functionality and thoroughly validate the system's stability.

---

This version provides the performance standards in English and retains the clear acceptance criteria and optimization tasks.