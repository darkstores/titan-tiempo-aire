import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const ZohoChat = () => {
    const injectedJS = `
    function tryClickChat() {
      const iframe = document.querySelector('iframe[id^="zsiqembed"]');
      if (iframe && iframe.contentWindow && iframe.contentDocument) {
        const btn = iframe.contentDocument.querySelector('.zsiq_chatbtn');
        if (btn) {
          btn.click();
          return;
        }
      }
      setTimeout(tryClickChat, 1500);
    }
    setTimeout(tryClickChat, 3000);
    true;
  `;

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={["*"]}
                javaScriptEnabled
                domStorageEnabled
                source={{ uri: "https://erp.familiatitan.com/chat.html" }}
                injectedJavaScript={injectedJS}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default ZohoChat;
