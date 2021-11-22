# pi-ws-server-to-serial

## Raspberry Pi Configuration
### installing node.js and other necessary software on raspberry pi
First, you need to copy this code into your terminal to install node.js and other dependencies for the system to work properly. 
```
sudo apt update
sudo apt install nodejs npm git
sudo npm install -g forever http-server
```


### Finishing Pi Setup
To finish the [Raspberry Pi Zero](https://www.raspberrypi.com/products/raspberry-pi-zero/) setup, we will put the pi-ws-server-to-serial onto the pi. This takes the streamed data from the Seeds and  converts it to serial data. This makes it much easier to aggregate the data onto any computer plugged into the pi. Go to the terminal on your Raspberry Pi and clone the [pi-ws-server-to-serial repo](https://github.com/Mesquite-Mocap/pi-ws-server-to-serial), ‘cd’ to that repo. Then type ‘npm install’ and enter. Type ‘forever start server.js’ to start the server and keep it running. To start the server on boot you will need to add ‘forever start server.js’ to your ~/.bash_profile.
