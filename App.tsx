import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Clipboard,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Proxy {
  id: number;
  address: string;
  type: string;
  country: string;
  speed: number;
  uptime: number;
}

export default function App() {
  const [proxies, setProxies] = useState<Proxy[]>([]);
  const [currentProxy, setCurrentProxy] = useState<Proxy | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const proxyTypes = ['HTTP', 'HTTPS', 'SOCKS5', 'SOCKS4'];
  const countries = [
    '🇺🇸 USA',
    '🇬🇧 UK',
    '🇩🇪 Germany',
    '🇯🇵 Japan',
    '🇨🇦 Canada',
    '🇦🇺 Australia',
    '🇫🇷 France',
    '🇮🇳 India',
  ];

  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  };

  const generateRandomPort = () => {
    return Math.floor(Math.random() * (9999 - 1000)) + 1000;
  };

  const generateProxies = async () => {
    setLoading(true);
    setTimeout(() => {
      const newProxies: Proxy[] = [];
      for (let i = 0; i < 10; i++) {
        const ip = generateRandomIP();
        const port = generateRandomPort();
        const type = proxyTypes[Math.floor(Math.random() * proxyTypes.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];

        newProxies.push({
          id: i,
          address: `${ip}:${port}`,
          type: type,
          country: country,
          speed: Math.floor(Math.random() * 100) + 20,
          uptime: Math.floor(Math.random() * 40) + 60,
        });
      }
      setProxies(newProxies);
      setLoading(false);
      Alert.alert('✅ Успех', 'Список прокси обновлен');
    }, 1500);
  };

  const connectProxy = () => {
    if (proxies.length === 0) {
      generateProxies();
    } else {
      const randomIndex = Math.floor(Math.random() * proxies.length);
      selectProxy(proxies[randomIndex].id);
    }
  };

  const selectProxy = (proxyId: number) => {
    const proxy = proxies.find((p) => p.id === proxyId);
    if (proxy) {
      setCurrentProxy(proxy);
      setIsConnected(true);
      Alert.alert('✅ Подключено', `Вы подключены к ${proxy.address}`);
    }
  };

  const disconnectProxy = () => {
    setCurrentProxy(null);
    setIsConnected(false);
    Alert.alert('❌ Отключено', 'Соединение разорвано');
  };

  const copyToClipboard = () => {
    if (currentProxy) {
      Clipboard.setString(currentProxy.address);
      Alert.alert('📋 Скопировано', `${currentProxy.address} скопирован`);
    } else {
      Alert.alert('⚠️ Ошибка', 'Нет активного прокси');
    }
  };

  useEffect(() => {
    generateProxies();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <View style={styles.header}>
        <Icon name="shield-vpn" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Proxy Manager</Text>
        <Text style={styles.headerSubtitle}>Управление прокси и VPN</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: isConnected ? '#4caf50' : '#f44336' },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: isConnected ? '#4caf50' : '#f44336' },
              ]}
            >
              {isConnected ? 'Подключено' : 'Отключено'}
            </Text>
          </View>

          <Text style={styles.statusLabel}>IP Адрес</Text>
          <View style={styles.proxyAddressContainer}>
            <Text style={styles.proxyAddress}>
              {currentProxy ? currentProxy.address : 'Нет активного прокси'}
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Icon name="content-copy" size={20} color="#667eea" />
            </TouchableOpacity>
          </View>

          {currentProxy && (
            <>
              <Text style={styles.statusLabel}>Информация</Text>
              <Text style={styles.proxyInfo}>
                {currentProxy.country} • {currentProxy.type} • {currentProxy.speed} Mbps
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={connectProxy}
          activeOpacity={0.8}
        >
          <Icon name="rocket" size={20} color="#fff" />
          <Text style={styles.buttonText}>Подключиться</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.secondaryButton, { marginRight: 10 }]}
            onPress={generateProxies}
            activeOpacity={0.8}
          >
            <Icon name="refresh" size={18} color="#333" />
            <Text style={styles.secondaryButtonText}>Обновить</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={disconnectProxy}
            activeOpacity={0.8}
          >
            <Icon name="close" size={18} color="#333" />
            <Text style={styles.secondaryButtonText}>Отключить</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#667eea" />
            <Text style={styles.loadingText}>Генерируем прокси...</Text>
          </View>
        )}

        {!loading && (
          <View style={styles.proxyListContainer}>
            <Text style={styles.proxyListTitle}>📋 Доступные прокси ({proxies.length})</Text>
            {proxies.map((proxy) => (
              <TouchableOpacity
                key={proxy.id}
                style={[
                  styles.proxyItem,
                  currentProxy?.id === proxy.id && styles.proxyItemActive,
                ]}
                onPress={() => selectProxy(proxy.id)}
                activeOpacity={0.7}
              >
                <View style={styles.proxyItemContent}>
                  <Text style={styles.proxyItemAddress}>{proxy.address}</Text>
                  <Text style={styles.proxyItemInfo}>
                    {proxy.country} • {proxy.type} • {proxy.speed} Mbps
                  </Text>
                </View>
                {currentProxy?.id === proxy.id && (
                  <View style={styles.proxyItemBadge}>
                    <Icon name="check" size={16} color="#667eea" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusLabel: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  proxyAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  proxyAddress: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: '#333',
    flex: 1,
  },
  proxyInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#667eea',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 15,
    color: '#666',
    fontSize: 14,
  },
  proxyListContainer: {
    marginBottom: 30,
  },
  proxyListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  proxyItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  proxyItemActive: {
    backgroundColor: '#f0f4ff',
    borderColor: '#667eea',
    borderWidth: 2,
  },
  proxyItemContent: {
    flex: 1,
  },
  proxyItemAddress: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: '#333',
    fontWeight: '500',
    marginBottom: 5,
  },
  proxyItemInfo: {
    fontSize: 11,
    color: '#999',
  },
  proxyItemBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});