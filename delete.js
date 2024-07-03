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
  
  // Delete Employee
  async function deleteEmployee() {
    const employeeId = document.getElementById('delete_id').value;
    const password = document.getElementById('delete_password').value;
  
    try {
      // Validate employeeId and password
      const response = await fetchWrapper(`http://localhost:2222/employees/${employeeId}`);
      if (response && response.password === password) {
        // If password matches, proceed with deletion
        await fetchWrapper(`http://localhost:2222/employees/${employeeId}`, {
          method: 'DELETE'
        });
        alert('Employee deleted successfully');
        window.location.href = 'index.html';
      } else {
        alert('Invalid employee ID or password');
      }
    } catch (error) {
      alert('Error deleting employee');
    }
  }
  