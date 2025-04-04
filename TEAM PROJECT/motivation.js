body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(270deg, #6dd5fa, #2980b9);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .container {
    background-color: rgba(0, 0, 50, 0.5);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%;
    max-width: 600px;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  #quote {
    font-size: 1.4rem;
    margin-bottom: 25px;
    line-height: 1.5;
    transition: opacity 0.5s ease;
  }
  
  .fade-in {
    animation: fadeIn 1s;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  button, .btn {
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #3498db;
    color: #fff;
  }
  
  .btn {
    background-color: #2ecc71;
    text-decoration: none;
    text-align: center;
    color: white;
  }
  
  .btn:hover {
    background-color: #27ae60;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
