# **Node Red TTS Scripts**


These scripts are designed to automatically log my pet's feeding times and report that information back to me, verbally. 

## **Components:**
- Modified Sonoff RF Bridge: Modified and flashed with Tasmota firmware to enable RF signal monitoring.


- MQTT Server: Local debain server running the MQTT broker, Home Assistant and Node Red. Responsible for receiving and processing data from the Sonoff RF Bridge.

- Node-RED: Listens for events on the MQTT server and facilitates the flow of data between components.
Pet Food Container 

- Sensor: 433Hz RF sensor attached to the pet's food container, it triggers the RF bridge when opened. 

## **Workflow:**

### **RF Signal Detection:**
The Sonoff RF Bridge continuously monitors RF signals in the area.
When the pet's food container opens, a specific command is sent to the MQTT server.
### **Data Processing with Node-RED:**
Node-RED listens to the topic for the RF sensor, set by the bridge. A function in Node-RED logs the number of times the container was opened (indicating the pet was fed) and records the most recent time.
Data is reset at the beginning of a new day to track daily feeding patterns.
### **Text-to-Speech (TTS) Notification:**
The processed information is then formatted into a text string.
This string is sent to a nearby HomePod using Home Assistant for TTS conversion.
The HomePod announces the count and previous time, providing real-time feedback ensuring nobody accidentally overfeeds the pets.



