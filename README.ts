**Story**: Ensure Version Information is Displayed When Saving a Single Model

**Description**:  
When saving a single model, the version information is not currently displayed promptly. The issue stems from the fact that the backend API does not return the version information immediately upon saving. This causes confusion for users who expect to see the version data after performing the save operation. The feature request is to ensure that the API returns the version information promptly, and that this information is displayed immediately on the UI after the save action is completed.

**Acceptance Criteria (AC)**:
1. **AC1**: When a user saves a model, the version information must be displayed immediately in the UI after the save operation is completed.
    - Given a user saves a model,
    - When the save operation is successful,
    - Then the version information is displayed alongside the saved model data.

2. **AC2**: If the API does not return the version information in the initial save response, the frontend must retry or handle the version request until the data is retrieved.
    - Given a user saves a model,
    - When the API initially fails to provide the version information,
    - Then the frontend should retry fetching the version until successful or a configurable timeout is reached.

3. **AC3**: Error handling must be in place if the version information is not received after the defined retries.
    - Given a user saves a model,
    - When the API repeatedly fails to provide version information after retries,
    - Then an appropriate error message should be shown to the user indicating that version information could not be retrieved.

**Reason for the Story**:  
Without the immediate display of version information, users are left without a clear understanding of the model state post-save. Ensuring that version information is promptly available improves the user experience by providing confidence that the model was saved correctly and reflects the latest version.

---

This story focuses on ensuring both frontend and backend are aligned to display the version information reliably and promptly.