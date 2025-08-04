<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Юличка-красотуличка</title>
  <style>
    body {
      background-color: #2c2c2c;
      color: #ffffff;
      font-family: monospace;
      font-size: 18px;
      padding: 20px;
      overflow-x: hidden;
    }
    .line {
      opacity: 0;
      transition: opacity 0.3s ease-in;
    }
    .visible {
      opacity: 1;
    }
    button {
      margin-right: 10px;
      margin-top: 20px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }
    input {
      margin-top: 20px;
      padding: 8px;
      font-size: 16px;
      width: 200px;
    }
    .falling {
      position: relative;
      animation: fall 2s forwards;
    }
    @keyframes fall {
      to {
        transform: translateY(100vh);
        opacity: 0;
      }
    }
    .firework {
      font-size: 32px;
      animation: pop 0.5s ease-out;
    }
    @keyframes pop {
      0% { transform: scale(0); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  </style>
</head>
<body>
  <div id="terminal"></div>
  <script src="script.js"></script>
</body>
</html>