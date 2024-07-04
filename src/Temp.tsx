import React, { useState } from "react";
//import { useTranslation } from "react-i18next";
import { Modal, View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";

const scale = 1
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 80 * scale,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5  * scale,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    
    
    elevation: 2,
   
  },
  buttonOpen: {
    backgroundColor: "lightblue",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    textVerticalAlign: "center"
  },
});
const LanguagePicker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const {scale} = useWindowDimensions()
  //array with all supported languages
  const languages = [
    { name: "de", label: "Deutsch" },
    { name: "en", label: "English" },
    { name: "fr", label: "Français" },
    { name: "be", label: "Беларуская" },
    { name: "es", label: "Español" },
  ];

  const LanguageItem = ({ name, label }: { name: string; label: string }) => (
    <Pressable
      style={styles.button}
      onPress={() => {
        //i18n.changeLanguage(name); //changes the app language
        setModalVisible(!modalVisible);
      }}
    >
      <Text style={[styles.textStyle]}>{label}</Text>
    </Pressable>
  );

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {languages.map((lang) => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen, { borderRadius: 10 * scale,
    height: 40 * scale,
    margin: 10 * scale,
    }]}
        onPress={() => setModalVisible(true)}
      >
        {/*displays the current app language*/}
        <Text style={styles.textStyle}>{"Current language"}</Text>
      </Pressable>
    </View>
  );
};

export default LanguagePicker;