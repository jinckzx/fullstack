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
  
  // Insert Employee
  document.getElementById('insert-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = {
      employee_id: formData.get('employee_id'),
      first_name: formData.get('first_name'),
      age: parseInt(formData.get('age')),
      hire_date: formData.get('hire_date'),
      positions: formData.get('positions'),
      password: formData.get('password')
    };
  
    try {
      await fetchWrapper('http://localhost:2222/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      alert('Employee created successfully');
      window.location.href = 'index.html';
    } catch (error) {
      alert('Error creating employee');
    }
  });