import axios from 'axios';
 const apiUrl = process.env.REACT_APP_API_KEY;
 axios.defaults.baseURL = apiUrl;
// הוספת interceptor לתפיסת שגיאות
axios.interceptors.response.use(
    response => response,
    error => {
        console.error("HTTP Error:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        return Promise.reject(error); // זרוק את השגיאה כדי שנוכל לטפל בה במקום אחר
    }
);
export default {

  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/items`)    
    return result.data;
  },

  
  addTask: async(name) => {
    console.log('addTask', name);
    try {
        const result = await axios.post(`${apiUrl}/items`, { name });
        return result.data;
    } catch (error) {
        console.error("Error adding task:", error.message);

        throw error; // זרוק את השגיאה כדי שתוכל לטפל בה במקום אחר
    }
},
    setCompleted: async (id, isComplete) => {
      console.log('setCompleted', { id, isComplete });
      try {
          // שליפת הפריט הקיים מהשרת
          const existingItemResponse = await axios.get(`${apiUrl}/items/${id}`);
          const existingItem = existingItemResponse.data;
  
          // הכנת הנתונים לעדכון
          const updatedItem = {
              name: existingItem.name, // שומר את השם הקודם
              isComplete: isComplete // מעדכן את ה-isComplete
          };
  
          // שליחת הבקשה לעדכון
          const result = await axios.put(`${apiUrl}/items/${id}`, updatedItem, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          return result.data;
      } catch (error) {
          console.error("Error setting task completion:", error.message);
          throw error;
      }
  },
  





  deleteTask: async (id) => {
    try {
        await axios.delete(`/items/${id}`);
        console.log('Task deleted successfully');
    } catch (error) {
        console.error("Error deleting task:", error.message);
        throw error; // זרוק את השגיאה כדי שתוכל לטפל בה במקום אחר
    }
}

};


