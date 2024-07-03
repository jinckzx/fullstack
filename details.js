// Fetch wrapper
async function fetchWrapper(url, options = {}) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  // Show Employee Details
  async function showEmployeeDetails() {
    const employeeId = document.getElementById('details_id').value;
  
    try {
      const employee = await fetchWrapper(`http://localhost:2222/employees/${employeeId}`);
      displayEmployeeDetails(employee);
    } catch (error) {
      displayEmployeeDetails({ error: 'Error retrieving employee details' });
    }
  }
  
  function displayEmployeeDetails(employee) {
    const detailsElement = document.getElementById('employee_details');
    const { password, ...employeeWithoutPassword } = employee;
    if (employee.error) {
      detailsElement.textContent = employee.error;
    } else {
      detailsElement.textContent = JSON.stringify(employeeWithoutPassword, null, 2);
    }
  }