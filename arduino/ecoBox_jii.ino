#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>

#define DHT_PIN 4
#define DHT_TYPE DHT22

// Configurações WiFi
#define WIFI_SSID "SUA_REDE_WIFI"
#define WIFI_PASSWORD "SUA_SENHA_WIFI"

// Configurações Firebase
#define FIREBASE_HOST "ecobox-jii-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "SUA_CHAVE_DE_AUTENTICACAO_FIREBASE"

// IDs de usuários (você pode obter dinamicamente)
String USER_ID = "ID_DO_USUARIO_LOGADO"; // Substitua pelo ID real do usuário

DHT dht(DHT_PIN, DHT_TYPE);
FirebaseData firebaseData;
FirebaseJson json;

void setup() {
  Serial.begin(115200);
  
  // Inicializar DHT
  dht.begin();
  
  // Conectar ao WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando ao WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("WiFi conectado! IP: ");
  Serial.println(WiFi.localIP());
  
  // Configurar Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  
  // Configurar tempo de timeout
  firebaseData.setBSSLBufferSize(1024, 1024);
  firebaseData.setResponseSize(1024);
  
  Serial.println("Sistema EcoBox JII iniciado!");
}

void loop() {
  // Ler dados do sensor DHT22
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  // Verificar se a leitura foi bem-sucedida
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Erro ao ler o sensor DHT22!");
    delay(2000);
    return;
  }
  
  // Preparar dados para enviar ao Firebase
  unsigned long timestamp = millis();
  
  // Estrutura dos dados: users/{userId}/sensores/leituras/{uniqueId}
  String path = "users/" + USER_ID + "/sensores/leituras/" + String(timestamp);
  
  // Criar objeto JSON com os dados
  json.set("temperature", temperature);
  json.set("humidity", humidity);
  json.set("timestamp", timestamp);
  json.set("userId", USER_ID);
  
  // Enviar dados para o Firebase
  if (Firebase.setJSON(firebaseData, path.c_str(), json)) {
    Serial.println("Dados enviados com sucesso!");
    Serial.print("Temperatura: ");
    Serial.print(temperature);
    Serial.print("°C, Umidade: ");
    Serial.print(humidity);
    Serial.println("%");
    
    // Atualizar valores atuais do sensor
    String currentPath = "users/" + USER_ID + "/sensores";
    FirebaseJson currentData;
    currentData.set("temperatura", temperature);
    currentData.set("umidade", humidity);
    currentData.set("lastUpdate", timestamp);
    currentData.set("status", "active");
    
    Firebase.setJSON(firebaseData, currentPath.c_str(), currentData);
    
  } else {
    Serial.println("Erro ao enviar dados para o Firebase:");
    Serial.println(firebaseData.errorReason());
  }
  
  // Aguardar antes da próxima leitura
  delay(5000); // Enviar dados a cada 5 segundos
}