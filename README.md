
## Raspberry Pi Zero W Dongle Configuration

### Installing node.js and other necessary software on raspberry pi

First, you need to copy this code into your terminal to install node.js and other dependencies for the system to work properly. 

(Flash a terminal only image of raspberry pi using [Pi OS Imager](https://www.raspberrypi.com/software/)).


```
sudo apt update
sudo apt install nodejs npm git
```

### Dependencies

```sh
sudo apt-get update
sudo apt-get remove python3
sudo apt-get install nodejs npm python2.7
sudo npm install n
sudo n install 6
sudo npm install serialport

```

Make sure serial interface and auto-logon are enabled (use `sudo rapsi-config`)


Add 
```
dtoverlay=dwc2
```
 to `/boot/config.txt`.

Add 

```
dwc2
g_serial
```

to `/etc/modules`






### Finishing Pi Setup

To finish the [Raspberry Pi Zero](https://www.raspberrypi.com/products/raspberry-pi-zero/) setup, we will put the pi-ws-server-to-serial onto the pi. This takes the streamed data from the Seeds and  converts it to serial data. This makes it much easier to aggregate the data onto any computer plugged into the pi. Go to the terminal on your Raspberry Pi and clone the [pi-ws-server-to-serial repo](https://github.com/Mesquite-Mocap/pi-ws-server-to-serial). 

To start the server on boot you will need to add

```sh
cd /home/pi/pi-ws-server-to-serial
sudo node server.js

```
to your `~/.bashrc`.

