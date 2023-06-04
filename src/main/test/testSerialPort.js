// import { SerialPort } from "serialport";
const { SerialPort } = require("serialport");


SerialPort.list().then((ports) => {
    console.log("串口列表：");
    ports.forEach(function (port) {
      console.log(port.path);
    });
  });
  
  const port = new SerialPort({ path: "COM4", baudRate: 9600 }, function (err) {
    if (err) {
      return console.log("Error: ", err.message);
    }
  
    console.log("open success");
  });
  
  port.write("4E 4B 00"); // 发送数据
  port.drain(err => {
    if (err) {
      console.log("Error: ", err.message);
    }
    console.log("write success");
  });
  
  port.on("data", function (data) {
    console.log("Data: " + data);
  }
  );