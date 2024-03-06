// Checks if user is still authenticated
// and decides whether or not to delete the existing token if expired

const authenticatedRequest =
  (someFunction) =>
  async (...params) => {
    try {
      return await someFunction(...params);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("user")
    }
  };

  export default authenticatedRequest;