// Initialize the date picker
flatpickr('#update_hire_date', {
    dateFormat: 'Y-m-d',
    allowInput: true
  });
  
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
  
  // Update Employee
  document.getElementById('update-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get('first_name'),
      age: parseInt(formData.get('age')),
      hire_date: formData.get('hire_date'),
      positions: formData.get('positions'),
      password: formData.get('password')
    };
  
    try {
      const employeeId = formData.get('employee_id');
      await fetchWrapper(`http://localhost:2222/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      alert('Employee updated successfully');
      window.location.href = 'index.html';
    } catch (error) {
      alert('Error updating employee');
    }
  });