
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>

// WiFi
const char* ssid = "COMCOM-CR3584";
const char* password = "6981041207";

// Firebase
#define API_KEY "AIzaSyBF6Q8C287vSbYFbCFZxqXBgc3hHWeiTMQ"
#define DATABASE_URL "https://isof-5b1b4-default-rtdb.firebaseio.com/"

// Pines
#define DHTPIN 4
#define DHTTYPE DHT11
#define LED_PIN 2
#define WATER_PUMP_PIN 16
#define FAN_PIN 17

DHT dht(DHTPIN, DHTTYPE);

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);

  // Pines de salida
  pinMode(LED_PIN, OUTPUT);
  pinMode(WATER_PUMP_PIN, OUTPUT);
  pinMode(FAN_PIN, OUTPUT);

  dht.begin();

  // Conectar Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nConectado a WiFi");

  // Firebase
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // Lectura desde Firebase
  if (Firebase.RTDB.getInt(&fbdo, "/devices/led"))
    digitalWrite(LED_PIN, fbdo.intData());

  if (Firebase.RTDB.getInt(&fbdo, "/devices/water_pump"))
    digitalWrite(WATER_PUMP_PIN, fbdo.intData());

  if (Firebase.RTDB.getInt(&fbdo, "/fans/fan_1"))
    digitalWrite(FAN_PIN, fbdo.intData());

  // Leer sensor DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Enviar datos a Firebase
  if (!isnan(humidity) && !isnan(temperature)) {
    Firebase.RTDB.setFloat(&fbdo, "/sensors/humidity", humidity);
    Firebase.RTDB.setFloat(&fbdo, "/sensors/temperature", temperature);
  }

  delay(5000); // Espera 5 segundos
}

