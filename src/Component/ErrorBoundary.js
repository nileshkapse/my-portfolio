import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("❌ Error caught by ErrorBoundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ Error details:", errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false }); // Reset error state
    window.location.reload(); // Refresh the page
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h2>Something went wrong 😞</h2>
          <p>Try refreshing the page or go back.</p>
          <button onClick={this.handleReload} style={styles.button}>
            🔄 Refresh Page
          </button>
          <button onClick={() => (window.location.href = "/")} style={styles.button}>
            🏠 Go to Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "5px",
  },
};

export default ErrorBoundary;
