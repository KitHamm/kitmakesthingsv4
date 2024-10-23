#include <Arduino.h>
#include <Wire.h>
#include <U8g2lib.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
#include <ArduinoJson.h>

U8G2_SSD1306_128X64_NONAME_F_SW_I2C
u8g2(U8G2_R0,/*clock=*/14,/*data=*/12, U8X8_PIN_NONE);

JsonDocument doc;

// Replace with your network credentials
const char* ssid = "<SSID>";
const char* password = "<PASSWORD>";
int messageCount = 0;
int pageViews = 0;
int httpCode = 0;
bool connectingPrinted = false;
bool fetchingPrinted = false;
bool reFetch = true;
const int refreshSeconds = 60;
int timer = 60;

void setup() {
  u8g2.begin();
  if (connectingPrinted == false) {
    displayConnecting(ssid);
  }
  Serial.begin(115200);
  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

    std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    // Ignore SSL certificate validation
    client->setInsecure();

    //create an HTTPClient instance
    HTTPClient https;
    if (reFetch == true) {
      //Initializing an HTTPS communication using the secure client
      Serial.print("[HTTPS] begin...\n");
      if (https.begin(*client, "<API ENDPOINT>")) {  // HTTPS

        Serial.print("[HTTPS] GET...\n");
        if (fetchingPrinted == false) {
          displayFetching();
        }
        // start connection and send HTTP header
        https.addHeader("Content-Type", "Content-Type: application/json");
        httpCode = https.POST(<JSON TO POST>);
        // httpCode will be negative on error
        if (httpCode > 0) {
          // HTTP header has been send and Server response header has been handled
          Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
          // file found at server
          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
            String payload = https.getString();
            DeserializationError error = deserializeJson(doc, payload);
            if (error) {
              Serial.print(F("deserializeJson() failed: "));
              Serial.println(error.f_str());
              return;
            }
            messageCount = doc["unreadMessagesCount"];
            pageViews = doc["todayServiceRequestsCount"];
            Serial.println("Payload...");
            Serial.println(payload);
            Serial.print("New Messages: ");
            Serial.println(messageCount);
            Serial.print("Page views: ");
            Serial.println(pageViews);
          }
        } else {
          Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
        }

        https.end();
      } else {
        Serial.printf("[HTTPS] Unable to connect\n");
      }
      reFetch = false;
    }
  }
  delay(1000);
  timer = timer - 1;
  if (fetchingPrinted == true) {
    displayData(messageCount, pageViews, httpCode, timer);
  }
  Serial.println(timer);
  if (timer == 0) {
    fetchingPrinted = false;
    reFetch = true;
    timer = refreshSeconds;
  }
}

void displayFetching() {
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_7x14B_tr);
  u8g2.setCursor(0, 10);
  u8g2.print("KitMakesThings");
  u8g2.setCursor(0, 26);
  u8g2.print("Fetching data...");
  u8g2.sendBuffer();
  fetchingPrinted = true;
}

void displayConnecting(const char* ssid) {
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_7x14B_tr);
  u8g2.setCursor(0, 10);
  u8g2.print("KitMakesThings");
  u8g2.setCursor(0, 26);
  u8g2.print("Connecting to WiFi...");
  u8g2.setCursor(0, 38);
  u8g2.print(ssid);
  u8g2.sendBuffer();
  connectingPrinted = true;
}

void displayData(int newMessages, int pageViews, int statusCode, int timer) {
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_7x14B_tr);
  u8g2.setCursor(0, 10);
  u8g2.print("KitMakesThings");
  u8g2.setCursor(0, 26);
  u8g2.print("New Messages: ");
  u8g2.print(newMessages);
  u8g2.setCursor(0, 38);
  u8g2.print("Page views: ");
  u8g2.print(pageViews);
  u8g2.setCursor(0, 50);
  u8g2.print("Status Code: ");
  u8g2.print(statusCode);
  u8g2.setCursor(0, 62);
  u8g2.print("Refresh in: ");
  u8g2.print(timer);
  u8g2.print("s");
  u8g2.sendBuffer();
}
