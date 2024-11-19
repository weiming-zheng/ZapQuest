// src/services/authService.js

// Mock user data for demonstration
const users = {
    parent: { username: "parentUser", password: "parentPass" },
    child: { code: "childCode" },
  };
  
  // Login function for parents
  export function loginAsParent(username, password) {
    return new Promise((resolve, reject) => {
      // Simulate API call with a delay
      setTimeout(() => {
        if (
          username === users.parent.username &&
          password === users.parent.password
        ) {
          resolve({ status: "success", role: "parent" });
        } else {
          reject({ status: "error", message: "Invalid credentials" });
        }
      }, 1000);
    });
  }
  
  // Login function for children (using a login code)
  export function loginAsChild(code) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === users.child.code) {
          resolve({ status: "success", role: "child" });
        } else {
          reject({ status: "error", message: "Invalid login code" });
        }
      }, 1000);
    });
  }
  
  // Register function (optional for future)
  export function register(username, password) {
    // Placeholder for actual registration logic
    return new Promise((resolve) => {
      resolve({ status: "success", message: "Registration successful" });
    });
  }